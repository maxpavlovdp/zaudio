/**
 * Created by Max Pavlov on 3/22/17.
 */

//https://en.wikipedia.org/wiki/Tesla_Model_S#Specifications
const teslaModelS = {
    id: "teslaModelS",
    weight: 2200, // kg
    // maxMotorPower: 581, //kWt
    maxMotorPower: 35000, //fake to use old logic
    dragCoef: 0.24, // Cd
    frontArea: 2.34 // m2
}
module.exports.teslaModelS = teslaModelS

const teslaModel3 = {
    id: "teslaModel3",
    weight: 1800, // kg
    maxMotorPower: 300, //kWt
    dragCoef: 0.21, // Cd
    frontArea: 2.00 // m2
}
module.exports.teslaModel3 = teslaModel3

