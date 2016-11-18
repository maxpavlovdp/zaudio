import React from 'react';

import BezierEasing from 'bezier-easing';

import Speedometer from './Speedo.jsx'
import Pedal from './Pedal.jsx';
import ModeIndicator from './ModeIndicator';
import AccelerationIndicator from './AccelerationIndicator';
import StartStop from './StartStop.jsx';

import CarMathUtil from '../CarMovementCalcutator'

import './CarSimulator.less';

class CarSimulator extends React.Component {
    constructor(props) {
        super(props);
        this.handleSpeed = this.handleSpeed.bind(this);
        this.handleStartStop = this.handleStartStop.bind(this);
        this.state = {
            speed: 0,
            power: 0,
            chargeBattery: 0,
            acceleration: 0,
            pedalIsEnable: false,
            timer: null
        };
    }

    componentDidMount() {
        this.s = this.props.soundgen.init()

    }

    handleStartStop(status) {
        if (!status) {
            this.s.then(sg => {
                sg.start().then(() => {
                    var fps = 30;
                    var timer = setInterval(() => {
                        const   Mass = 2590;
                        let speed = CarMathUtil.kmHToMs(this.state.speed),
                            power = this.state.power * 8 / (speed + 1),
                            antiPower = CarMathUtil.calculateAntiPower(speed, power, Mass),
                            recuperationPower = 0,
                            def = (power - antiPower) / Mass;

                        if (def < -0.01501) {
                            recuperationPower = -def * 50000 + 3000;
                            def = (power - antiPower - recuperationPower) / Mass;
                            this.state.chargeBattery = -recuperationPower
                        } else {
                            this.state.chargeBattery = this.state.power
                        }

                        let newSpeed = CarMathUtil.msToKmH(speed + def/fps);
                        this.state.acceleration = -CarMathUtil.calculateAcceleration(this.state.speed, newSpeed, 1000/fps)

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
        } else {
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

    handleSpeed(power) {
        var easing = BezierEasing(0.64, 0.18, 0.89, 0.28);
        this.setState({
            power: easing(power) * 35000
        });
    }

    render() {
        return <div className="car">
            <Speedometer speed={this.state.speed}/>
            <div className="controls">
                <StartStop speedChange={this.handleStartStop}/>
                <Pedal isEnable={this.state.pedalIsEnable} speedHandler={this.handleSpeed}/>
                <ModeIndicator chargeBattery={this.state.chargeBattery}/>
                <AccelerationIndicator acceleration={this.state.acceleration}/>
            </div>
        </div>;
    }
}

export default CarSimulator