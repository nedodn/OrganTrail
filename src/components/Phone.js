import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import '../assets/css/phone.css';
import PhoneImg from '../assets/images/phone.png';

class Phone extends Component {


    displayAccept() {
        return(
            <div className="phone-btn moveFromBottomFade delay300">
                <div className="waves-effect waves-light btn" onClick={() => this.props.acceptPackage()}>
                    <i className="fa fa-truck" /> {this.props.btnMsg}
                </div>
            </div>
        )
    }
    displayDeliver() {
        return(
            <div className="phone-btn moveFromBottomFade delay300" onClick={() => this.props.deliveryThing()}>
                <div className="waves-effect waves-light btn">
                    <i className="fa fa-truck" /> {this.props.btnMsg}
                </div>
            </div>
        )
    }

    render() {
        if(this.props.btnMsg==="Accept Package") {
            return(
                <div className="phone-block">
                    <img className="phone-img moveFromRightFade" src={PhoneImg} alt="" />
                    {this.displayAccept()}
                </div>
            )
        }else if(this.props.btnMsg==="Deliver Package") {
            return(
                <div className="phone-block">
                    <img className="phone-img moveFromRightFade" src={PhoneImg} alt="" />
                    {this.displayDeliver()}
                </div>
            )
        }else{
            return(
                <div />
            )
        }
    }
}
export default Phone;