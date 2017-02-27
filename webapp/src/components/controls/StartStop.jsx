import React from 'react';

class StartStop extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.state = {
            isOn: false,
            otherPlayed: false
        };
    }

    componentDidMount() {
        let toggleOtherSSBtns = (store = this.props.store)=> {
            let otherPlayed = store.getState().find(e => (e.isOn && e.name != this.props.carName))

            this.setState({
                otherPlayed: otherPlayed ? true : false
            })
        };

        this.props.store.dispatch({type: "REGISTER_START_BTN", newBtn: {name: this.props.carName, isOn: false}})
        this.props.store.subscribe(toggleOtherSSBtns)
    }

    handleClick() {
        this.setState({
            isOn: !this.state.isOn
        });

        if ('speedChange' in this.props && typeof this.props.speedChange === 'function') {
            this.props.speedChange(this.state.isOn);
        }

        this.props.store.dispatch({
            type: "BUTTON_CLICKED",
            clickedBtn: {name: this.props.carName, isOn: !this.state.isOn}
        })
    }

    render() {
        return <button className="start-stop-button"
                       disabled={this.props.carStatus == 'starting' || this.props.carStatus == 'stopping' || this.state.otherPlayed}
                       onClick={this.handleClick}>{this.state.isOn ? 'Stop' : 'Start'}</button>
    }
}

export default StartStop