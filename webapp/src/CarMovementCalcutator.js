/**
 * Created by Max Pavlov on 11/18/16.
 */

var calculateAntiPower = function calculateAntiPower(currentSpeed, currentPower, mass) {
    return 0.24 * 1.29 * 2.34 * Math.pow(currentSpeed, 2) + 0.015 * mass + 0.08 * currentPower
}
module.exports.calculateAntiPower = calculateAntiPower;