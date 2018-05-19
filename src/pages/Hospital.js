import React, { Component } from 'react';
import $ from 'jquery';
import '../../node_modules/jquery-ui';
import '../../node_modules/jquery-ui-bundle';

import BlockChain from '../components/BlockChain';
import Phone from '../components/Phone';

import HeartImg from '../assets/images/heart.png';
import '../assets/css/hospital.css';

class Hospital extends Component {
    
    state = {
        blockchain: null
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

        $( function() {
            $( "#draggable" ).draggable();
            $( "#droppable" ).droppable({
              drop: function( event, ui ) {

                $(".heart-img").removeClass("heart-img-border");
                setTimeout(() => {
                    // web3 call here
                    $(".block-trigger").click();
                }, 1500);
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
                                        <div className="organ-text">Organ Size: 12.171 cm</div>
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