import reducers from '../reducers';

describe('ssButtonToggle reducer tests', () => {

    it('should register start/stop button in store', () => {
        let state;
        let action = {type: 'REGISTER_START_BTN', newBtn: {name: 'V4', isOn: false}};
        let actionResultInStore = {ssButtonToggle: [{name: 'V4', isOn: false}]};

        state = reducers({ssButtonToggle: {}},
            action);
        expect(state).toEqual(actionResultInStore);
    })

    it('should change button isOn state when btn 1 clicked', () => {
        let state;
        state = reducers({
                ssButtonToggle: [
                    {name: 'Btn 1', isOn: false},
                    {name: 'Btn 2', isOn: false}
                ]
            },
            {type: 'ENGINE_ON_OFF', clickedBtn: {name: 'Btn 2', isOn: true}}
        );
        expect(state).toEqual({
            ssButtonToggle: [
                {name: 'Btn 1', isOn: false},
                {name: 'Btn 2', isOn: true}
            ]
        });
    })
});