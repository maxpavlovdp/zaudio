import {REGISTER_CAR_MODEL} from '../actions'

const carSelect = (state = {}, action) => {
    switch (action.type) {
        case REGISTER_CAR_MODEL:
            return action.carModel
        default:
            return state
    }
}

export default carSelect