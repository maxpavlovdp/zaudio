/**
 * Created by Max Pavlov on 11/16/16.
 */
import React from 'react';

class ModeIndicator extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    componentDidMount() {
        this.props.store.subscribe(() => {
            this.setState({
                maxMotorPower: this.props.store.getState().carSelect.carModel.maxMotorPower,
                maxRegenPower: this.props.store.getState().carSelect.carModel.maxRegenPower
            })
        })
    }

    render() {
        return (
            <div>
                <input disabled="true" className="mode-indicator"
                       value={this.props.chargeBattery < 0 ? this.props.chargeBattery : this.props.chargeBattery }
                       type="range"
                       min={-this.state.maxRegenPower} max={this.state.maxMotorPower} step="0.01"/>
            </div>
        )
    }
}

export default ModeIndicator