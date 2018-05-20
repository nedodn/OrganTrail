import React, { Component } from 'react';

import TruckDirectionMap from '../components/maps/TruckDirectionMap';
import BlockChain from '../components/BlockChain';
import Phone from '../components/Phone';
import '../assets/css/map.css';

class Truck extends Component {

    displayMap() {
        return( 
            <TruckDirectionMap className="map-section" /> 
        );
    }
    displayBlocks() {
        return(
            <BlockChain stage="three" />
        )
    }
    displayPhone() {
        return(
            <div className="map-side">
                <Phone btnMsg="Delivery Package" />
            </div>
        )
    }

    render() {
        return(
            <div>
                
                <div className="row">
                    <div className="col s9 m9">
                        {this.displayMap()}
                    </div>
                    <div className="col s3 m3">
                        {this.displayPhone()}
                    </div>
                </div>

                <div className="row">
                <div className="col s12 m12 map-top">
                    {this.displayBlocks()}
                </div>
                </div>

            </div>
        )
    }

}
export default Truck;