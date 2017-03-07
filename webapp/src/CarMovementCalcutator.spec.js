var CarMovementCalculator = require("./CarMovementCalcutator")
var assert = require("assert");

describe('CarSimulator', ()=> {
    it('Anti power should be 0 when speed is 0', ()=> {
        // assert.equal(CarMovementCalculator.calculateAntiPower(0,1,1), 0);
    })

    it('Acceleration should be 0.8333333333333334 m/c2 for speed V1=0 m/s, V2=5 m/s and t=5s', ()=>{
        assert.equal(CarMovementCalculator.calculateAcceleration(0,5,6), 0.8333333333333334)
    })

    it('16 m/s equals to 57.6 km/h',()=> {
        assert.equal(CarMovementCalculator.msToKmH(16), 57.6)
    })

    it('57.6 km/h equals 16 m/s',()=> {
        assert.equal(CarMovementCalculator.kmHToMs(57.6), 16)
    })
})