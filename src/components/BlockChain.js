import React, { Component } from 'react';

import Block from '../components/Block';
import '../assets/css/blockchain.css';

class BLockChain extends Component {
    
    displayChain() {
        return(
            <div className="block-chain-link dots-anim-one">
                <div className="fa fa-chain-broken block-chain-icon-one moveFromTopFade delay300" />
                <div className="fa fa-chain-broken block-chain-icon-two moveFromTopFade delay400" />
                <div className="fa fa-chain-broken block-chain-icon-thre moveFromTopFade delay500" />
            </div>
        )
    }

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
                    
                    {this.displayChain()}

                    <div className="col s2 m2 moveFromTopFade delay300">
                        <Block />
                    </div>
                    <div className="col s4 m4" />
                    {/* <div className="col s2 m2 moveFromTopFade delay400">
                        <Block />
                    </div>
                    <div className="col s2 m2 moveFromTopFade delay500">
                        <Block /> 
                    </div>*/}

                    <div className="col s2 m2">

                    </div>
                </div>
            </div>
        )
    }
}
export default BLockChain;