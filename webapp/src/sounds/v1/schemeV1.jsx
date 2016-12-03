/**
 * Created by Max Pavlov on 12/3/16.
 */
let acceleration = require("./acceleration.ogg"),
    engineOn = require("./engineOn.ogg");
const soundSchemeV1 = {
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

module.exports.ssv1 = soundSchemeV1