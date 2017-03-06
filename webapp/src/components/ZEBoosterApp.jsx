import React from 'react';
import CarSimulator from './CarSimulator.jsx';
import CarSoundEngine from './../CarSoundEngine.js';
import {Link} from 'react-router';
import {REGISTER_START_BTN, BUTTON_CLICKED} from '../actions'

import {createStore} from 'redux';

class ZEB extends React.Component {
    constructor(props) {
        super(props);
        this.store = createStore(this.reduceFunc, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
    }

    reduceFunc(state = {}, action) {
        switch (action.type) {
            case REGISTER_START_BTN:
                return [...state, action.newBtn]
            case BUTTON_CLICKED:
                var newState = []
                state.forEach((element, index) => {
                    if (element.name === action.clickedBtn.name) {
                        newState.push(action.clickedBtn)
                    } else {
                        newState.push(element)
                    }
                })
                return newState
        }
    }

    render() {
        return <div>
            <Link to={'/focusGroup'}>Focus Group</Link>
            <CarSimulator store={this.store} name={"V4 Example"}
                          soundgen={new CarSoundEngine(require("../sounds/v4/schemeV4_example.jsx").ssv4)}/>
            <CarSimulator store={this.store} name={"V3"}
                          soundgen={new CarSoundEngine(require("../sounds/v3/schemeV3.jsx").ssv3)}/>
            <CarSimulator store={this.store} name={"V2"}
                          soundgen={new CarSoundEngine(require("../sounds/v2/schemeV2.jsx").ssv2)}/>
            <CarSimulator store={this.store} name={"V1"}
                          soundgen={new CarSoundEngine(require("../sounds/v1/schemeV1.jsx").ssv1)}/>
        </div>
    }
}

export default ZEB;
