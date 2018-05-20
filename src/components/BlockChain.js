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
    displayChainTwo() {
        return(
            <div className="block-chain-link dots-anim-one">
                <div className="fa fa-chain-broken block-chain-icon-thre moveFromTopFade delay300" />
                <div className="fa fa-chain-broken block-chain-icon-two moveFromTopFade delay400" />
                <div className="fa fa-chain-broken block-chain-icon-one moveFromTopFade delay500" />
            </div>
        )  
    }
    render() {

        if(this.props.stage === "one") {
            return(
                <div className="blockchain-bg moveFromTopFade">
                    <div className="row">
                        <div className="col s2 m2">
                            <h4 className="blockchain-explore-text">Block Explorer</h4>
                        </div>
    
                        <div className="col s2 m2 moveFromTopFade delay200">
                            <Block blockNum="1" hash="0X56A3D4AB" />
                        </div>
                        
                        <div className="col s6 m6" />
                        <div className="col s2 m2">
                        </div>
                    </div>
                </div>
            )
        }else if(this.props.stage === "two") {
            return(
                <div className="blockchain-bg moveFromTopFade">
                    <div className="row">
                        <div className="col s2 m2">
                            <h4 className="blockchain-explore-text">Block Explorer</h4>
                        </div>
    
                        <div className="col s2 m2 moveFromTopFade delay200">
                            <Block blockNum="1" hash="0X56A3D4AB" />
                        </div>
                        
                        {this.displayChain()}

                        <div className="col s2 m2 moveFromTopFade delay300">
                            <Block blockNum="2" hash="0X4205BA76" />
                        </div>

                        <div className="col s4 m4" />
                        <div className="col s2 m2">
    
                        </div>
                    </div>
                </div>
            )
        }else if(this.props.stage === "three") {
            return(
                <div className="blockchain-bg moveFromTopFade">
                    <div className="row">
                        <div className="col s2 m2">
                            <h4 className="blockchain-explore-text">Block Explorer</h4>
                        </div>
    
                        <div className="col s2 m2 moveFromTopFade delay200">
                            <Block blockNum="1" hash="0X56A3D4AB" />
                        </div>
                        
                        {this.displayChain()}

                        <div className="col s2 m2 moveFromTopFade delay300">
                            <Block blockNum="2" hash="0X4205BA76" />
                        </div>

                        {this.displayChainTwo()}

                        <div className="col s2 m2 moveFromTopFade delay300">
                            <Block blockNum="3" hash="0X4205BA76" />
                        </div>

                        <div className="col s2 m2" />

                        {/*     
                        <div className="col s2 m2 moveFromTopFade delay400">
                            <Block />
                        </div>
                        <div className="col s2 m2 moveFromTopFade delay500">
                            <Block /> 
                        </div>
                        */}
                        <div className="col s2 m2">
    
                        </div>
                    </div>
                </div>
            )
        }else if(this.props.stage === "four") {
            return(
                <div className="blockchain-bg moveFromTopFade">
                    <div className="row">
                        <div className="col s2 m2">
                            <h4 className="blockchain-explore-text">Block Explorer</h4>
                        </div>
    
                        <div className="col s2 m2 moveFromTopFade delay200">
                            <Block blockNum="1" hash="0X56A3D4AB" />
                        </div>
                        
                        {this.displayChain()}

                        <div className="col s2 m2 moveFromTopFade delay300">
                            <Block blockNum="2" hash="0X4205BA76" />
                        </div>

                        {this.displayChainTwo()}

                        <div className="col s2 m2 moveFromTopFade delay300">
                            <Block blockNum="3" hash="0X4205BA76" />
                        </div>

                        {this.displayChain()}
                        
                        <div className="col s2 m2 moveFromTopFade delay400">
                            <Block blockNum="4" hash=" 0X829044AD" />
                        </div>

                        
                        {/*     
                        <div className="col s2 m2 moveFromTopFade delay500">
                            <Block /> 
                        </div>
                        */}
                        <div className="col s2 m2">
    
                        </div>
                    </div>
                </div>
            )
        }else if(this.props.stage === "five") {
            return(
                <div className="blockchain-bg moveFromTopFade">
                    <div className="row">

                        <div className="col s2 m2">
                            <h4 className="blockchain-explore-text">Block Explorer</h4>
                        </div>
    
                        <div className="col s2 m2 moveFromTopFade delay200">
                            <Block blockNum="1" hash="0X56A3D4AB" />
                        </div>
                        
                        {this.displayChain()}

                        <div className="col s2 m2 moveFromTopFade delay300">
                            <Block blockNum="2" hash="0X4205BA76" />
                        </div>

                        {this.displayChainTwo()}

                        <div className="col s2 m2 moveFromTopFade delay300">
                            <Block blockNum="3" hash="0X4205BA76" />
                        </div>

                        {this.displayChain()}
                        
                        <div className="col s2 m2 moveFromTopFade delay400">
                            <Block blockNum="4" hash=" 0X829044AD" />
                        </div>

                        {this.displayChainTwo()}
                            
                        <div className="col s2 m2 moveFromTopFade delay500">
                            <Block blockNum="5" hash=" 0X829044AD" /> 
                        </div>
        
                    </div>
                </div>
            )
        }

    }
}
export default BLockChain;