/**
 * Created by Max Pavlov on 11/18/16.
 */

var calculateAntiPower = function (currentSpeed, currentPower, mass) {
    if(currentSpeed == 0) return 0
    return 0.24 * 1.29 * 2.34 * Math.pow(currentSpeed, 2) + 0.015 * mass + 0.08 * currentPower
}
module.exports.calculateAntiPower = calculateAntiPower;

var calculateAcceleration = function (V1, V2, t) {
    return (V2 - V1) / t
}
module.exports.calculateAcceleration = calculateAcceleration;

var msToKmH = function (speedInMS) {
    return speedInMS * 3600 / 1000
}
module.exports.msToKmH = msToKmH;

var kmHToMs = function (speedInKmH) {
    return speedInKmH * 1000 / 3600
}
module.exports.kmHToMs = kmHToMs;