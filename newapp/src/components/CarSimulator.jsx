import React from 'react';

import Speedometer from './Speedo.jsx'
import Pedal from './Pedal.jsx';
import StartStop from './StartStop.jsx';

import './CarSimulator.less';

class CarSimulator extends React.Component {
    constructor(props) {
        super(props);
        this.handleSpeed = this.handleSpeed.bind(this);
        this.handleStartStop = this.handleStartStop.bind(this);
        this.state = {
            speed : 0,
            pedalIsEnable : false
        };
    }

    componentDidMount () {
        this.s = this.props.soundgen.init()
    }

    handleStartStop (status) {
        if(!status) {
            this.s.then(sg => {
                sg.start().then(() => {
                    this.setState({
                        pedalIsEnable: true
                    });
                });
            });
        } else{
            this.s.then(sg => {
                sg.stop().then(() => {
                    this.setState({
                        speed: 0,
                        pedalIsEnable: false
                    });
                });
            });
        }
    }

    handleSpeed (speed) {
        var rate = 1 + speed/150;
        this.props.soundgen.setPlaybackRate(rate);
        this.setState({
            speed: speed
        });
    }

    render () {
        return  <div className="car">
                    <Speedometer speed={this.state.speed} />
                    <div className="controls">
                        <StartStop speedChange={this.handleStartStop}/>
                        <Pedal isEnable={this.state.pedalIsEnable} speedHandler={this.handleSpeed} />
                    </div>
                </div>;
    }
}

export default CarSimulator

