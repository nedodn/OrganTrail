import React, { Component } from 'react';
import getWeb3 from '../utils/getWeb3';
import Organ from '../../build/contracts/Organ.json';
import Web3QRScanner from '../Web3QRScanner';

class Delivery extends Component {
    constructor(props) {
      super(props)

      this.state = {
        tokens: {},
        web3: null,
        organInstance: null,
        timer: null,
      }

      this.tokenOfApprovalByIndex = this.tokenOfApprovalByIndex.bind(this);
      this.accept = this.accept.bind(this);
      this.handoff = this.handoff.bind(this);
      this.registerToken = this.registerToken.bind(this);
      // this.updateToken = this.updateToken.bind(this);
    }

    registerToken(index, approved, _status) {
      const {web3, organInstance} = this.state;
      const that = this;

      organInstance.tokenIdToMetaData(index)
        .then(function(meta) {
          console.log(meta);
          let [
            donor,
            bloodType,
            size,
            averageTemperature,
            recipient,
            expiration,
            status
          ] = meta;
          status = status.toNumber();
          if (_status) {
            status = _status;
          }
          status = ['SUBMITTED', 'MINTED', 'IN_TRANSIT', 'DELIVERED'][status];

          organInstance.ownerOf(index)
            .then(function(owner) {

              that.setState({
                // bad...
                tokens: {
                  ...that.state.tokens,
                  [index]: {
                    donor,
                    bloodType,
                    size,
                    averageTemperature,
                    recipient,
                    expiration: expiration.toNumber(),
                    status,
                    approved,
                    owner: owner,
                  },
                },
              });
            })
        });
    }

    tokenOfApprovalByIndex(address, index, instance) {
      instance.tokenOfApprovalByIndex(address, index)
        .then((result) => {
          const tokenId = result.toNumber();
          console.log(tokenId);
          this.registerToken(tokenId, true);

          this.tokenOfApprovalByIndex(address, index + 1, instance);
        })
        .catch(() => {});
    }

    tokenOfOwnerByIndex(address, index, instance) {
      instance.tokenOfOwnerByIndex(address, index)
        .then((result) => {
          const tokenId = result.toNumber();
          console.log(tokenId);
          instance.getApproved(index)
            .then(address => {
              console.log(address);
              if (address === '0x0000000000000000000000000000000000000000') {
                this.registerToken(tokenId, false);
              } else {
                this.registerToken(tokenId, true);
              }
            });

          this.tokenOfOwnerByIndex(address, index + 1, instance);
        })
        .catch(() => {});
    }

    accept(id) {
      return () => {
        const {web3, organInstance, tokens} = this.state;
        const that = this;

        web3.eth.getAccounts((error, accounts) => {
          organInstance._transferFrom(
            tokens[id].owner,
            accounts[0],
            id,
            30,
            2,
            {
              from: accounts[0],
              gas: 3000000,
            }
          ).then(() => {
            that.registerToken(id, false, 2);
          });
        });
      }
    }

    handoff(id) {
      return () => {
        const {web3, organInstance, tokens} = this.state;
        const that = this;

        web3.eth.getAccounts((error, accounts) => {
          organInstance.approve(
            tokens[id].recipient,
            id,
            {
              from: accounts[0],
              gas: 3000000,
            }
          ).then(() => {
            that.registerToken(id, true);
          });
        });
      }
    }

    componentWillMount() {
      // Get network provider and web3 instance.
      // See utils/getWeb3 for more info.

      getWeb3
      .then(results => {
        this.setState({
          web3: results.web3
        })

        // Instantiate contract once web3 provided.
        this.instantiateContract()
      })
      .catch(() => {
        console.log('Error finding web3.')
      })
    }

    // componentDidMount() {
    //   const timer = setInterval(this.updateToken, 1000);
    //   this.setState({timer});
    // }

    // componentWillUnmount() {
    //   this.clearInterval(this.state.timer);
    // }

    // updateToken() {
    //   const {tokens} = this.state;
    //   const that = this;

    //   Object.keys(tokens)
    //     .forEach(function(tokenId) {
    //       that.registerToken(tokenId, null);
    //     });
    // }

    instantiateContract() {
      /*
        * SMART CONTRACT EXAMPLE
        *
        * Normally these functions would be called in the context of a
        * state management library, but for convenience I've placed them here.
        */

      const contract = require('truffle-contract')
      const organ = contract(Organ)
      organ.setProvider(this.state.web3.currentProvider)

      // Declaring this for later so we can chain functions on SimpleStorage.

      // Get accounts.
      this.state.web3.eth.getAccounts((error, accounts) => {
        organ.deployed().then((instance) => {
          this.setState({ organInstance: instance });

          console.log(accounts[0]);
          instance.balanceOf('0x64620ac0db61090270bd02ef44872cec170d619e').then(x => x.toNumber()).then(console.log);
          instance.getApproved(0).then(console.log);
          instance.totalSubmissions().then(x => x.toNumber()).then(console.log);
          this.tokenOfApprovalByIndex(accounts[0], 0, instance);
          this.tokenOfOwnerByIndex(accounts[0], 0, instance);
        })
      })
    }

    render() {
      const {tokens} = this.state;

      const tokenRows = Object.keys(tokens).map(id => {
        const token = tokens[id];
        let {
          recipient,
          status,
          approved,
        } = token;
        const temperature = 30 + (id << 5) % 5;
        console.log(token);

        let button;
        if (status === 'MINTED' && approved) {
          button = (
            <button onClick={this.accept(id)}>Accept</button>
          );
        } else if (status === 'IN_TRANSIT' && !approved) {
          button = (
            <div>
              <Web3QRScanner onScan={this.handoff(id)}/>
              <button onClick={this.handoff(id)}>Hand off</button>
            </div>
          );
        }

        if (approved) {
          switch (token.status) {
              case 'IN_TRANSIT':
                status = 'Out for delivery';
                break;
          }
        }

        return (
        <tr key={id}>
          <td>{id}</td>
          <td>{recipient}</td>
          <td>{temperature}</td>
          <td>{status}</td>
          <td>{button}</td>
        </tr>
        );
      });

        return(
            <div className='home-bg'>
                <div>
                    <h1 className='home-title-text'>Delivery</h1>
                </div>
                <div>
                  <table>
                    <thead>
                      <tr>
                      <th>id</th>
                      <th>Destination</th>
                      <th>Temperature</th>
                      <th>Status</th>
                      <th></th>
                      </tr>
                    </thead>
                    <tbody>
                    {tokenRows}
                    </tbody>
                  </table>
                </div>
            </div>
        )
    }

}
export default Delivery;
