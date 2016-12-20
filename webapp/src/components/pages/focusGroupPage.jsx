import React from 'react';
import CarSimulator from '../CarSimulator.jsx'
import CarSoundEngine from '../../CarSoundEngine.js'

export default class FocusGroupPage extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return <CarSimulator soundGenerator={new CarSoundEngine(require("../../sounds/v3/schemeV3.jsx").ssv3)}/>
    }
}