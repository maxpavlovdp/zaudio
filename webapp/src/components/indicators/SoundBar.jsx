import React from 'react';

class SoundBar extends React.Component {
    constructor(props) {
        super(props);
    }

    render () {
        var y = 5;
        var scale = 3;
        var max_speed = this.props.soundgen.config.main.reduce(function(last, current) {
                                var speedMargins = 'speed' in current ? current.speed.margins : current.margins.speed;
                                return last > speedMargins[1] ? last : speedMargins[1];
                            }, 0);
        var conteinerWidth = max_speed*scale +5 +5;
        var currentSpeed = this.props.speed * scale + 5;

        //console.log(this.props.soundgen.config.main[0].audioSource.context.currentTime);

        return  <div>
                    <svg width={conteinerWidth} height={this.props.soundgen.config.main.length * 33 + 5} style={{border: 'black solid 1px'}}>
                        {this.props.soundgen.config.main.map(function(sound){
                            var speedMargins = 'speed' in sound ? sound.speed.margins : sound.margins.speed;
                            var width = (speedMargins[1] - speedMargins[0]) * scale;
                            var x = speedMargins[0] * scale;
                            var soundName = sound.link.match(/\/([\w\+\-]+)\./)[1];
                            var content = <g key={soundName + Math.floor(Math.random()*1000000)}>
                                    <rect x={x + 5} y={y} width={width} height="30" fill={sound.started ? 'skyblue' : 'lightgrey'} stroke="black" strokeWidth="1" />
                                    <foreignObject x={x + 5} y={y + 5} >
                                        <div style={{
                                            position: 'relative',
                                            width: width,
                                            height: 25
                                        }}>
                                            <div style={{float: 'left', position: 'absolute', marginLeft: 5}}>{soundName}</div>
                                            <div style={{float: 'right', fontSize: '60%', marginRight: 5}}>
                                            { sound.started && 'audioSource' in sound ?
                                                <div>PBR: {sound.audioSource.playbackRate.value.toFixed(1)}</div>: ''
                                            }
                                            { sound.started && 'gainNode' in sound ?
                                                <div>Volume: {sound.gainNode.gain.value.toFixed(1)} </div>: ''
                                            }
                                            </div>
                                        </div>
                                    </foreignObject>
                                </g>;
                            y+=33;
                            return content;
                        })}

                        <g className="tick" transform={'translate('+currentSpeed+',0)'} style={{opacity: '1'}}>
                            <line y2="300" x2="0" fill="none" stroke="red" strokeWidth="2px" shapeRendering="crispedges" opacity="0.7"></line>
                        </g>
                    </svg>
                    { 'speed' in this.props.carState ?
                        <div>Speed: {this.props.carState.speed.toFixed(2)}</div>: ''
                    }
                    { 'power' in this.props.carState ?
                        <div>Power: {this.props.carState.power.toFixed(2)}</div>: ''
                    }
                    { 'def' in this.props.carState ?
                        <div>Acceleration: {this.props.carState.def.toFixed(2)}</div>: ''
                    }
                    { 'recuperationPower' in this.props.carState ?
                        <div>Recuperation Power: {this.props.carState.recuperationPower.toFixed(2)}</div>: ''
                    }
                </div>;
    }
}

export default SoundBar;
