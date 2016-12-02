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
        return <button className="start-stop-button" onClick={this.handleClick}>{this.state.isOn ? 'Stop' : 'Start'}</button>;
    }
}

export default StartStop