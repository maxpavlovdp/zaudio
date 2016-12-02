import React from 'react';

class Pedal extends React.Component {
    constructor(props) {
        super(props);
        this.handleSpeed = this.handleSpeed.bind(this);
        this.state = {
            gas: 0,
            isEnable: this.props.isEnable
        };
    }

    handleSpeed(e) {
        if ('speedHandler' in this.props && typeof this.props.speedHandler === 'function') {
            this.props.speedHandler(e.target.value);
        }
    }

    componentWillReceiveProps(nextProps) {
        if (this.state.isEnable != nextProps.isEnable) {
            this.setState({
                gas: 0,
                isEnable: nextProps.isEnable
            });
            this.refs.element.value = this.state.gas;
        }
    }

    render() {
        return(
        <div>
            <div className="pedal-control-name">Pedal</div>
            <input ref="element" className="pedal-control" type="range" min="0" max="1" step="0.001"
                   defaultValue={this.state.gas} onInput={this.handleSpeed} disabled={!this.state.isEnable}/>
        </div>
        )}
}

export default Pedal