import React from 'react';

import './Speedo.less';

class Speedometer extends React.Component {
    constructor(props) {
        super(props);
    }

    render () {
        return  <svg className="speedo">
                    <ellipse className="edge" rx="194" ry="194" cx="200" cy="200"></ellipse>
                    <path className="edge-in" d="M0,148.00000000000003 A148,148,0,1,1,148.01937315464195,295.99999873203 L148.01859822845628,290.0799987827488 A142.08,142.08,0,1,0,5.9199999999999875,148.00000000000003 Z M-148,-148 M-148,148 M148,148 M148,-148 M-148,-148 Z"></path>
                    <foreignObject className="speed-figure speed-figure-240"><div>240</div></foreignObject>
                    <foreignObject className="speed-figure speed-figure-220"><div>220</div></foreignObject>
                    <foreignObject className="speed-figure speed-figure-200"><div>200</div></foreignObject>
                    <foreignObject className="speed-figure speed-figure-180"><div>180</div></foreignObject>
                    <foreignObject className="speed-figure speed-figure-160"><div>160</div></foreignObject>
                    <foreignObject className="speed-figure speed-figure-140"><div>140</div></foreignObject>
                    <foreignObject className="speed-figure speed-figure-120"><div>120</div></foreignObject>
                    <foreignObject className="speed-figure speed-figure-100"><div>100</div></foreignObject>
                    <foreignObject className="speed-figure speed-figure-80"><div>80</div></foreignObject>
                    <foreignObject className="speed-figure speed-figure-60"><div>60</div></foreignObject>
                    <foreignObject className="speed-figure speed-figure-40"><div>40</div></foreignObject>
                    <foreignObject className="speed-figure speed-figure-20"><div>20</div></foreignObject>
                    <foreignObject className="speed-figure speed-figure-0"><div>0</div></foreignObject>
                    <foreignObject className="center-origin" style={{transform: 'rotate(' + this.props.speed * 1.125 + 'deg)'}}>
                        <svg>
                            <path className="pointer" d="M3.234817813765183 0C3.234817813765183 0 0 2.7025000000000006 0 2.7025000000000006 0 2.7025000000000006 10.507422402159243 11.5 10.507422402159243 11.5 10.507422402159243 11.5 0 20.2975 0 20.2975 0 20.2975 3.234817813765183 23 3.234817813765183 23 3.234817813765183 23 17 11.5 17 11.5 17 11.5 3.234817813765183 0 3.234817813765183 0"></path>
                        </svg>
                    </foreignObject>
                </svg>;
    }
}

export default Speedometer;
