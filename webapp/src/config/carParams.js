/**
 * Created by Max Pavlov on 3/22/17.
 */

let carModels = {
//https://en.wikipedia.org/wiki/Tesla_Model_S#Specifications
    teslaModelS: {
        key: "teslaModelS",
        name: "Tesla Model S",
        weight: 2200, // kg
        maxMotorPower: 581, //kWt
        dragCoef: 0.24, // Cd
        frontArea: 2.34, // m2
        // real speed is 50, but to show regen indicator longer time we set 100
        regenDecrSpeed: 100, // km/h
        // to have more fun in UX experience regen is 7 times more then real
        maxRegenPower: 70 * 7 // Kwt
    },
    teslaModel3: {
        key: "teslaModel3",
        name: "Tesla Model 3",
        weight: 1800, // kg
        maxMotorPower: 300, //kWt
        dragCoef: 0.21, // Cd
        frontArea: 2.00, // m2
        // real speed is 50, but to show regen indicator longer time we set 100
        regenDecrSpeed: 100, // km/h
        // to have more fun in UX experience regen is 7 times more then real
        maxRegenPower: 70 * 7 // Kwt
    },
    teslaModelX: {
        key: "teslaModelX",
        name: "Tesla Model X",
        weight: 2500, // kg
        maxMotorPower: 568, //kWt
        dragCoef: 0.23, // Cd
        frontArea: 2.00, // m2
        // real speed is 50, but to show regen indicator longer time we set 100
        regenDecrSpeed: 100, // km/h
        // to have more fun in UX experience regen is 7 times more then real
        maxRegenPower: 70 * 7 // Kwt
    },
    // https://en.wikipedia.org/wiki/Nissan_Leaf
    leaf: {
        key: "leaf",
        name: "Nissan Leaf",
        weight: 1521, // kg
        maxMotorPower: 120, //kWt real is 80
        dragCoef: 0.29, // Cd
        frontArea: 2.38, // m2
        // real speed is 50, but to show regen indicator longer time we set 100
        regenDecrSpeed: 100, // km/h
        // to have more fun in UX experience regen is 7 times more then real
        maxRegenPower: 70 * 7 // Kwt
    }
}

module.exports.carModels = carModels

