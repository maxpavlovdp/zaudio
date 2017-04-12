/**
 * Created by Max Pavlov on 11/18/16.
 *
 * All methods operate with system SI
 * https://en.wikipedia.org/wiki/International_System_of_Units
 */

// Returns antipower in in newtons (kg*m/s^2)
let calculateAntiPower = function (currentSpeed, mass, dragCoef, frontArea) {
    if (currentSpeed == 0) return 0
    return airResistance(frontArea, currentSpeed, dragCoef)
        + wheelRotationResistance(mass)
}
module.exports.calculateAntiPower = calculateAntiPower;

let airResistance = function (frontArea, currentSpeed, dragCoef) {
    return frontArea * Math.pow(currentSpeed, 2) * dragCoef
}
let wheelRotationResistance = function (mass) {
    return 0.015 * mass
}

let calculateNewSpeed = function (currentSpeedInMS, resPower, weight, dt) {
    return currentSpeedInMS + (resPower / weight) * dt;
};
module.exports.calculateNewSpeed = calculateNewSpeed

let kWtToNewton = function (power, currentSpeedInMS) {
    return power * 1000 / (currentSpeedInMS + 0.1);
};
module.exports.kWtToNewton = kWtToNewton

let calculateAcceleration = function (V1, V2, t) {
    return (V2 - V1) / t
}
module.exports.calculateAcceleration = calculateAcceleration;

let msToKmH = function (speedInMS) {
    return speedInMS * 3600 / 1000
}
module.exports.msToKmH = msToKmH;

let kmHToMs = function (speedInKmH) {
    return speedInKmH * 1000 / 3600
}
module.exports.kmHToMs = kmHToMs;