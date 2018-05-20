import React, { Component } from 'react';

import getWeb3 from '../utils/getWeb3';
import Organ from '../../build/contracts/Organ.json';

import BlockChain from '../components/BlockChain';
import HeartImg from '../assets/images/heart.png';

import '../assets/css/recipient.css';

class Recipient extends Component {

    state = {
        web3: null,
        organInstance: null,
        account: null,
        metadata: null
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
        this.setState({ 
            account: accounts[0]
        })
        })
    })
    }

    acceptPackage() {
        this.state.organInstance._transferFrom(this.state.account, this.state.account, 0, 32, 3, { from: this.state.account, gas: 1000000 }).then((result) => {
            console.log(result);
            this.getMetaData();
        })
    }

    getMetaData() {
        this.state.organInstance.getMetaData.call(0).then((result) => {
            this.setState({metadata:result});
            console.log(result);
        })
    }
    displayBlocks() {
        if(this.state.metadata === null) {
            return(
                <BlockChain stage="four" />
            )
        }else{
            return(
                <BlockChain stage="five" />
            ) 
        }
    }

    displayMetaData() {
        if(this.state.metadata) {
            return(
                <div className="meta-data-block moveFromTopFade delay200">
                    <div className="meta-data-text moveFromBottomFade delay300">Donor: {this.state.metadata[0]}</div>
                    <div className="meta-data-text moveFromBottomFade delay300">Blood Type: {this.state.metadata[1]}</div>
                    <div className="meta-data-text moveFromBottomFade delay400">Heart Size: {this.state.metadata[2].c}</div>
                    <div className="meta-data-text moveFromBottomFade delay400">Average Temp: {this.state.metadata[3].c} F</div>
                    <div className="meta-data-text moveFromBottomFade delay500">Expiration: 4 hours</div>
                    <div className="meta-data-text moveFromBottomFade delay500">Status: Delivered</div>
                </div>
            )
        }
    }

    render() {
        return(
            <div className="row">
                <div className="col s12 m12">
                {this.displayBlocks()}
                </div>

                <div className="row">
                    <div className="col s3 m3" />
                    <div className="col s6 m6">
                        <div className="recipient-header-block moveFromBottomFade">
                            <h1 className="recipient-header-text"><a className="fa fa-hospital-o recipient-icon" /> Hospital (B)</h1>

                            <div className="row">
                                <div className="col s4 m4">
                                    <img className="heart-img heart-img-border" src={HeartImg} alt="" />
                                </div>
                                <div className="col s8 m8">
                                    <div className="recipient-accept-block">
                                        <div className="recipient-accept-block-text">Hospital accepts package from Truck</div>
                                        <div className="waves-effect waves-light btn accept-btn" onClick={() => this.acceptPackage()}>
                                            <i className="fa fa-chevron-circle-down" /> Accept Package
                                        </div>
                                    </div>
                                    {this.displayMetaData()}
                                </div>
                            </div>

                        </div>
                    </div>
                    <div className="col s3 m3" />
                </div>
            </div>
        )
    }

}
export default Recipient;