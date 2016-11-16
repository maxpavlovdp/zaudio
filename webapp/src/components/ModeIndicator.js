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
            <input ref="modeIndicator" disabled="true" className="mode-indicator" type="range" min="-3" max="5" step="0.01"
                   defaultValue={0}/>
        );
    }
}

export default ModeIndicator
