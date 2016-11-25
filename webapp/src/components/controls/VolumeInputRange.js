import React from 'react';

export const defaultVolume = 0.3

export default class VolumeInputRange extends React.Component {

    constructor(props) {
        super(props)
        this.handleVolumeChange = this.handleVolumeChange.bind(this)
        this.state = {
            volume: defaultVolume
        }
    }


    handleVolumeChange(e) {
        this.props.soundgen.changeVolume(e.target.value)
        this.setState({
            volume: e.target.value
        })
    }

    render() {
        return (
            <input className="volume-input-range" onChange={this.handleVolumeChange} value={this.state.volume}
                   type="range" min="0"
                   max="1.5" step="0.01"/>
        );
    }
}
