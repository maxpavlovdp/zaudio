var CarMovementCalculator = require("./CarMovementCalcutator")
var assert = require("assert");

describe('CarMovementCalcutator.js', () => {
    it('Anti power should be 0 when speed is 0', () => {
        assert.equal(CarMovementCalculator.calculateAntiPower(0, 1, 1), 0);
    })

    it('Anti power for Model S should be 176 newtons (17 kg) when speed is 58 km/h (16 m/s)', () => {
        assert.equal(CarMovementCalculator.calculateAntiPower(16, 2200, 0.24, 2.34), 176.7696);
    })

    it('Anti power for Model S should be 2554 newtons (255 kg) when speed is 240 km/h (67 m/s)', () => {
        assert.equal(CarMovementCalculator.calculateAntiPower(67, 2200, 0.24, 2.34), 2554.0224);
    })

    it('Acceleration should be 0.83 m/c2 for speed V1=0 m/s, V2=5 m/s and t=5s', () => {
        assert.equal(CarMovementCalculator.calculateAcceleration(0, 5, 6), 0.8333333333333334)
    })

    it('16 m/s equals to 57.6 km/h', () => {
        assert.equal(CarMovementCalculator.msToKmH(16), 57.6)
    })

    it('57.6 km/h equals 16 m/s', () => {
        assert.equal(CarMovementCalculator.kmHToMs(57.6), 16)
    })

    it('240 km/h equals 66.66666666666667 m/s', () => {
        assert.equal(CarMovementCalculator.kmHToMs(240), 66.66666666666667)
    })
})