export const REGISTER_START_BTN = "REGISTER_START_BTN"
export const BUTTON_CLICKED = "BUTTON_CLICKED"

export const registerBtnInStore = (carName) => ({
    type: REGISTER_START_BTN,
    newBtn: {name: carName, isOn: false}
})

export const buttonStartClicked = (carName) => ({
        type: "BUTTON_CLICKED",
            clickedBtn: {name: carName, isOn: true}
})

export const buttonStopClicked = (carName) => ({
    type: "BUTTON_CLICKED",
    clickedBtn: {name: carName, isOn: false}
})