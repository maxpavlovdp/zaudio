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

import cCalc from '../CarMovementCalcutator';

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

                    // 30 times per second we update car state.
                    let timer = setInterval(() => {
                        let carModel = this.props.store.getState().carSelect.carModel

                        let newCarState = cCalc.updateCarState(carModel, this.state.power, this.state.speed, 1 / FPS);
                        this.props.soundgen.handleSound(newCarState);

                        this.setState({
                            speed: newCarState.speed > 240 ? 240 : newCarState.speed < 0 ? 0 : newCarState.speed,
                            acceleration: cCalc.calculateAcceleration(this.state.speed, newCarState.speed, 1 / FPS),
                            chargeBattery: -newCarState.recuperationPower,
                            carState: newCarState
                        });
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

    updateSpeedAfterStop() {
        // Better to set to real "engineOff" sound length. Can be implemented if will be needed.
        let stopSoundLength = 4000
        let speedChangeStep = this.state.speed / (stopSoundLength / UPDATE_INTERVAL)
        let timer = setInterval(() => {
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
                <ModeIndicator store={this.props.store} chargeBattery={this.state.chargeBattery}/>
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
