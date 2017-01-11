import React from 'react';

class SoundBar extends React.Component {
    constructor(props) {
        super(props);
    }

    render () {
        var y = 5;
        return  <div>
                    <svg width="800" height={this.props.soundgen.config.main.length * 33 + 5}>
                        {this.props.soundgen.config.main.map(function(sound){
                            var width = sound.speed.margins[1] - sound.speed.margins[0];
                            var x = sound.speed.margins[0];
                            var soundName = sound.link.match(/\/([\w\+\-]+)\./)[1];
                            var content = <g>
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

                        <line x1={this.props.speed + 5} y1="0" x2={this.props.speed + 5} y2="300" stroke="red" strokeWidth="2" />
                    </svg>
                </div>;
    }
}

export default SoundBar;
