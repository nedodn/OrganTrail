import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import '../assets/css/phone.css';
import PhoneImg from '../assets/images/phone.png';

class Phone extends Component {
    
    displayAccept() {
        return(
            <div className="phone-btn">
                <Link to="/">
                <a className="waves-effect waves-light btn">
                    <i className="fa fa-truck" /> Accept Package
                </a>
                </Link>
            </div>
        )
    }

    render() {
        return(
            <div className="phone-block moveFromRightFade delay100">
                <img  className="phone-img" src={PhoneImg} alt="" />
                {this.displayAccept()}
            </div>
        )
    }
}
export default Phone;