import React, { Component } from 'react';

import TruckDirectionMap from '../components/maps/TruckDirectionMap';
import BlockChain from '../components/BlockChain';
import Phone from '../components/Phone';
import '../assets/css/map.css';

import getWeb3 from '../utils/getWeb3';
import Organ from '../../build/contracts/Organ.json';

class Truck extends Component {

    state = {
        web3: null,
        organInstance: null,
        account: null,
        delivery: null
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

    displayMap() {
        return( 
            <TruckDirectionMap className="map-section" /> 
        );
    }
    displayBlocks() {
        return(
            <BlockChain stage="three" />
        )
    }
    displayPhone() {
        return(
            <div className="map-side">
                <Phone 
                    btnMsg="Delivery Package" 
                    deliveryThing={this.deliverPackage.bind(this)}
                />
            </div>
        )
    }

    deliverPackage() {
        // alert("hihhihi")
        this.state.organInstance.approve(this.state.account, 0, { from: this.state.account }).then((result) => {
            console.log(result);
            this.setState({delivery: true})
        })
    }

    render() {
        return(
            <div>
                
                <div className="row">
                    <div className="col s9 m9">
                        {this.displayMap()}
                    </div>
                    <div className="col s3 m3">
                        {this.displayPhone()}
                    </div>
                </div>

                <div className="row">
                <div className="col s12 m12 map-top">
                    {this.displayBlocks()}
                </div>
                </div>

            </div>
        )
    }

}
export default Truck;