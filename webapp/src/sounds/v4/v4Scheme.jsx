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
}

module.exports.ssv4 = soundSchemeV4;

