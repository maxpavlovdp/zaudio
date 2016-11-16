import React from 'react';

import BezierEasing from 'bezier-easing';

import Speedometer from './Speedo.jsx'
import Pedal from './Pedal.jsx';
import ModeIndicator from './ModeIndicator';
import StartStop from './StartStop.jsx';

import './CarSimulator.less';

class CarSimulator extends React.Component {
    constructor(props) {
        super(props);
        this.handleSpeed = this.handleSpeed.bind(this);
        this.handleStartStop = this.handleStartStop.bind(this);
        this.state = {
            speed : 0,
            power : 0,
            pedalIsEnable : false,
            timer : null
        };
    }

    componentDidMount () {
        this.s = this.props.soundgen.init()

    }

    handleStartStop (status) {
        if(!status) {
            this.s.then(sg => {
                sg.start().then(() => {
                    var fps = 30;
                    var timer = setInterval(() => {
                        const   Mass = 2590;
                        let speed = this.state.speed * 1000 / 3600,
                            power = this.state.power * 8 / (speed+1),
                            antiPower = 0.24*1.29*2.34*Math.pow(speed, 2) + 0.015*Mass + 0.08*power,
                            recuperationPower = 0,
                            def = (power-antiPower) / Mass;

                        if(def < -0.01501){
                            recuperationPower = -def*50000+3000;
                            def = (power-antiPower-recuperationPower) / Mass;
                        }

                        let newSpeed = (speed + def/fps) * 3600 / 1000;

                        this.setState({
                            speed: newSpeed > 240 ? 240 : newSpeed < 0 ? 0 : newSpeed
                        });

                        this.props.soundgen.setPlaybackRate(newSpeed, def, this.state.power, recuperationPower);
                    }, 1000 / fps);

                    this.setState({
                        pedalIsEnable: true,
                        timer: timer
                    });
                });
            });
        } else{
            this.s.then(sg => {
                sg.stop().then(() => {
                    clearInterval(this.state.timer);
                    this.setState({
                        speed: 0,
                        power: 0,
                        pedalIsEnable: false,
                        timer: null
                    });
                });
            });
        }
    }

    handleSpeed (power) {
        var easing = BezierEasing(0.64, 0.18, 0.89, 0.28);
        this.setState({
            power: easing(power)*35000
        });
    }

    render () {
        return  <div className="car">
                    <Speedometer speed={this.state.speed} />
                    <div className="controls">
                        <StartStop speedChange={this.handleStartStop}/>
                        <Pedal isEnable={this.state.pedalIsEnable} speedHandler={this.handleSpeed} />
                        <ModeIndicator />
                    </div>
                </div>;
    }
}

export default CarSimulator

