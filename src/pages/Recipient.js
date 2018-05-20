import React, { Component } from 'react';

import getWeb3 from '../utils/getWeb3';
import Organ from '../../build/contracts/Organ.json';

import '../assets/css/home.css';

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
            console.log(result);
            this.state.metadata = result;
        })
    }

    render() {
        return(
            <div>
                Recipient Page
            </div>
        )
    }

}
export default Recipient;