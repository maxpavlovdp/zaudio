import React from 'react';
import cookie from 'react-cookie';

const defaultVolume = 0.3
export function getVolume() {
    let savedVolume = cookie.load('volume')
    if (savedVolume) {
        return savedVolume
    } else {
        return defaultVolume
    }
}

export default class VolumeInputRange extends React.Component {

    constructor(props) {
        super(props)
        this.handleVolumeChange = this.handleVolumeChange.bind(this)
    }



    componentWillMount() {
        this.setState({
            volume: getVolume()
        })
    }


    handleVolumeChange(e) {
        this.props.soundgen.changeVolume(e.target.value)
        this.setState({
            volume: e.target.value
        })
        cookie.save('volume', e.target.value, {path: '/'})
    }

    render() {
        return (
            <div>
                <input className="volume-input-range" onChange={this.handleVolumeChange} value={this.state.volume}
                       type="range" min="0"
                       max="1" step="0.01"/>
                <div className="volume-input-name">Volume</div>
            </div>
        );
    }
}
