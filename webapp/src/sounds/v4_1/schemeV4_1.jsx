let V4Acc0_30 = require("./V4Acc0_30.ogg"),
    V4Acc30_60 = require("./V4Acc30_60.ogg"),
    V4Acc60_100 = require("./V4Acc60_100.ogg"),
    V4Acc100_160 = require("./V4Acc100_160.ogg"),
    V4Acc160_240 = require("./V4Acc160_240.ogg"),
    V4EngOff = require("./V4EngOff.ogg"),
    V4EngOn = require("./V4EngOn.ogg"),
    V4IdlingLoop = require("./V4IdlingLoop.ogg"),
    V4Rec0_30 = require("./V4Rec0_30.ogg"),
    V4Rec30_60 = require("./V4Rec30_60.ogg"),
    V4Rec60_100 = require("./V4Rec60_100.ogg"),
    V4Rec100_160 = require("./V4Rec100_160.ogg"),
    V4Rec160_240 = require("./V4Rec160_240.ogg");


let soundSchemeV4_1 = {
    name: "GT",
    version: 4,
    start: {
        link: V4EngOn
    },
    main: [
        {
            link: V4IdlingLoop,
            margins: {
                speed: [0, 241]
            },
            pbr: {
                speed: [[0, 1], [240, 2.5]]
            },
            volume: {
                speed: [[0, 1], [150, 1.4]],
                // power: [[0, 0], [15000, 0.5], [35000, 0.7]]
            },
            loop: true
        },
        {
            link: V4Acc0_30,
            margins: {
                speed: [0, 241]
            },
            pbr: {
                speed: [[0, 0], [15, 1], [30, 2]]
            },
            volume: {
                speed: [[0, 0], [15, 1], [30, 2], [60, 1], [120, 1.5], [240, 0]]
            },
            loop: true
        },
        {
            link: V4Acc30_60,
            margins: {
                speed: [25, 241]
            },
            pbr: {
                speed: [[25, 0], [30, 1], [45, 2.2], [60, 2.4], [120, 2.8], [240, 0]]
            },
            volume: {
                speed: [[25, 0], [30, 1], [45, 2.2], [60, 2.5], [120, 1], [240, 0]]
            },
            loop: true
        },
        {
            link: V4Acc60_100,
            margins: {
                speed: [55, 241]
            },
            pbr: {
                speed: [[55, 0], [60, 1], [75, 1.5], [100, 2.2], [160, 0.3], [240, 2.2]]
            },
            volume: {
                speed: [[55, 0], [60, 1], [75, 1.2], [100, 1.4], [160, 0.5], [240, 1.4]]
            },
            loop: true
        },
        {
            link: V4Acc100_160,
            margins: {
                speed: [95, 241]
            },
            pbr: {
                speed: [[95, 0], [100, 1], [130, 1.6], [160, 2.2], [190, 2.4], [230, 2.6]]
            },
            volume: {
                speed: [[95, 0], [100, 1], [130, 1.6], [160, 2.2], [190, 1.2], [230, 0.4]]
            },
            loop: true
        },
        {
            link: V4Acc160_240,
            margins: {
                speed: [155, 241]
            },
            pbr: {
                speed: [[155, 0], [160, 0.2], [200, 1], [240, 2]]
            },
            volume: {
                speed: [[155, 0], [160, 2], [200, 2], [240, 2]]
            },
            loop: true
        },

        // Recuperation
        {
            link: V4Rec0_30,
            margins: {
                speed: [0, 241]
            },
            pbr: {
                speed: [[0, 0.2], [10, 1], [20, 1.4], [30, 1.7], [90, 0.2]]
            },
            volume: {
                // recuperationPower: [[0, 0], [20000, 1], [70000, 2]]
                speed:[[0, 0.2], [10, 0.3], [20, 0.5], [30, 1]]
            },
            recuperation: true,
            loop: true
        },
        {
            link: V4Rec30_60,
            margins: {
                speed: [25, 241]
            },
            pbr: {
                speed: [[25, 0], [30, 0.5], [60, 1], [120, 0.1]]
            },
            volume: {
                // recuperationPower: [[0, 0], [20000, 1], [70000, 2]]
                speed:[[25, 0], [30, 0.5], [60, 1], [120, 0]]
            },
            recuperation: true,
            loop: true
        },
        {
            link: V4Rec60_100,
            margins: {
                speed: [50, 241]
            },
            pbr: {
                speed: [[50, 0], [60, 1], [100, 1.7], [120, 0.2]]
            },
            volume: {
                // recuperationPower: [[0, 0], [20000, 1], [70000, 2]]
                speed:[[50, 0], [60, 0.4], [100, 1], [150, 0.2]]
            },
            recuperation: true,
            loop: true
        },
        {
            link: V4Rec100_160,
            margins: {
                speed: [80, 241]
            },
            pbr: {
                speed: [[80, 0], [100, 1], [160, 1.7], [200, 0.2]]
            },
            volume: {
                // recuperationPower: [[0, 0], [20000, 1], [70000, 2]]
                speed:[[80, 0], [100, 1], [160, 1], [180, 0.2], [200, 0]]
            },
            recuperation: true,
            loop: true
        },
        {
            link: V4Rec160_240,
            margins: {
                speed: [130, 241]
            },
            pbr: {
                speed: [[130, 0], [160, 1], [230, 1.7], [240, 0]]
            },
            volume: {
                // recuperationPower: [[0, 0], [20000, 1], [70000, 2]]
                speed:[[130, 0], [160, 0.7], [230, 1], [240, 0]]
            },
            recuperation: true,
            loop: true
        }
    ],
    stop: {
        link: V4EngOff
    }
};

module.exports.soundSchemeV4_1 = soundSchemeV4_1;