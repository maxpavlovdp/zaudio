import React from 'react';

import BezierEasing from 'bezier-easing';

import Speedometer from './indicators/Speedo.jsx';
import ModeIndicator from './indicators/ModeIndicator';
import AccelerationIndicator from './indicators/AccelerationIndicator';

import SoundBar from './indicators/SoundBar.jsx';

import Pedal from './controls/Pedal.jsx';
import VolumeInputRange from './controls/VolumeControl';
import StartStop from './controls/StartStop.jsx';

import {buttonStartClicked, buttonStopClicked} from '../actions'

import CarMathUtil from '../CarMovementCalcutator';

import './CarSimulator.less';

const FPS = 30
const UPDATE_INTERVAL = 1000 / FPS;

class CarSimulator extends React.Component {
    constructor(props) {
        super(props);
        this.handleSpeed = this.handleSpeed.bind(this);
        this.handleStartStop = this.handleStartStop.bind(this);
        this.state = {
            speed: 0,
            power: 0,
            carState: {},
            chargeBattery: 0,
            acceleration: 0,
            pedalIsEnable: false,
            timer: null,
            carStatus: 'stopped'
        };
    }

    componentDidMount() {
        this.s = this.props.soundgen.init()
    }

    handleStartStop(status) {
        if (!status) {
            this.setState({
                carStatus: 'starting'
            });
            this.props.store.dispatch(buttonStartClicked(this.props.name))
            this.s.then(sg => {
                sg.start().then(() => {
                    this.setState({
                        carStatus: 'started'
                    });
                    var timer = setInterval(() => {
                        this.updateCarState(this.props.store.getState().carSelect.carModel);

                        //this.props.soundgen.setPlaybackRate(newSpeed, def, this.state.power, recuperationPower);
                        this.props.soundgen.handleSound(this.state.carState);
                    }, UPDATE_INTERVAL);

                    this.setState({
                        pedalIsEnable: true,
                        timer: timer
                    });
                });
            });
        } else {
            this.setState({
                carStatus: 'stopping',
                pedalIsEnable: false,
                power: 0
            });
            this._pedal.updatePedalPos(0)
            this.updateSpeedAfterStop()

            this.s.then(sg => {
                sg.stop().then(() => {
                    clearInterval(this.state.timer);
                    this.setState({
                        carState: {},
                        timer: null,
                        carStatus: 'stopped'
                    });

                    this.props.store.dispatch(buttonStopClicked(this.props.name))
                });
            });
        }
    }

    updateCarState(carSpecs) {
        let speed = CarMathUtil.kmHToMs(this.state.speed),
            power = this.state.power * 8 / (speed + 1),
            antiPower = CarMathUtil.calculateAntiPower(speed, power, carSpecs.weight, carSpecs.dragCoef, carSpecs.frontArea),
            recuperationPower = 0,
            def = (power - antiPower) / carSpecs.weight;

        if (def < -0.01501) {
            recuperationPower = -def * 50000 + 3000;
            def = (power - antiPower - recuperationPower) / carSpecs.weight;

            this.setState({
                chargeBattery: -recuperationPower
            })
        } else {
            this.setState({
                chargeBattery: this.state.power
            })
        }

        let newSpeed = CarMathUtil.msToKmH(speed + def / FPS);

        let carState = {
            speed: newSpeed,
            def: def,
            power: this.state.power,
            recuperationPower: recuperationPower
        }

        this.setState({
            speed: newSpeed > 240 ? 240 : newSpeed < 0 ? 0 : newSpeed,
            acceleration: -CarMathUtil.calculateAcceleration(this.state.speed, newSpeed, UPDATE_INTERVAL),
            carState: carState
        });
    }

    updateSpeedAfterStop() {
        // Better to set to real "engineOff" sound length. Can be implemented if will be needed.
        var stopSoundLength = 4000
        var speedChangeStep = this.state.speed / (stopSoundLength / UPDATE_INTERVAL)
        var timer = setInterval(() => {
            stopSoundLength = stopSoundLength - UPDATE_INTERVAL
            if (stopSoundLength > 0 && this.state.speed > 0) {
                this.setState({
                    speed: this.state.speed - speedChangeStep
                })
            } else {
                clearInterval(timer)
            }

        }, UPDATE_INTERVAL)
    }

    handleSpeed(power) {
        var easing = BezierEasing(0.64, 0.18, 0.89, 0.28);
        this.setState({
            power: easing(power) * this.props.store.getState().carSelect.carModel.maxMotorPower
        });
    }

    render() {
        return <div className="car">
            <h1>{this.props.name}</h1>
            <Speedometer speed={this.state.speed}/>
            <div className="controls">
                <StartStop carName={this.props.name} store={this.props.store} speedChange={this.handleStartStop}
                           carStatus={this.state.carStatus}/>
                <Pedal ref={(pedal) => {
                    this._pedal = pedal;
                }}
                       isEnable={this.state.pedalIsEnable} speedHandler={this.handleSpeed}/>
                <ModeIndicator chargeBattery={this.state.chargeBattery}/>
                <AccelerationIndicator acceleration={this.state.acceleration}/>
                <VolumeInputRange soundgen={this.props.soundgen}/>
            </div>
            {__ZEBCONFIG__.env == 'DEV' ?
                <SoundBar soundgen={this.props.soundgen} speed={this.state.speed} carState={this.state.carState}/> : ''
            }
        </div>
    }
}

export default CarSimulator
