/**
 * Created by Max Pavlov on 11/16/16.
 */
import React from 'react';

const regCoef = 1
class ModeIndicator extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    componentDidMount() {
        this.setState({
            maxMotorPower: this.props.store.getState().carSelect.carModel.maxMotorPower,
            maxRegenPower: this.props.store.getState().carSelect.carModel.maxRegenPower
        })
    }

    render() {
        return (
            <div>
                <input disabled="true" className="mode-indicator"
                       value={this.props.chargeBattery < 0 ? this.props.chargeBattery * regCoef : this.props.chargeBattery }
                       type="range"
                       min={-this.state.maxRegenPower * regCoef} max={this.state.maxMotorPower} step="0.01"/>
            </div>
        )
    }
}

export default ModeIndicator