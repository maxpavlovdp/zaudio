var CarMovementCalculator = require("../src/CarMovementCalcutator")
var assert = require("assert");

describe('CarSimulator', ()=> {
    it('Anti power should be 0 when speed is 0', ()=> {
        assert.equal(CarMovementCalculator.calculateAntiPower(0,1,1), 0);
    })
})