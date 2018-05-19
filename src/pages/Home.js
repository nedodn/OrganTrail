import React, { Component } from 'react';
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
                    <h1 className="home-title-text">Organ Trail</h1>
                </div>
            </div>
        )
    }

}
export default Home;