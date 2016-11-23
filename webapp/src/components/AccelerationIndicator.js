import React from 'react';

class AccelerationIndicator extends React.Component {
    constructor(props) {
        super(props)
    }


    componentWillReceiveProps() {
        // console.log(this.props.acceleration)
    }

    render() {
        return (
            <input disabled="true" className="acc-indicator" value={this.props.acceleration} type="range" min="-0.13579986591548"
                   max="0.08666827213334584" step="0.01"/>
        );
    }
}

export default AccelerationIndicator
