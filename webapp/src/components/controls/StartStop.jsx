import React from 'react';

class StartStop extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        if ('pushHandler' in this.props && typeof this.props.pushHandler === 'function') {
            this.props.pushHandler();
        }
    }

    render() {
        return <button className="start-stop-button"
                       onClick={this.handleClick}>{this.props.buttonIsStart ? 'Start' : 'Stop'}</button>
    }
}

export default StartStop