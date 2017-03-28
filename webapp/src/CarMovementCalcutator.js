/**
 * Created by Max Pavlov on 11/18/16.
 */

// F=Sv2k+Gf
// http://www.carshistory.ru/avtomobil/hodovaya_chast/sily_deystvuuschie_na_dvizhuschiysya_avtomob/1074.html

let calculateAntiPower = function (currentSpeed, mass, dragCoef, frontArea) {
    return (frontArea*Math.pow(currentSpeed,2)) + (0.015 * mass)
}
module.exports.calculateAntiPower = calculateAntiPower;

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