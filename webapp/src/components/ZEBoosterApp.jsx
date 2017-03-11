import React from 'react'
import CarSimulator from './CarSimulator.jsx'
import CarSoundEngine from './../CarSoundEngine.js'
import {Link} from 'react-router'
import {createStore} from 'redux'
import reducers from '../reducers'
import AppConstants from '../AppConstants'
import __ZEBCONFIG__ from '../config/config'

class ZEB extends React.Component {
    constructor(props) {
        super(props);

        if (__ZEBCONFIG__.env === AppConstants.DEV) {
            this.store = createStore(reducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
        } else {
            this.store = createStore(reducers)
        }
    }

    render() {
        return (
            <div>
                <Link to={'/focusGroup'}>Focus Group</Link>
                <CarSimulator store={this.store} name={"V4"}
                              soundgen={new CarSoundEngine(require("../sounds/v4/v4Scheme.jsx").ssv4)}/>
                <CarSimulator store={this.store} name={"V4 Example"}
                              soundgen={new CarSoundEngine(require("../sounds/v4/schemeV4_example.jsx").ssv4example)}/>
                <CarSimulator store={this.store} name={"V3"}
                              soundgen={new CarSoundEngine(require("../sounds/v3/schemeV3.jsx").ssv3)}/>
                <CarSimulator store={this.store} name={"V2"}
                              soundgen={new CarSoundEngine(require("../sounds/v2/schemeV2.jsx").ssv2)}/>
                <CarSimulator store={this.store} name={"V1"}
                              soundgen={new CarSoundEngine(require("../sounds/v1/schemeV1.jsx").ssv1)}/>
            </div>
        )
    }
}


export default ZEB;
