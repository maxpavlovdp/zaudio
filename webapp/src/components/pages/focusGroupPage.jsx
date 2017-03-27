import React from 'react';
import CarSimulator from '../CarSimulator.jsx'
import CarSoundEngine from '../../CarSoundEngine.js'
import reducers from '../../reducers'
import {createStore} from 'redux'

export default class FocusGroupPage extends React.Component {
    constructor(props) {
        super(props)
        this.store = createStore(reducers)
    }

    render() {
        return <CarSimulator name="Focus Group" store={this.store} soundgen={new CarSoundEngine(require("../../sounds/v3/schemeV3.jsx").ssv3)}/>
    }
}