import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import splashImg from '../assets/images/splashLight.png';
import '../assets/css/home.css';

class Home extends Component {

    render() {
        return(
            <div className="home-bg">
                <div className="splash-block">
                    <img className="splash-img" src={splashImg} alt="" />
                </div>
                <div>
                    <Link to='/hospital'>
                        <h1 className="home-title-text">Organ Trail</h1>
                    </Link>
                    <h4 className="home-title-tag-text">Track and Tracing of organs donations using the blockchain</h4>
                </div>
            </div>
        )
    }

}
export default Home;