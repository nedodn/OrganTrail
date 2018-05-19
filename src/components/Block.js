import React, { Component } from 'react';

import BlockSq from '../assets/images/blockSq.png';
import dotsPic from '../assets/images/dots.png';

class BLock extends Component {
    
    render() {
        return(
            <div className="block-block">
                <div className="block-bg">
                    <div className="block-main-text">Block #1</div>
                    <div className="block-square-block">
                        <img className="block-square" src={BlockSq} alt="" />
                    </div>
                    
                </div>
            </div>
        )
    }
}
export default BLock;