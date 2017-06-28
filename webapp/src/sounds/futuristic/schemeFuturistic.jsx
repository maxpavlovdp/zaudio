let engOn = require("./SW_ENG_ON.ogg"),
    engOff = require("./SW_ENG_OFF.ogg"),
    idling = require("./SW_IDLING.ogg"),
    acc1 = require("./SW_ACC_1.ogg"),
    acc2 = require("./SW_ACC_2.ogg"),
    acc3 = require("./SW_ACC_3.ogg"),
    recup1 = require("./SW_RECUP_1.ogg"),
    recup2 = require("./SW_RECUP_2.ogg"),
    recup3 = require("./SW_RECUP_3.ogg");

let schemeFuturistic = {
    name: "Star Wars",
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
                speed: [[0, 1], [120, 1.2], [240, 1.5]]
            },
            volume: {
                speed: [[0, 1], [120, 1.2], [160, 0.7]],
                // power: [[0, 0], [230, 0.5], [490, 0.7]]
            },
            loop: true
        },
        {
            link: acc1,
            margins: {
                speed: [0, 241]
            },
            pbr: {
                speed: [[15, 0], [30, 1.2], [50, 1], [100, 1.2], [160, 1.5], [200, 0.7]]
            },
            volume: {
                speed: [[15, 0], [30, 0.9], [50, 0.7], [200, 0.9]],
            },
            loop: true
        },
        {
            link: acc2,
            margins: {
                speed: [0, 241]
            },
            pbr: {
                speed: [[110, 0], [120, 0.5], [170, 1.0], [190, 1.2], [220, 0.7]]
            },
            volume: {
                speed: [[110, 0], [120, 0.5], [220, 0.9]],
            },
            loop: true
        },
        {
            link: acc3,
            margins: {
                speed: [0, 241]
            },
            pbr: {
                speed: [[190, 0], [200, 0.5], [210, 1.0], [220, 1.2], [240, 1.5]]
            },
            volume: {
                speed: [[190, 0], [200, 0.4], [240, 0.7]],
            },
            loop: true
        },
        {
            link: recup1,
            margins: {
                speed: [0, 241]
            },
            pbr: {
                speed: [[90, 0], [100, 1.2], [120, 0.7], [140, 1.2], [240, 1]]
            },
            volume: {
                // recuperationPower: [[0, 0], [20000, 1], [70000, 2]]
                speed:[[90, 0], [100, 0.9], [120, 0.7], [140, 0.5], [190, 1.5], [240, 0.2]]
            },
            recuperation: true,
            loop: true
        },
        {
            link: recup2,
            margins: {
                speed: [0, 241]
            },
            pbr: {
                speed: [[50, 0], [60, 1.1], [100, 1.5], [140, 1.3], [180, 0.9], [190, 0.8]]
            },
            volume: {
                // recuperationPower: [[0, 0], [20000, 1], [70000, 2]]
                speed:[[50, 0], [60, 0.9], [100, 0.7], [140, 0.5], [180, 1.5], [190, 0.1]]
            },
            recuperation: true,
            loop: true
        },
        {
            link: recup3,
            margins: {
                speed: [0, 241]
            },
            pbr: {
                speed: [[0, 0], [5, 1], [40, 1.2], [80, 1.6], [100, 1.8], [140, 0.2]]
            },
            volume: {
                // recuperationPower: [[0, 0], [20000, 1], [70000, 2]]
                speed:[[0, 0], [5, 0.1], [40, 0.3], [80, 1.0], [100, 1.2], [140, 0.7], [170, 0.3]]
            },
            recuperation: true,
            loop: true
        },
    ],
    stop: {
        link: engOff
    }
};

module.exports.schemeFuturistic = schemeFuturistic;