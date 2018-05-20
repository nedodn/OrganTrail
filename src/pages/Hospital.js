import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import $ from 'jquery';
import '../../node_modules/jquery-ui';
import '../../node_modules/jquery-ui-bundle';

import getWeb3 from '../utils/getWeb3';
import Organ from '../../build/contracts/Organ.json';

import '../../node_modules/materialize-css/dist/css/materialize.css';
import '../../node_modules/materialize-css/dist/js/materialize.js';
import '../../node_modules/materialize-css/js/initial.js';
import '../../node_modules/materialize-css/js/forms.js';

import BlockChain from '../components/BlockChain';
import Phone from '../components/Phone';

import HeartImg from '../assets/images/heart.png';
import '../assets/css/hospital.css';

class Hospital extends Component {
    
    state = {
        blockchainOne: null,
        blockchainTwo: null,
        transfer: null,
        phone: null,
        web3: null,
        organInstance: null,
        account: null,
        route: null
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

    displayBlockChain() {
        if(this.state.blockchainOne && this.state.blockchainTwo === null && this.state.phone === null) {
            return(
                <BlockChain stage="one" />
            )
        }else if(this.state.blockchainOne && this.state.blockchainTwo && this.state.phone === null){
            return(
                <BlockChain stage="two" />
            )
        }else if(this.state.blockchainOne && this.state.blockchainTwo && this.state.phone) {
            return(
                <BlockChain stage="three" />
            )
        }else{
            return ( <div /> )
        }
    }
    displayPhone() {
        if(this.state.phone) {
            return(
                <Phone 
                    btnMsg="Accept Package" 
                    acceptPackage={this.acceptPackage.bind(this)}
                />
            )
        }else{
            return ( <div /> )
        }
    }
    toggleState() {
        this.setState({blockchainOne: true});
    }
    toggleTransfer() {
        this.state.organInstance.mintOrgan(0, this.state.account, 1000, { from: this.state.account }).then((result) => {
            console.log(result);
            this.setState({blockchainTwo: true});
        })
    }
    togglePhone() {
        this.state.organInstance.approve(this.state.account, 0, { from: this.state.account }).then((result) => {
            console.log(result);
            this.setState({phone: true});
        })
    }
    displayApprove() {
        if(this.state.blockchainTwo) {
            return(
                <div className="approve-block moveFromRightFade delay200">
                    <div className="approve-header-text">Hospital Approve Transfer</div>
                    <div className="waves-effect waves-light btn approve-icon" onClick={() => this.togglePhone()}>
                        <i className="fa fa-check-circle-o" /> Approve
                    </div>
                </div>
            )
        }
    }
    toggleSign() {
        this.state.organInstance.signSubmission(0, { from: this.state.account }).then((result) => {
            console.log(result);
            this.setState({transfer: true});
        }) 
    }

    displayTransfer() {
        if(this.state.transfer) {
            return(
                <div className="approve-block moveFromLeftFade delay100">
                    <div className="approve-header-text">Hospital Approve Transfer</div>
                    <div className="waves-effect waves-light btn approve-icon" onClick={() => this.toggleTransfer()}>
                        <i className="fa fa-check-circle-o" /> Ready For Transfer
                    </div>
                </div>
            )
        }
    }
 
    acceptPackage() {
        this.state.organInstance._transferFrom(this.state.account, this.state.account, 0, 32, 2, { from: this.state.account, gas: 1000000 }).then((result) => {
            console.log(result);
            this.setState({route: true});
        });
    }
    goToTruck() {
        if(this.state.route) {
            $(".truck-page")[0].click();
        }
    }

    displayCheckList() {
        if(this.state.blockchainOne) {
            return(
                <div className="row moveFromBottomFade delay500">
                    <div className="col s3 m3">
                        {this.displayTransfer()}
                    </div>
                    <div className="col s6 m6">
                    <div className="row">
                            <div className="col s12 m12">
                            <div className="card surgeon-bg">
                                <div className="card-content white-text">
                                    <span className="card-title card-title-color">OPO confirms by checkbox the required signatories </span>
                                    <p>(e.g. Neurologist, Surgeon, Patient) have attested that an organ is ready for donation to a specific Recipient at a specific transplant center and submits a transaction minting an ERC-721 token.</p>
                                </div>
                                <div className="card-action card-bottom">
                                    <div className="row">
                                        <div className="col s8 m8">
                                        <form>
                                            <div className="form-bg">
                                                <input id="check-box" type="checkbox" />
                                                <label className="label-text" htmlFor="check-box">Attested</label>
                                            </div>
                                        </form>
                                        </div>
                                        <div className="col s4 m4">
                                            <a className="waves-effect waves-light btn" onClick={() => this.toggleSign()}>
                                                <i className="fa fa-file-o" /> Sign
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            </div>
                        </div>
                    </div>
                    <div className="col s3 m3">
                        {/* approve btn */}
                        {this.displayApprove()}
                    </div>
                </div>
            )
        }else{
            return ( <div /> )
        }
    }

    render() {
        const self = this;

        $( function() {
            $( "#draggable" ).draggable();
            $( "#droppable" ).droppable({
              drop: function( event, ui ) {

                $(".heart-img").removeClass("heart-img-border");

                self.state.organInstance.submitOrgan(self.state.account, '0', 12, { from: self.state.account }).then((result) => {
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
                        {this.goToTruck()}
                        <Link to="/truck" className="truck-page" />
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
                            {this.displayCheckList()}

                        </div>
                        <div className="col s3 m3">
                            {/* send delivery */}
                            {this.displayPhone()}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default Hospital;