import React from 'react';
import CarSimulator from './CarSimulator.jsx'
import CarSoundEngine from './../CarSoundEngine.js'
import {Link} from 'react-router'

class ZEB extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <div>
            <Link to={'/focusGroup'}>Focus Group</Link>
            <h1>V4</h1>
            <CarSimulator soundgen={new CarSoundEngine(require("../sounds/v4/v4Scheme.jsx").ssv4)}/>
            <h1>V4 Example</h1>
            <CarSimulator soundgen={new CarSoundEngine(require("../sounds/v4/schemeV4_example.jsx").ssv4example)}/>
            <h1>V3</h1>
            <CarSimulator soundgen={new CarSoundEngine(require("../sounds/v3/schemeV3.jsx").ssv3)}/>
            <h1>V2</h1>
            <CarSimulator soundgen={new CarSoundEngine(require("../sounds/v2/schemeV2.jsx").ssv2)}/>
            <h1>V1</h1>
            <CarSimulator soundgen={new CarSoundEngine(require("../sounds/v1/schemeV1.jsx").ssv1)}/>
        </div>
    }
}

export default ZEB;
