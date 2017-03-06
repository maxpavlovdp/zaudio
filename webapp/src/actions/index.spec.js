import * as actions from './index'
import {REGISTER_START_BTN, BUTTON_CLICKED} from './index'

describe('Start/Stop button actions', () => {
    it('addTodo should create REGISTER_START_BTN action', () => {
        expect(actions.registerBtnInStore("someCarName")).toEqual({
            type: REGISTER_START_BTN,
            newBtn: {name: "someCarName", isOn: false}
        })
    })

    it('buttonStartClicked should create BUTTON_CLICKED start action', () => {
        expect(actions.buttonStartClicked("someCarName")).toEqual({
            type: BUTTON_CLICKED,
            clickedBtn: {name: "someCarName", isOn: true}
        })
    })

    it('buttonStartClicked should create BUTTON_CLICKED stop action', () => {
        expect(actions.buttonStopClicked("someCarName")).toEqual({
            type: BUTTON_CLICKED,
            clickedBtn: {name: "someCarName", isOn: false}
        })
    })
})
