import React from 'react';

import CarSimulator from './CarSimulator.jsx'
import CarSoundEngine from './../CarSoundEngine.js'

class ZEB extends React.Component {
    constructor(props) {
        super(props);
    }

    render () {
        return  <div>
                    <CarSimulator soundgen={new CarSoundEngine()}/>
                    <CarSimulator soundgen={new CarSoundEngine()}/>
                </div>;
    }
}

export default ZEB;
