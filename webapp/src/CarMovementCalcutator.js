/**
 * Created by Max Pavlov on 11/18/16.
 *
 * All methods operate with system SI
 * https://en.wikipedia.org/wiki/International_System_of_Units
 *
 * video with real dynamyc: https://www.youtube.com/watch?v=6TXAZstjkDg
 */

// Returns antipower in in newtons (kg*m/s^2)
let calculateAntiPower = function (currentSpeed, mass, dragCoef, frontArea, withMagic) {
    if (currentSpeed === 0) return 0
    let result = airResistance(frontArea, currentSpeed, dragCoef)
        + wheelRotationResistance(mass)
    if (withMagic) {
        return result * magicResistanceCoef(currentSpeed)
    } else {
        return result
    }

}
module.exports.calculateAntiPower = calculateAntiPower;

let airResistance = function (frontArea, currentSpeed, dragCoef) {
    return frontArea * Math.pow(currentSpeed, 2) * dragCoef
}
let wheelRotationResistance = function (mass) {
    return 0.015 * mass
}

// Magic coef emulate real dynamic
let magicResistanceCoef = function (speed) {
    let speedInKMh = msToKmH(speed)
    if (speedInKMh > 100) {
        return (speedInKMh + 20) / 100
    } else {
        return 1
    }
}
let magicAccCoef = function (speed) {
    let speedInKMh = msToKmH(speed)
    if (speedInKMh < 100) {
        return ((speedInKMh + 1) / 100) * 0.8
    } else {
        return 0.8
    }
}

let calculateNewSpeed = function (currentSpeedInMS, resPower, weight, dt) {
    return currentSpeedInMS + (resPower / weight) * dt;
};

// power in kWt
// returns newton
let motorPowerToTractionForce = function (power, currentSpeedInMS, withMagic) {
    let result = power * 1000 / (currentSpeedInMS + 0.1)
    if (withMagic) {
        return result * magicAccCoef(currentSpeedInMS)
    } else {
        return result
    }
};
module.exports.motorPowerToTractionForce = motorPowerToTractionForce


// force in newtons
// returns power in kWt
let forceToPower = function (force, speedInMS) {
    return force * speedInMS / 1000
}

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

// This method operates not only with system SI units
let addRegenToDecc = function (speedKmh, resultPower, carSpecs, currentSpeedInMS) {
    if (speedKmh < carSpecs.regenDecrSpeed) {
        resultPower = resultPower - (speedKmh / carSpecs.regenDecrSpeed) * motorPowerToTractionForce(carSpecs.maxRegenPower, currentSpeedInMS, false)
    } else {
        resultPower = resultPower - motorPowerToTractionForce(carSpecs.maxRegenPower, currentSpeedInMS, false)
    }
    return resultPower;
};
let updateCarState = function (carSpecs, powerKwt, speedKmh, updateIntervalInSec) {
    let currentSpeedInMS = kmHToMs(speedKmh),
        batteryCharge = -powerKwt

    let antiPower = calculateAntiPower(currentSpeedInMS, carSpecs.weight, carSpecs.dragCoef, carSpecs.frontArea, true)
    let resultPower = motorPowerToTractionForce(powerKwt, currentSpeedInMS, true) - antiPower

    if (resultPower < 0) {
        resultPower = addRegenToDecc(speedKmh, resultPower, carSpecs, currentSpeedInMS);

        batteryCharge = -forceToPower(resultPower, currentSpeedInMS)
        batteryCharge = batteryCharge < carSpecs.maxRegenPower ? batteryCharge : carSpecs.maxRegenPower
        // console.log(batteryCharge < carSpecs.maxRegenPower)
        // console.log(batteryCharge)
    }

    let newSpeed = msToKmH(calculateNewSpeed(currentSpeedInMS, resultPower, carSpecs.weight, updateIntervalInSec))


    return {
        speed: newSpeed,
        def: resultPower / carSpecs.weight,
        recuperationPower: batteryCharge,
        power: powerKwt
    }
}
module.exports.updateCarState = updateCarState