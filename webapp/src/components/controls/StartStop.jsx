import React from 'react';

class StartStop extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.state = {
            isOn: false,
            otherPlayed: false
        };
        this.props.store.dispatch({type: "REGISTER_START_BTN", newBtn: {name: this.props.carName, isOn: false}})
        this.props.store.subscribe(()=> {
            this.props.store.getState().forEach((element) => {
                if(element.name != this.props.carName) {
                    console.log("store changed. Do something!")
                }
            })
        })
    }

    handleClick() {
        this.setState({
            isOn: this.state.isOn ? false : true
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
                       disabled={this.props.carStatus == 'starting' || this.props.carStatus == 'stopping' || this.state.otherPlayed ? true : false}
                       onClick={this.handleClick}>{this.state.isOn ? 'Stop' : 'Start'}</button>
    }
}

export default StartStop