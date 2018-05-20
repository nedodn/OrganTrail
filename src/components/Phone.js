import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import '../assets/css/phone.css';
import PhoneImg from '../assets/images/phone.png';

class Phone extends Component {
    
    displayAccept() {
        return(
            <div className="phone-btn moveFromBottomFade delay300">
                <Link to="/truck">
                <div className="waves-effect waves-light btn">
                    <i className="fa fa-truck" /> {this.props.btnMsg}
                </div>
                </Link>
            </div>
        )
    }

    render() {
        return(
            <div className="phone-block">
                <img className="phone-img moveFromRightFade" src={PhoneImg} alt="" />
                {this.displayAccept()}
            </div>
        )
    }
}
export default Phone;