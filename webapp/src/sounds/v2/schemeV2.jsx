let acceleration100FunLoop = require("./acceleration100FunLoop.ogg"),
    acceleration160CrazyLoop = require("./acceleration160CrazyLoop.ogg"),
    accelerationLoop = require("./accelerationLoop.ogg"),
    engineOffSample = require("./engineOffSample.ogg"),
    engineOnSample = require("./engineOnSample.ogg"),
    idlingLoop = require("./idlingLoop.ogg"),
    recuperationLoop = require("./recuperationLoop.ogg");
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
module.exports.ssv2 = soundSchemeV2