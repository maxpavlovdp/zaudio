let V4_0_30 = require("./V4_0-30.ogg"),
    V4_30_60 = require("./V4_30-60.ogg"),
    V4_60_100 = require("./V4_60-100.ogg"),
    V4_100_160 = require("./V4_100-160.ogg"),
    V4_160_240 = require("./V4_160-240.ogg"),
    V4_ENG_ON = require("./V4_ENG_ON.ogg"),
    V4_IDLING = require("./V4_IDLING.ogg"),
    V4_ENG_OFF = require("./V4_ENG_OFF.ogg"),
    V4_RECUPERATION = require("./V4_RECUPERATION.ogg");

var soundSchemeV4 = {
    version: 4,
    start: {
        link: V4_ENG_ON
    },
    main: [
        {
            link: V4_IDLING,
            margins: {
                speed: [0, 240]
            },
            pbr: {
                speed: [[0, 1], [240, 2.5]]
            },
            volume: {
                speed: [[0, 1], [150, 1.4]],
                power: [[0, 0], [15000, 0.5], [35000, 0.7]]
            },
            loop: true
        }
    ]
},
    {
        link: V4_0_30,
        margins: {
            speed :[0, 30]
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
        link: V4_30_60,
        margins: {
            speed :[30, 60]
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
        link: V4_60_100,
        margins: {
            speed :[60, 100]
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
        link: V4_100_160,
        margins: {
            speed :[100, 160]
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
        link: V4_160_240,
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
        link: V4_RECUPERATION,
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
        link: V4_RECUPERATION,
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

],
stop: {
    link: V4_ENG_OFF
},
};

module.exports.ssv4 = soundSchemeV4;

