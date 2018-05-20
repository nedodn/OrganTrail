import React, { Component } from 'react';

import BlockSq from '../assets/images/blockSq.png';

class BLock extends Component {
    
    render() {
        return(
            <div className="block-block">
                <div className="block-bg">
                    <div className="block-main-text">Block # {this.props.blockNum}</div>
                    <div className="block-square-block">
                        <img className="block-square" src={BlockSq} alt="" />
                    </div>
                    <div className="block-tx-text">TX# {this.props.hash}...</div>
                </div>
            </div>
        )
    }
}
export default BLock;