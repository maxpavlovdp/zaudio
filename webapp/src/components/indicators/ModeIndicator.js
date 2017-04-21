/**
 * Created by Max Pavlov on 11/16/16.
 */
import React from 'react';

class ModeIndicator extends React.Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        console.log(this.props.store.getState().carSelect.carModel.maxRegPower)
    }



    render() {
        return (
            <input disabled="true" className="mode-indicator" value={this.props.chargeBattery * 4} type="range" min="-280" max="500" step="0.01"/>
        )
    }
}

export default ModeIndicator