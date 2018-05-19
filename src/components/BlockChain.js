import React, { Component } from 'react';

import Block from '../components/Block';
import '../assets/css/blockchain.css';

class BLockChain extends Component {
    
    render() {
        return(
            <div className="blockchain-bg moveFromTopFade">
                <div className="row">
                    <div className="col s2 m2">
                        <h4 className="blockchain-explore-text">Block Explorer</h4>
                    </div>

                    <div className="col s2 m2 moveFromTopFade delay200">
                        <Block />
                    </div>
                    <div className="col s2 m2 moveFromTopFade delay300">
                        <Block />
                    </div>
                    <div className="col s2 m2 moveFromTopFade delay400">
                        <Block />
                    </div>
                    <div className="col s2 m2 moveFromTopFade delay500">
                        <Block />
                    </div>

                    <div className="col s2 m2" />
                </div>
            </div>
        )
    }
}
export default BLockChain;