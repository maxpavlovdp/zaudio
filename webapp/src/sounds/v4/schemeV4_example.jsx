let engineOnSampleV3 = require("../v3/engineOnSampleV3.ogg"),
    engineOffSampleV3 = require("../v3/engineOffSampleV3.ogg"),
    idlingLoopV3 = require("../v3/idlingLoopV3.ogg"),
    accelerationV3 = require("../v3/accelerationLoopV3.ogg"),
    Loop60V3 = require("../v3/Loop60V3.ogg"),
    Loop100V3 = require("../v3/Loop100V3.ogg"),
    Loop160V3 = require("../v3/Loop160V3.ogg"),
    recuperationLoopV3 = require("../v3/recuperationLoopV3.ogg"),
    recuperationLoopV2 = require("../v2/recuperationLoop.ogg");

var soundSchemeV4 = {
    version : 4,
    start: {
        link: engineOnSampleV3
    },
    main: [
        {
            link: idlingLoopV3,
            margins: {
                speed :[0, 240]
            },
            pbr : {
                speed: [[0,1],[240,2.6]]
            },
            volume : {
                speed: [[0,1],[150,1.4]],
                power: [[0,0], [15000, 0.5],[35000,0.7]]
            },
            loop: true
        },
        {
            link: accelerationV3,
            margins: {
                speed :[0, 240]
            },
            pbr : {
                speed: [[0,1],[240,2.6]]
            },
            volume : {
                speed: [[0,0],[30,1]]
            },
            loop: true
        },
        {
            link: Loop60V3,
            margins: {
                speed :[60, 240]
            },
            pbr : {
                speed: [[0,0],[60,1],[240,2.2]]
            },
            volume : {
                speed: [[0,0],[60,0],[75,0.7]]
            },
            loop: true
        },
        {
            link: Loop100V3,
            margins: {
                speed :[100, 240]
            },
            pbr : {
                speed: [[0,0],[100,1],[240,1.9]]
            },
            volume : {
                speed: [[0,0],[100,0],[130,1.3]]
            },
            loop: true
        },
        {
            link: Loop160V3,
            margins: {
                speed :[160, 240]
            },
            pbr : {
                speed: [[0,0],[160,1],[240,1.5]]
            },
            volume : {
                speed: [[0,0],[160,0],[170,1.7]]
            },
            loop: true
        },
        {
            link: recuperationLoopV3,
            margins: {
                speed: [100, 240]
            },
            pbr : {
                speed: [[0,1],[240,1.7]]
            },
            volume : {
                recuperationPower: [[0, 0], [20000,1], [70000, 2]]
            },
            recuperation: true,
            loop: true
        },
        {
            link: recuperationLoopV2,
            margins: {
                speed: [10, 120]
            },
            pbr : {
                speed: [[10,1],[120,2]]
            },
            volume : {
                speed: [[10,0],[20,0.7],[110,2],[120,0]],
                recuperationPower: [[0, 0], [20000,1], [70000, 1.2]]
            },
            recuperation: true,
            loop: true
        },
        {
            link: Loop100V3,
            margins: {
                speed :[0, 240]
            },
            pbr : {
                power: [[0,0.5],[35000,1.2]]
            },
            volume : {
                power: [[0,0], [15000, 0.5],[35000,0.7]]
            },
            loop: true
        }
    ],
    stop: {
        link: engineOffSampleV3
    }
};

module.exports.ssv4example = soundSchemeV4;