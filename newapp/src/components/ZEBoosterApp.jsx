import React from 'react';

import CarSimulator from './CarSimulator.jsx'
import CarSoundEngine from './CarSoundEngine.js'

let acceleration = require("../sound/acceleration.ogg"),
    engineOn = require("../sound/engineOn.ogg"),
    acceleration100FunLoop = require("../sound/acceleration100+FunLoop.ogg"),
    acceleration160CrazyLoop = require("../sound/acceleration160+CrazyLoop.ogg"),
    accelerationLoop = require("../sound/accelerationLoop.ogg"),
    engineOffSample = require("../sound/engineOffSample.ogg"),
    engineOnSample = require("../sound/engineOnSample.ogg"),
    idlingLoop = require("../sound/idlingLoop.ogg"),
    recuperationLoop = require("../sound/recuperationLoop.ogg");


var car1 = {
    start: {
        link: engineOnSample
    },
    main: [
        {
            link: accelerationLoop,
            speed: {
                margins: [0, 250]
            },
            defMargins: [0, 30],
            loop: true
        },
        {
            link: idlingLoop,
            speed: {
                margins: [0, 250],
                volume: [[0, 0.4], [150, 1]]
            },
            loop: true
        },
        {
            link: acceleration100FunLoop,
            speed: {
                margins: [100, 250],
                volume: [[100, 0.01], [150, 1]]
            },
            loop: true
        },
        {
            link: acceleration160CrazyLoop,
            speed: {
                margins: [160, 250],
                volume: [[160, 0.01], [170, 2]]
            },
            loop: true
        },
        {
            link: recuperationLoop,
            speed: {
                margins: [0, 250]
            },
            recuperation: true,
            loop: true
        }
    ],
    stop: {
        link: engineOffSample
    }
};

var car2 = {
    start: {
        link: engineOn
    },
    main: [
        {
            link: acceleration,
            speed: {
                margins: [0, 240],
                volume: [[0, 1], [240, 1.5]]
            },
            loop: true
        }
    ]
};

class ZEB extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <div>
            <h1>V2</h1>
            <CarSimulator soundgen={new CarSoundEngine(car1)}/>
            <h1>V1</h1>
            <CarSimulator soundgen={new CarSoundEngine(car2)}/>
        </div>;
    }
}

export default ZEB;
