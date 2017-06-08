let engineOnSampleV3 = require("./engineOnSampleV3.ogg"),
    engineOffSampleV3 = require("./engineOffSampleV3.ogg"),
    idlingLoopV3 = require("./idlingLoopV3.ogg"),
    accelerationV3 = require("./accelerationLoopV3.ogg"),
    Loop60V3 = require("./Loop60V3.ogg"),
    Loop100V3 = require("./Loop100V3.ogg"),
    Loop160V3 = require("./Loop160V3.ogg"),
    recuperationLoopV3 = require("./recuperationLoopV3.ogg");

var soundSchemeV3 = {
    name: "V3",
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

module.exports.ssv3 = soundSchemeV3