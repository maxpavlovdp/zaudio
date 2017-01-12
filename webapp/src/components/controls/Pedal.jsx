import React from 'react';

class Pedal extends React.Component {
    constructor(props) {
        super(props);
        this.handleSpeed = this.handleSpeed.bind(this);
        this.state = {
            isEnable: this.props.isEnable,
            pedalPos: this.props.pedalPos

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

    componentWillReceiveProps(nextProps) {
        if (this.state.isEnable != nextProps.isEnable) {
            this.setState({
                isEnable: nextProps.isEnable,
            });
        }

        if (this.state.isEnable) {
            this.setState({
                //TODO: implement flux to handle pedal position from input slider and from wheel
                // pedalPos: nextProps.pedalPos
            })
        }

    }

    render() {
        return (
            <div>
                <div className="pedal-control-name">Pedal</div>
                <input ref="element" className="pedal-control" type="range" min="0" max="1" step="0.001"
                       value={this.state.pedalPos} onInput={this.handleSpeed} disabled={!this.state.isEnable}/>
            </div>
        )
    }
}

export default Pedal