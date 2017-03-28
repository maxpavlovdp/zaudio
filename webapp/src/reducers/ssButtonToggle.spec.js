import ssButtonToggle from '../reducers/ssButtonToggle';

describe('ssButtonToggle reducer tests', () => {

    it('should register start/stop button in store', () => {
        let state;
        let action = {type: 'REGISTER_START_BTN', newBtn: {name: 'V4', isOn: false}};
        let actionResultInStore = [{name: 'V4', isOn: false}];

        state = ssButtonToggle({ssButtonToggle: {}},
            action);
        expect(state).toEqual(actionResultInStore);
    })

    it('should change button isOn state when btn 1 clicked', () => {
        let state = ssButtonToggle([
                {name: 'Btn 1', isOn: false},
                {name: 'Btn 2', isOn: false}
            ]
            ,
            {type: 'ENGINE_ON_OFF', clickedBtn: {name: 'Btn 2', isOn: true}}
        );
        expect(state).toEqual([
                {name: 'Btn 1', isOn: false},
                {name: 'Btn 2', isOn: true}
            ]
        );
    })
});