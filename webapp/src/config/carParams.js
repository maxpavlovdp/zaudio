/**
 * Created by Max Pavlov on 3/22/17.
 */

//https://en.wikipedia.org/wiki/Tesla_Model_S#Specifications
let carModels = {
    teslaModelS: {
        key: "teslaModelS",
        name: "Tesla Model S",
        weight: 2200, // kg
        // maxMotorPower: 581, //kWt
        maxMotorPower: 35000, //kWt
        dragCoef: 0.24, // Cd
        frontArea: 2.34 // m2
    },
    teslaModel3: {
        key: "teslaModel3",
        name: "Tesla Model 3",
        weight: 1800, // kg
        // maxMotorPower: 300, //kWt
        maxMotorPower: 11000, //kWt
        dragCoef: 0.21, // Cd
        frontArea: 2.00 // m2
    }
}

module.exports.carModels = carModels

