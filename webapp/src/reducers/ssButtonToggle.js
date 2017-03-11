import {REGISTER_START_BTN, ENGINE_ON_OFF} from '../actions'

const ssButtonToggle = (state = {}, action) => {
    switch (action.type) {
        case REGISTER_START_BTN:
            return [...state, action.newBtn]
        case ENGINE_ON_OFF:
            var newState = []
            state.forEach((element, index) => {
                if (element.name === action.clickedBtn.name) {
                    newState.push(action.clickedBtn)
                } else {
                    newState.push(element)
                }
            })
            return newState
        default:
            return state
    }
}

export default ssButtonToggle