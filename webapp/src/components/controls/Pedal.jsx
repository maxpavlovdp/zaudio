import React from 'react';

class Pedal extends React.Component {
    constructor(props) {
        super(props);
        this.handleSpeed = this.handleSpeed.bind(this);
        this.state = {
            isEnable: this.props.isEnable,
            pedalPos: 0
        };
    }

    handleSpeed(e) {
        let pedalPosition = e.target.value;
        if ('speedHandler' in this.props && typeof this.props.speedHandler === 'function') {
            this.props.speedHandler(pedalPosition);
        }

        this.setState({
            pedalPos: pedalPosition
        })
    }

    updatePedalPos(pedalPos) {
        this.setState({
            pedalPos: pedalPos
        })
    }

    componentWillReceiveProps(nextProps) {
        if (this.state.isEnable != nextProps.isEnable) {
            this.setState({
                isEnable: nextProps.isEnable,
            });
        }
    }

    render() {
        return(
        <div>
            <input ref="element" className="pedal-control" type="range" min="0" max="1" step="0.001"
                   value={this.state.pedalPos} onInput={this.handleSpeed} disabled={!this.state.isEnable}/>
        </div>
        )}
}

export default Pedal