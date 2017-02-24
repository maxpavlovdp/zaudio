import React from 'react';

class StartStop extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.state = {
            isOn : false
        };
    }

    handleClick () {
        this.setState({
            isOn: this.state.isOn ? false : true
        });

        if('speedChange' in this.props && typeof this.props.speedChange === 'function'){
            this.props.speedChange(this.state.isOn);
        }
    }

    render (){
        console.log(this.props.store)
        return <button className="start-stop-button" disabled={this.props.carStatus == 'starting' || this.props.carStatus == 'stopping' ? true : false} onClick={this.handleClick}>{this.state.isOn ? 'Stop' : 'Start'}</button>
    }
}

export default StartStop