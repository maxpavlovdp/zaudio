import React from 'react';

class Pedal extends React.Component {
    constructor(props) {
        super(props);
        this.handleSpeed = this.handleSpeed.bind(this);
        this.state = {
            isEnable: this.props.isEnable
        };
    }

    handleSpeed(e) {
        console.log("old: " + e.target.value)
        if ('speedHandler' in this.props && typeof this.props.speedHandler === 'function') {
            this.props.speedHandler(e.target.value);
        }
    }

    componentWillReceiveProps(nextProps) {
        console.log(nextProps)
        if (this.state.isEnable != nextProps.isEnable) {
            this.setState({
                isEnable: nextProps.isEnable
            });
        }
    }

    render() {
        return (
            <div>
                <div className="pedal-control-name">Pedal</div>
                <input ref="element" className="pedal-control" type="range" min="0" max="1" step="0.001"
                       value={this.props.pedalPosition} onInput={this.handleSpeed} disabled={!this.state.isEnable}/>
            </div>
        )
    }
}

export default Pedal