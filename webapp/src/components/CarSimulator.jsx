import React from 'react';

import BezierEasing from 'bezier-easing';

import Speedometer from './indicators/Speedo.jsx';
import ModeIndicator from './indicators/ModeIndicator';
import AccelerationIndicator from './indicators/AccelerationIndicator';

import SoundBar from './indicators/SoundBar.jsx';

import Pedal from './controls/Pedal.jsx';
import VolumeInputRange from './controls/VolumeControl';
import StartStop from './controls/StartStop.jsx';

import CarMathUtil from '../CarMovementCalcutator';

import './CarSimulator.less';

class CarSimulator extends React.Component {
    constructor(props) {
        super(props);
        this.handleSpeed = this.handleSpeed.bind(this);
        this.handlePush = this.handlePush.bind(this)

        this.handleMouseEnter = this.handleMouseEnter.bind(this)
        this.handleMouseLeave = this.handleMouseLeave.bind(this)

        this.handleWheel = this.handleWheel.bind(this)
    }

    componentDidMount() {
        this.soundGenerator = this.props.soundGenerator.init()
    }

    componentWillMount() {
        this.resetIndicatorsAndControls()
    }

    resetIndicatorsAndControls() {
        this.setState({
            speed: 0,
            power: 0,
            chargeBattery: 0,
            acceleration: 0,
            pedalIsEnable: false,
            buttonIsStart: true,
            timer: null,
            carStyle: displayNone,
            pedalPos: 0
        })
    }

    handleWheel(e) {
        e.preventDefault()

        const WHEEL_COEF = 800

        var newPedalPos = this.state.pedalPos += -e.deltaY / WHEEL_COEF

        if (newPedalPos > 1) newPedalPos = 1
        if (newPedalPos < 0) newPedalPos = 0

        this.setState({
            pedalPos: newPedalPos
        })

        if (this.state.pedalIsEnable) {
            this.handleSpeed(newPedalPos)
            this._pedal.updatePedalPos(newPedalPos)
        }
    }

    handleMouseEnter(e) {
        this.setState({
            carStyle: displayBlock
        })
        this.handleStartStop(false)
    }

    handleMouseLeave(e) {
        this.soundGenerator.then(sg => {
            clearInterval(this.state.timer);
            sg.stopAllSounds()
            this.resetIndicatorsAndControls()
        });
        this._pedal.updatePedalPos(0)
    }

    handlePush() {
        this.handleStartStop(this.state.buttonIsStart)
        this.setState({
            buttonIsStart: !this.state.buttonIsStart
        })
    }

    handleStartStop(status) {
        if (!status) {
            this.soundGenerator.then(sg => {
                sg.start().then(() => {
                    var fps = 30;
                    var timer = setInterval(() => {
                        const Mass = 2590;
                        let speed = CarMathUtil.kmHToMs(this.state.speed),
                            power = this.state.power * 8 / (speed + 1),
                            antiPower = CarMathUtil.calculateAntiPower(speed, power, Mass),
                            recuperationPower = 0,
                            def = (power - antiPower) / Mass;

                        if (def < -0.01501) {
                            recuperationPower = -def * 50000 + 3000;
                            def = (power - antiPower - recuperationPower) / Mass;

                            this.setState({
                                chargeBattery: -recuperationPower
                            })
                        } else {
                            this.setState({
                                chargeBattery: this.state.power
                            })
                        }

                        let newSpeed = CarMathUtil.msToKmH(speed + def / fps);
                        this.state.acceleration = -CarMathUtil.calculateAcceleration(this.state.speed, newSpeed, 1000 / fps)

                        this.setState({
                            speed: newSpeed > 240 ? 240 : newSpeed < 0 ? 0 : newSpeed
                        });

                        this.props.soundGenerator.setPlaybackRate(newSpeed, def, this.state.power, recuperationPower);
                    }, 1000 / fps);

                    this.setState({
                        pedalIsEnable: true,
                        timer: timer
                    });
                });
            });
        } else {
            this.soundGenerator.then(sg => {
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

    handleSpeed(pedalPosition) {
        var easing = BezierEasing(0.64, 0.18, 0.89, 0.28);
        this.setState({
            power: easing(pedalPosition) * 35000,
        });
    }

    render() {
        return (
            <div className="car-container" onWheel={this.handleWheel} onMouseEnter={this.handleMouseEnter}
                 onMouseLeave={this.handleMouseLeave}>
                <div className="car" style={this.state.carStyle}>
                    <Speedometer speed={this.state.speed}/>
                    <div className="controls">
                        <StartStop buttonIsStart={!this.state.buttonIsStart} pushHandler={this.handlePush}/>
                        <Pedal ref={(pedal) => {
                            this._pedal = pedal;
                        }} isEnable={this.state.pedalIsEnable}
                               speedHandler={this.handleSpeed}/>
                        <ModeIndicator chargeBattery={this.state.chargeBattery}/>
                        <AccelerationIndicator acceleration={this.state.acceleration}/>
                        <VolumeInputRange soundGenerator={this.props.soundGenerator}/>
                    </div>
                    {__ZEBCONFIG__.env == 'DEV' ?
                        <SoundBar soundgen={this.props.soundGenerator} speed={this.state.speed}/> : ''
                    }
                </div>
            </div>
        );
    }
}

const displayNone = {
    display: 'none'
}
const displayBlock = {
    display: 'block'
}

export default CarSimulator
