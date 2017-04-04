import {combineReducers} from 'redux'
import ssButtonToggle from './ssButtonToggle'
import carSelect from './carSelect'

const zebAppReducers = combineReducers({
    ssButtonToggle,
    carSelect
})

export default zebAppReducers