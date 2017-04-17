let V4Acc0_30 = require("./V4Acc0_30.ogg"),
    V4Acc30_60 = require("./V4Acc30_60.ogg"),
    V4Acc60_100 = require("./V4Acc60_100.ogg"),
    V4Acc100_160 = require("./V4Acc100-160.ogg"),
    V4Acc160_240 = require("./V4Acc160-240.ogg"),
    V4EngOff = require("./V4EngOff.ogg"),
    V4EngOn = require("./V4EngOn.ogg"),
    V4IdlingLoop = require("./V4IdlingLoop.ogg"),
    V4Rec0_30 = require("./V4Rec0_30.ogg"),
    V4Rec30_60 = require("./V4Rec30_60.ogg"),
    V4Rec60_100 = require("./V4Rec60_100.ogg"),
    V4Rec100_160 = require("./V4Rec100-160.ogg"),
    V4Rec160_240 = require("./V4Rec160-240.ogg");


let soundSchemeV4_1 = {
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
                speed: [0, 30]
            },
            pbr: {
                speed: [[30, 0], [10, 1], [30, 2.2]]
            },
            volume: {
                speed: [[30, 0], [10, 0.5], [25, 0.7]]
            },
            loop: true
        },
        {
            link: V4Acc30_60,
            margins: {
                speed: [30, 60]
            },
            pbr: {
                speed: [[30, 0], [45, 1], [60, 1.9]]
            },
            volume: {
                speed: [[30, 0], [45, 1], [60, 1.3]]
            },
            loop: true
        },
        {
            link: V4Acc60_100,
            margins: {
                speed: [60, 100]
            },
            pbr: {
                speed: [[60, 0], [75, 1], [100, 2.2]]
            },
            volume: {
                speed: [[0, 0], [60, 0], [75, 0.7]]
            },
            loop: true
        },
        {
            link: V4Acc100_160,
            margins: {
                speed: [100, 160]
            },
            pbr: {
                speed: [[100, 0], [130, 1], [160, 1.5]]
            },
            volume: {
                speed: [[100, 0], [130, 0.7], [160, 1.7]]
            },
            loop: true
        },
        {
            link: V4Acc160_240,
            margins: {
                speed: [160, 241]
            },
            pbr: {
                speed: [[160, 0], [200, 1], [170, 1.5]]
            },
            volume: {
                speed: [[160, 0], [200, 0.7], [170, 1.7]]
            },
            loop: true
        },

        // Recuperation
        {
            link: V4Rec0_30,
            margins: {
                speed: [0, 30]
            },
            pbr: {
                speed: [[0, 1], [30, 1.7]]
            },
            volume: {
                // recuperationPower: [[0, 0], [20000, 1], [70000, 2]]
                speed:[[0, 1], [30, 1]]
            },
            recuperation: true,
            loop: true
        },
        {
            link: V4Rec30_60,
            margins: {
                speed: [30, 60]
            },
            pbr: {
                speed: [[30, 1], [60, 1.7]]
            },
            volume: {
                // recuperationPower: [[0, 0], [20000, 1], [70000, 2]]
                speed:[[30, 1], [60, 1]]
            },
            recuperation: true,
            loop: true
        },
        {
            link: V4Rec60_100,
            margins: {
                speed: [60, 100]
            },
            pbr: {
                speed: [[60, 1], [100, 1.7]]
            },
            volume: {
                // recuperationPower: [[0, 0], [20000, 1], [70000, 2]]
                speed:[[60, 1], [100, 1]]
            },
            recuperation: true,
            loop: true
        },
        {
            link: V4Rec100_160,
            margins: {
                speed: [100, 160]
            },
            pbr: {
                speed: [[100, 1], [160, 1.7]]
            },
            volume: {
                // recuperationPower: [[0, 0], [20000, 1], [70000, 2]]
                speed:[[100, 1], [160, 1]]
            },
            recuperation: true,
            loop: true
        },
        {
            link: V4Rec160_240,
            margins: {
                speed: [160, 240]
            },
            pbr: {
                speed: [[160, 1], [240, 1.7]]
            },
            volume: {
                // recuperationPower: [[0, 0], [20000, 1], [70000, 2]]
                speed:[[160, 1], [240, 1]]
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