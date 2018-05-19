import React, { Component } from 'react';
import $ from 'jquery';
import '../../node_modules/jquery-ui';
import '../../node_modules/jquery-ui-bundle';

import getWeb3 from '../utils/getWeb3';
import Organ from '../../build/contracts/Organ.json';

import BlockChain from '../components/BlockChain';
import Phone from '../components/Phone';

import HeartImg from '../assets/images/heart.png';
import '../assets/css/hospital.css';

class Hospital extends Component {
    
    state = {
        blockchain: null,
        web3: null,
        organInstance: null,
        account: null,
        account2: null
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
                account: accounts[0],
                account2: accounts[0]
            })
            console.log(this.state.account2);
          })
        })
      }

    displayBlockChain() {
        if(this.state.blockchain) {
            return(
                <BlockChain />
            )
        }else{
            return ( <div /> )
        }
    }
    displayPhone() {
        if(true) {
            return ( <div /> )
        }else{
            return(
                <Phone />
            )
        }
    }
    toggleState() {
        this.setState({blockchain: true});
    }
    render() {
        const self = this;

        $( function() {
            $( "#draggable" ).draggable();
            $( "#droppable" ).droppable({
              drop: function( event, ui ) {

                $(".heart-img").removeClass("heart-img-border");

                self.state.organInstance.submitOrgan(self.state.account2, '0', 12, { from: self.state.account }).then((result) => {
                    console.log(result);
                    $(".block-trigger").click();
                });
              }
            });
          } );

        return(
            <div className="row">
                <div className="col s12 m12">
                   {/* block explorer header */}
                   {this.displayBlockChain()}
                    
                    <div className="row">
                        <div className="block-trigger" onClick={() => this.toggleState()} />
                        <div className="col s9 m9">
                            {/* hospital view */}
                            <div className="hospital-header-block moveFromBottomFade">
                                <h1 className="hospital-header-text"><a className="fa fa-hospital-o hospital-icon" /> Hospital (A)</h1>
                            </div>

                            <div className="hospital-describe-block moveFromTopFade">
                                <div className="hospital-describe-text">Organ Pending Submission</div>
                                <div className="hospital-describe-text-bot">Hospital Organ ID: #5974932784</div>
                            </div>
                            <div className="row">
                                <div className="col s3 m3">
                                    <div className="heart-img-block">
                                        <img className="heart-img heart-img-border" id="draggable" src={HeartImg} alt="" />
                                    </div>
                                </div>
                                <div className="col s6 m6">
                                    <div className="organ-text-block">
                                        <div className="organ-text">Organ Type: Heart</div>
                                        <div className="organ-text">Blood Type: O</div>
                                        <div className="organ-text">Organ Size: 12 cm</div>
                                        <div className="organ-text">Organ Mass: 350 grams</div>
                                    </div>
                                </div>
                                <div className="col s3 m3">
                                    <div className="organ-submit-text" id="droppable">Adds organ for review by OPO</div>
                                </div>
                            </div>

                            {/* checklist */}
                            <div>

                            </div>

                            {/* confirm organ */}

                            {/* send delivery */}

                        </div>
                        <div className="col s3 m3">
                            {this.displayPhone()}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default Hospital;