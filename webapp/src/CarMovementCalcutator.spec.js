var cCalc = require("./CarMovementCalcutator")
var assert = require("assert");

describe('CarMovementCalcutator.js', () => {
    it('Anti power should be 0 when speed is 0', () => {
        assert.equal(cCalc.calculateAntiPower(0, 1, 1), 0);
    })

    it('Anti power for Model S should be 176 newtons (17 kg) when speed is 58 km/h (16 m/s)', () => {
        assert.equal(cCalc.calculateAntiPower(16, 2200, 0.24, 2.34), 176.7696);
    })

    it('Anti power for Model S should be 2554 newtons (255 kg) when speed is 240 km/h (67 m/s)', () => {
        assert.equal(cCalc.calculateAntiPower(cCalc.kmHToMs(240), 2200, 0.24, 2.34), 2529.0000000000005);
    })

    it('Traction power for Model S on speed 60 km/h is 3465 kg', () => {
        assert.equal(cCalc.motorMaxPowerToTractionPower(581, cCalc.kmHToMs(60)), 34652.0874751491)
    })

    it('Traction power for Model S on speed 240 km/h is 8701 kg', () => {
        assert.equal(cCalc.motorMaxPowerToTractionPower(581, cCalc.kmHToMs(240)), 8701.947079380929)
    })

    it('Acceleration should be 0.83 m/c2 for speed V1=0 m/s, V2=5 m/s and t=5s', () => {
        assert.equal(cCalc.calculateAcceleration(0, 5, 6), 0.8333333333333334)
    })

    it('16 m/s equals to 57.6 km/h', () => {
        assert.equal(cCalc.msToKmH(16), 57.6)
    })

    it('57.6 km/h equals 16 m/s', () => {
        assert.equal(cCalc.kmHToMs(57.6), 16)
    })

    it('240 km/h equals 66.66666666666667 m/s', () => {
        assert.equal(cCalc.kmHToMs(240), 66.66666666666667)
    })

    it('for model S new speed after 2 sec full acceleration from 0 will be 152 km/h', () => {
        let teslaModelS = {
            key: "teslaModelS",
            name: "Tesla Model S",
            weight: 2200, // kg
            maxMotorPower: 581, //kWt
            dragCoef: 0.24, // Cd
            frontArea: 2.34 // m2
        }
        assert.equal(cCalc.updateCarState(teslaModelS, teslaModelS.maxMotorPower, 0, 2).speed, 152.11636363636364)
    })

    it('for model S new speed after 2 sec full acceleration from 200 will be 214 km/h', () => {
        let teslaModelS = {
            key: "teslaModelS",
            name: "Tesla Model S",
            weight: 2200, // kg
            maxMotorPower: 581, //kWt
            dragCoef: 0.24, // Cd
            frontArea: 2.34 // m2
        }
        assert.equal(cCalc.updateCarState(teslaModelS, teslaModelS.maxMotorPower, 200, 2).speed, 214.6141483075918 )
    })
})