import React from 'react';

import CarSimulator from './CarSimulator.jsx'
import CarSoundEngine from './../CarSoundEngine.js'

let acceleration100FunLoop = require("../sounds/v2/acceleration100+FunLoop.ogg"),
    acceleration160CrazyLoop = require("../sounds/v2/acceleration160+CrazyLoop.ogg"),
    accelerationLoop = require("../sounds/v2/accelerationLoop.ogg"),
    engineOffSample = require("../sounds/v2/engineOffSample.ogg"),
    engineOnSample = require("../sounds/v2/engineOnSample.ogg"),
    idlingLoop = require("../sounds/v2/idlingLoop.ogg"),
    recuperationLoop = require("../sounds/v2/recuperationLoop.ogg");
var soundSchemeV2 = {
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

let acceleration = require("../sounds/v1/acceleration.ogg"),
    engineOn = require("../sounds/v1/engineOn.ogg");
var soundSchemeV1 = {
    start: {
        link: engineOn
    },
    main: [
        {
            link: acceleration,
            speed: {
                margins: [0, 140],
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
            <CarSimulator soundgen={new CarSoundEngine(soundSchemeV2)}/>
            <h1>V1</h1>
            <CarSimulator soundgen={new CarSoundEngine(soundSchemeV1)}/>
        </div>;
    }
}

export default ZEB;
