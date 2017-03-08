import * as actions from './index'
import {REGISTER_START_BTN, ENGINE_ON_OFF} from './index'

describe('Start/Stop button actions', () => {
    it('addTodo should create REGISTER_START_BTN action', () => {
        expect(actions.registerBtnInStore("someCarName")).toEqual({
            type: REGISTER_START_BTN,
            newBtn: {name: "someCarName", isOn: false}
        })
    })

    it('buttonStartClicked should create ENGINE_ON_OFF start action', () => {
        expect(actions.buttonStartClicked("someCarName")).toEqual({
            type: ENGINE_ON_OFF,
            clickedBtn: {name: "someCarName", isOn: true}
        })
    })

    it('buttonStartClicked should create ENGINE_ON_OFF stop action', () => {
        expect(actions.buttonStopClicked("someCarName")).toEqual({
            type: ENGINE_ON_OFF,
            clickedBtn: {name: "someCarName", isOn: false}
        })
    })
})
