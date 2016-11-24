import React from 'react';

class VolumeInputRange extends React.Component {
    constructor(props) {
        super(props)
        this.handleVolumeChange = this.handleVolumeChange.bind(this)
        this.state = {
            defaultVolume: 0.3
        }
    }

    getVolume() {
        return this.state.defaultVolume
    }

    componentDidMount() {
        // this.props.soundgen.changeVolume(this.state.defaultVolume)
    }

    handleVolumeChange(e) {
        this.props.soundgen.changeVolume(e.target.value)
        console.log(e.target.value)
    }

    render() {
        return (
            <input className="volume-input-range" onChange={this.handleVolumeChange} defaultValue={this.state.defaultVolume} type="range" min="0"
                   max="1.5" step="0.01"/>
        );
    }
}

export default VolumeInputRange
