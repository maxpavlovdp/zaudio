let engOn = require("./DailyV1EngOn.ogg"),
    engOff = require("./DailyV1EngOff.ogg"),
    idling = require("./DailyV1IdlingLoop.ogg"),
    acc2060 = require("./DailyV12060.ogg"),
    acc60240 = require("./DailyV160240.ogg"),
    recuperation = require("./DailyV1Rec.ogg");

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
                speed: [[0, 1], [20, 1.5], [240, 2.5]]
            },
            volume: {
                speed: [[0, 1], [150, 1.4]],
            },
            loop: true
        },
        {
            link: acc2060,
            margins: {
                speed: [0, 105]
            },
            pbr: {
                speed: [[0, 0], [15, 1.0], [30, 1.2], [45, 1.3], [60, 1.4], [75, 1.0], [90, 0.5], [105, 0]],
                power: [[0, 0], [290, 0.05], [581, 0.1]]
            },
            volume: {
                speed: [[0, 0], [15, 0.1], [30, 0.2], [45, 0.3], [60, 0.5], [75, 0.6], [90, 0.3], [105, 0]],
                power: [[0, 0], [290, 0.05], [581, 0.1]]
            },
            loop: true
        },
        {
            link: acc60240,
            margins: {
                speed: [55, 241]
            },
            pbr: {
                speed: [[55, 0], [60, 0.5], [100, 1.0], [160, 1.0], [240, 1.7]],
                power: [[0, 0], [290, 0.05], [581, 0.1]]
            },
            volume: {
                speed: [[55, 0], [60, 0.5], [240, 0.9]],
                power: [[0, 0], [290, 0.05], [581, 0.1]]
            },
            loop: true
        },
        {
            link: recuperation,
            margins: {
                speed: [0, 241]
            },
            pbr: {
                speed: [[0, 0], [10, 1.1], [20, 1.3], [30, 1.5], [40, 1.2], [90, 0.7], [140, 1.2], [240, 1]]
            },
            volume: {
                // recuperationPower: [[0, 0], [20000, 1], [70000, 2]]
                speed:[[0, 0], [5, 1.0], [10, 1.0], [20, 1.1], [30, 0.9], [40, 0.7], [90, 0.5], [190, 1.5], [240, 0.2]]
            },
            recuperation: true,
            loop: true
        },
    ],
    stop: {
        link: engOff
    }
};

module.exports.schemeDaily = schemeDaily;