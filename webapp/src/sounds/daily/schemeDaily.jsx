let engOn = require("./DailyV1EngOn.ogg"),
    engOff = require("./DailyV1EngOff.ogg"),
    idling = require("./DailyV1IdlingLoop.ogg")

let schemeDaily = {
    name: "Daily",
    version: 4,
    start: {
        link: engOn
    },
    main: [
        {
            link: idling,
            margins: {
                speed: [0, 241]
            },
            pbr: {
                speed: [[0, 1], [240, 2.5]]
            },
            volume: {
                speed: [[0, 0.8], [150, 1.4]],
                // power: [[0, 0], [15000, 0.5], [35000, 0.7]]
            },
            loop: true
        }
    ],
    stop: {
        link: engOff
    }
};

module.exports.schemeDaily = schemeDaily;