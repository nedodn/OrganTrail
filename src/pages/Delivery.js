import React, { Component } from 'react';
import getWeb3 from '../utils/getWeb3';
import Organ from '../../build/contracts/Organ.json';


class Delivery extends Component {
    constructor(props) {
      super(props)

      this.state = {
        tokens: {},
        web3: null,
        organInstance: null,
      }

      this.tokenOfApprovalByIndex = this.tokenOfApprovalByIndex.bind(this);
      this.accept = this.accept.bind(this);
      this.handoff = this.handoff.bind(this);
      this.registerToken = this.registerToken.bind(this);
    }

    registerToken(index) {
      const {web3, organInstance} = this.state;
      const outer = this;

      organInstance.tokenIdToMetaData(index)
        .then(function(meta) {
          console.log(meta);

          organInstance.ownerOf(index)
            .then(function(owner) {
              outer.setState({
                // bad...
                tokens: {
                  ...outer.state.tokens,
                  [index]: {
                    donor: meta[0],
                    recipient: meta[1],
                    expiration: meta[2].toNumber(),
                    delivered: meta[3],
                    status: 'approved',
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
          this.registerToken(tokenId);

          this.tokenOfApprovalByIndex(address, ++index, instance);
        });
    }

    tokenOfOwnerByIndex(address, index, instance) {

      // instance.tokenOfOwnerByIndex(address, index)
      //   .then((result) => {
      //     this.setState({
      //       // bad...
      //       tokens: {
      //         ...this.state.tokens,
      //         // todo: add meta
      //         [result.toNumber()]: {
      //           status: 'owned',
      //         },
      //       },
      //     });
      //     console.log(result);

      //     this.tokenOfOwnerByIndex(address, ++index, instance);
      //   });
    }

    accept(id) {
      return () => {
      const {web3, organInstance, tokens} = this.state;

      web3.eth.getAccounts((error, accounts) => {
        console.log(tokens[id].owner);
        organInstance.transferFrom(
          tokens[id].owner,
          accounts[0],
          id
        );
      })
      }
    }

    handoff(id) {

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
          instance.balanceOf("0x64620ac0db61090270bd02ef44872cec170d619e").then(x => x.toNumber()).then(console.log);
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

        let button;
        if (token.status === "approved") {
          button = (
            <button onClick={this.accept(id)}>Accept</button>
          );
        } else if (token.status === "owned") {
          button = (
            <button onClick={this.handOff(id)}>Hand off</button>
          );
        }

        return (
        <tr key={id}>
          <td>{id}</td>
          <td>Unknown</td>
          <td>{token.status}</td>
          <td>{button}</td>
        </tr>
        );
      });

        return(
            <div className="home-bg">
                <div>
                    <h1 className="home-title-text">Delivery</h1>
                </div>
                <div>
                  <table>
                    <thead>
                      <td>id</td>
                      <td>Destination</td>
                      <td>Status</td>
                      <td></td>
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
