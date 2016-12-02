import React from 'react';

import CarSimulator from './CarSimulator.jsx'
import CarSoundEngine from './../CarSoundEngine.js'

let engineOnSampleV3 = require("../sounds/v3/engineOnSampleV3.ogg"),
    engineOffSampleV3 = require("../sounds/v3/engineOffSampleV3.ogg"),
    idlingLoopV3 = require("../sounds/v3/idlingLoopV3.ogg"),
    accelerationV3 = require("../sounds/v3/accelerationLoopV3.ogg"),
    Loop60V3 = require("../sounds/v3/Loop60V3.ogg"),
    Loop100V3 = require("../sounds/v3/Loop100V3.ogg"),
    Loop160V3 = require("../sounds/v3/Loop160V3.ogg"),
    recuperationLoopV3 = require("../sounds/v3/recuperationLoopV3.ogg");

var soundSchemeV3 = {
    start: {
        link: engineOnSampleV3
    },
    main: [
        {
            link: idlingLoopV3,
            speed: {
                margins: [0, 250],
                volume: [[0, 1], [150, 1.4]]
            },
            loop: true
        },
        {
            link: accelerationV3,
            speed: {
                margins: [0, 250],
                volume: [[0, 0.01], [30, 1]]
            },
            loop: true
        },
        {
            link: Loop60V3,
            speed: {
                margins: [60, 250],
                volume: [[60, 0.01], [75, 0.7]]
            },
            loop: true
        },
        {
            link: Loop100V3,
            speed: {
                margins: [100, 250],
                volume: [[100, 0.01], [130, 1.3]]
            },
            loop: true
        },
        {
            link: Loop160V3,
            speed: {
                margins: [160, 250],
                volume: [[160, 0.01], [170, 1.7]]
            },
            loop: true
        },
        {
            link: recuperationLoopV3,
            speed: {
                margins: [0, 250],
                volume: [[0, 0.01], [30, 4], [250, 5.5]]
            },
            recuperation: true,
            loop: true
        }
    ],
    stop: {
        link: engineOffSampleV3
    }
};

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
            <h1>V3</h1>
            <CarSimulator soundgen={new CarSoundEngine(soundSchemeV3)}/>
            <h1>V2</h1>
            <CarSimulator soundgen={new CarSoundEngine(soundSchemeV2)}/>
            <h1>V1</h1>
            <CarSimulator soundgen={new CarSoundEngine(soundSchemeV1)}/>
        </div>
    }
}

export default ZEB;
