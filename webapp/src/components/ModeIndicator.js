/**
 * Created by Max Pavlov on 11/16/16.
 */
import React from 'react';

class ModeIndicator extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <input disabled="true" className="mode-indicator" value={this.props.chargeBattery} type="range" min="-16000" max="35000" step="0.01"/>
        );
    }
}

export default ModeIndicator
