export const REGISTER_START_BTN = "REGISTER_START_BTN"
export const ENGINE_ON_OFF = "ENGINE_ON_OFF"

export const REGISTER_CAR_MODEL = "REGISTER_CAR_MODEL"

export const registerBtnInStore = (carName) => ({
    type: REGISTER_START_BTN,
    newBtn: {name: carName, isOn: false}
})

export const buttonStartClicked = (carName) => ({
    type: ENGINE_ON_OFF,
    clickedBtn: {name: carName, isOn: true}
})

export const buttonStopClicked = (carName) => ({
    type: ENGINE_ON_OFF,
    clickedBtn: {name: carName, isOn: false}
})

export const registerCarModelInStore = (carModel) =>({
    type: REGISTER_CAR_MODEL,
    carModel: {carModel: carModel}
})