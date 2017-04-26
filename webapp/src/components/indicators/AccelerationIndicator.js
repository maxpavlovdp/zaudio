import React from 'react';

const regCoef = 2
class AccelerationIndicator extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        return (
            <div>
                <input disabled="true" className="acc-indicator"
                       value={this.props.acceleration >= 0 ? this.props.acceleration : this.props.acceleration * regCoef}
                       type="range"
                       min={-10 * regCoef}
                       max="40" step="0.01"/>
            </div>

        );
    }
}

export default AccelerationIndicator
