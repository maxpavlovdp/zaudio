import React from 'react';
import {registerBtnInStore} from '../../actions'

const smallStopButton = {
    height: '80px',
    width: '83px',
    borderRadius: '50%',
    fontSize: '23px',
    position: 'absolute',
    marginTop: '2%',
    left: '40%',
    padding: '0px'
}

class StartStop extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.state = {
            isOn: false,
            otherPlaying: false
        };
    }

    componentDidMount() {
        let toggleOtherSSBtns = () => {
            let otherPlaying = this.props.store.getState().ssButtonToggle.find(e => (e.isOn && e.name != this.props.carName))

            this.setState({
                otherPlaying: otherPlaying ? true : false
            })
        };

        this.props.store.dispatch(registerBtnInStore(this.props.carName))
        this.props.store.subscribe(toggleOtherSSBtns)
    }

    handleClick() {
        this.setState({
            isOn: !this.state.isOn
        });

        if ('speedChange' in this.props && typeof this.props.speedChange === 'function') {
            this.props.speedChange(this.state.isOn);
        }
    }

    render() {
        return <button className='start-stop-button'
                       style={this.state.isOn ? smallStopButton : {}}
                       disabled={this.props.carStatus == 'starting' || this.props.carStatus == 'stopping' || this.state.otherPlaying}
                       onClick={this.handleClick}>{this.state.isOn ? 'Stop' : 'Start'}

            {/*//####################### Stop button ############################*/}
            {/*<foreignObject>*/}
                {/*<svg id='Layer_1' x='0px' y='0px'*/}
                     {/*width='110px' height='110px' viewBox='0 0 110 110' enableBackground='new 0 0 110 110'>*/}
                    {/*<rect x='-940.165' y='-272.597' display='none' fill='#2BB259' width='1638.165' height='942.46'/>*/}
                    {/*<g id='BUTTON_1_'>*/}

                        {/*<radialGradient id='CENTER_CIRCLE_5_' cx='55' cy='55' r='35.3745'*/}
                                        {/*gradientTransform='matrix(1 0 0 3 0 -110)' gradientUnits='userSpaceOnUse'>*/}
                            {/*<stop offset='0' style={{stopColor: '#A9ABAE'}}/>*/}
                            {/*<stop offset='0.1893' style={{stopColor: '#A5A7A9'}}/>*/}
                            {/*<stop offset='0.4367' style={{stopColor: '#989A9C'}}/>*/}
                            {/*<stop offset='0.7163' style={{stopColor: '#848588'}}/>*/}
                            {/*<stop offset='1' style={{stopColor: '#696A6D'}}/>*/}
                        {/*</radialGradient>*/}

                        {/*<circle id='CENTER_CIRCLE_2_' fill='url(#CENTER_CIRCLE_5_)' stroke='#BCBEC0'*/}
                                {/*strokeMiterlimit='10' cx='55' cy='55' r='35.373'/>*/}
                        {/*<g>*/}
                            {/*<path fill='#414042' d='M42.622,48.876c-0.123-0.125-0.267-0.186-0.45-0.186h-1.574c-0.348,0-0.635,0.287-0.635,0.635*/}
            {/*s0.287,0.633,0.635,0.633h1.309l0.9,0.9v0.369c0,0.346,0.286,0.611,0.633,0.611c0.348,0,0.635-0.266,0.635-0.611v-0.635*/}
            {/*c0-0.143-0.062-0.307-0.184-0.451L42.622,48.876z'/>*/}
                            {/*<path fill='#414042' d='M43.686,55.992l-7.18-2.984v-2.148l0.881-0.9h1.328c0.349,0,0.614-0.285,0.614-0.633*/}
            {/*s-0.266-0.635-0.614-0.635h-1.594c-0.186,0-0.328,0.061-0.43,0.186l-1.268,1.266c-0.124,0.125-0.186,0.268-0.186,0.451v2.842*/}
            {/*c0,0.266,0.123,0.471,0.389,0.572l7.18,2.986v2.17l-0.9,0.879h-1.309c-0.348,0-0.635,0.285-0.635,0.635*/}
            {/*c0,0.346,0.287,0.633,0.635,0.633h1.574c0.184,0,0.327-0.062,0.45-0.186l1.269-1.266c0.121-0.125,0.184-0.268,0.184-0.432v-2.84*/}
            {/*C44.074,56.32,43.91,56.095,43.686,55.992z'/>*/}
                            {/*<path fill='#414042' d='M38.715,60.042h-1.328l-0.881-0.879v-0.371c0-0.346-0.285-0.631-0.633-0.631s-0.635,0.285-0.635,0.631*/}
            {/*v0.635c0,0.184,0.062,0.326,0.186,0.432l1.268,1.266c0.102,0.123,0.244,0.186,0.43,0.186h1.594c0.349,0,0.614-0.287,0.614-0.633*/}
            {/*C39.329,60.328,39.063,60.042,38.715,60.042z'/>*/}
                            {/*<path fill='#414042' d='M49.885,48.691h-1.9h-1.883c-0.348,0-0.634,0.287-0.634,0.635s0.286,0.633,0.634,0.633h3.15v10.719*/}
            {/*c0,0.346,0.286,0.633,0.633,0.633c0.349,0,0.635-0.287,0.635-0.633V49.326C50.52,48.978,50.233,48.691,49.885,48.691z'*/}
                            {/*/>*/}
                            {/*<path fill='#414042' d='M53.67,48.691h-1.903c-0.347,0-0.612,0.287-0.612,0.635s0.266,0.633,0.612,0.633h1.903*/}
            {/*c0.347,0,0.632-0.285,0.632-0.633S54.017,48.691,53.67,48.691z'/>*/}
                            {/*<path fill='#414042' d='M57.845,49.958h1.328c0.349,0,0.613-0.285,0.613-0.633s-0.265-0.635-0.613-0.635h-1.596*/}
            {/*c-0.183,0-0.325,0.061-0.429,0.186l-1.268,1.266c-0.123,0.125-0.185,0.268-0.185,0.451v8.834c0,0.184,0.062,0.326,0.185,0.432*/}
            {/*l1.268,1.266c0.104,0.123,0.246,0.186,0.429,0.186h1.596c0.349,0,0.613-0.287,0.613-0.633c0-0.35-0.265-0.635-0.613-0.635h-1.328*/}
            {/*l-0.88-0.879v-8.305L57.845,49.958z'/>*/}
                            {/*<path fill='#414042' d='M63.08,48.876c-0.123-0.125-0.267-0.186-0.45-0.186h-1.574c-0.349,0-0.635,0.287-0.635,0.635*/}
            {/*s0.286,0.633,0.635,0.633h1.309l0.899,0.9v8.305l-0.899,0.879h-1.309c-0.349,0-0.635,0.285-0.635,0.635*/}
            {/*c0,0.346,0.286,0.633,0.635,0.633h1.574c0.184,0,0.327-0.062,0.45-0.186l1.267-1.266c0.124-0.125,0.185-0.268,0.185-0.432v-8.834*/}
            {/*c0-0.143-0.061-0.307-0.185-0.451L63.08,48.876z'/>*/}
                            {/*<path fill='#414042' d='M73.309,48.876c-0.122-0.125-0.266-0.186-0.449-0.186h-6.301c-0.346,0-0.632,0.287-0.632,0.635*/}
            {/*s0.286,0.633,0.632,0.633h6.034l0.899,0.9v4.191l-0.899,0.9h-4.15c-0.35,0-0.636,0.285-0.636,0.637*/}
            {/*c0,0.346,0.286,0.633,0.636,0.633h4.417c0.142,0,0.307-0.064,0.449-0.186l1.269-1.268c0.121-0.143,0.184-0.307,0.184-0.451v-4.723*/}
            {/*c0-0.143-0.062-0.307-0.184-0.451L73.309,48.876z'/>*/}
                            {/*<path fill='#414042' d='M66.559,50.593c-0.346,0-0.632,0.285-0.632,0.635v9.449c0,0.346,0.286,0.633,0.632,0.633*/}
            {/*c0.349,0,0.635-0.287,0.635-0.633v-9.449C67.193,50.878,66.907,50.593,66.559,50.593z'/>*/}
                        {/*</g>*/}
                    {/*</g>*/}
                {/*</svg>*/}
            {/*</foreignObject>*/}


            {/*//####################### Stop button hover ############################*/}
            {/*<foreignObject>*/}
                {/*<svg id='Layer_1' x='0px' y='0px'*/}
                     {/*width='110px' height='110px' viewBox='0 0 110 110' enableBackground='new 0 0 110 110'>*/}
                    {/*<rect x='-940.165' y='-473.597' display='none' fill='#2BB259' width='1638.165' height='942.46'/>*/}
                    {/*<g id='BUTTON_5_'>*/}

                        {/*<radialGradient id='CENTER_CIRCLE_5_' cx='55' cy='55' r='35.374'*/}
                                        {/*gradientTransform='matrix(1 0 0 3 0 -110)' gradientUnits='userSpaceOnUse'>*/}
                            {/*<stop offset='0' style={{stopColor: '#9FA1A4'}}/>*/}
                            {/*<stop offset='0.1824' style={{stopColor: '#9B9D9F'}}/>*/}
                            {/*<stop offset='0.4209' style={{stopColor: '#8E9093'}}/>*/}
                            {/*<stop offset='0.6905' style={{stopColor: '#7A7C7E'}}/>*/}
                            {/*<stop offset='0.981' style={{stopColor: '#5D5E60'}}/>*/}
                            {/*<stop offset='1' style={{stopColor: '#5A5B5D'}}/>*/}
                        {/*</radialGradient>*/}

                        {/*<circle id='CENTER_CIRCLE_11_' fill='url(#CENTER_CIRCLE_5_)' stroke='#BCBEC0'*/}
                                {/*strokeMiterlimit='10' cx='55' cy='55.001' r='35.373'/>*/}
                        {/*<g>*/}
                            {/*<path fill='#414042' d='M42.622,48.877c-0.123-0.125-0.267-0.186-0.45-0.186h-1.574c-0.348,0-0.635,0.287-0.635,0.635*/}
            {/*s0.287,0.633,0.635,0.633h1.309l0.9,0.9v0.369c0,0.346,0.286,0.611,0.633,0.611c0.348,0,0.635-0.266,0.635-0.611v-0.635*/}
            {/*c0-0.143-0.062-0.307-0.184-0.451L42.622,48.877z'/>*/}
                            {/*<path fill='#414042' d='M43.686,55.992l-7.18-2.984v-2.148l0.881-0.9h1.328c0.349,0,0.614-0.285,0.614-0.633*/}
            {/*s-0.266-0.635-0.614-0.635h-1.594c-0.186,0-0.328,0.061-0.43,0.186l-1.268,1.266c-0.124,0.125-0.186,0.268-0.186,0.451v2.842*/}
            {/*c0,0.266,0.123,0.471,0.389,0.572l7.18,2.986v2.17l-0.9,0.879h-1.309c-0.348,0-0.635,0.285-0.635,0.635*/}
            {/*c0,0.346,0.287,0.633,0.635,0.633h1.574c0.184,0,0.327-0.062,0.45-0.186l1.269-1.266c0.121-0.125,0.184-0.268,0.184-0.432v-2.84*/}
            {/*C44.074,56.32,43.91,56.096,43.686,55.992z'/>*/}
                            {/*<path fill='#414042' d='M38.715,60.043h-1.328l-0.881-0.879v-0.371c0-0.346-0.285-0.631-0.633-0.631s-0.635,0.285-0.635,0.631*/}
            {/*v0.635c0,0.184,0.062,0.326,0.186,0.432l1.268,1.266c0.102,0.123,0.244,0.186,0.43,0.186h1.594c0.349,0,0.614-0.287,0.614-0.633*/}
            {/*C39.329,60.328,39.063,60.043,38.715,60.043z'/>*/}
                            {/*<path fill='#414042' d='M49.885,48.691h-1.9h-1.883c-0.348,0-0.634,0.287-0.634,0.635s0.286,0.633,0.634,0.633h3.15v10.719*/}
            {/*c0,0.346,0.286,0.633,0.633,0.633c0.349,0,0.635-0.287,0.635-0.633V49.326C50.52,48.979,50.233,48.691,49.885,48.691z'/>*/}
                            {/*<path fill='#414042' d='M53.67,48.691h-1.903c-0.347,0-0.612,0.287-0.612,0.635s0.266,0.633,0.612,0.633h1.903*/}
            {/*c0.347,0,0.632-0.285,0.632-0.633S54.017,48.691,53.67,48.691z'/>*/}
                            {/*<path fill='#414042' d='M57.845,49.959h1.328c0.349,0,0.613-0.285,0.613-0.633s-0.265-0.635-0.613-0.635h-1.596*/}
            {/*c-0.183,0-0.325,0.061-0.429,0.186l-1.268,1.266c-0.123,0.125-0.185,0.268-0.185,0.451v8.834c0,0.184,0.062,0.326,0.185,0.432*/}
            {/*l1.268,1.266c0.104,0.123,0.246,0.186,0.429,0.186h1.596c0.349,0,0.613-0.287,0.613-0.633c0-0.35-0.265-0.635-0.613-0.635h-1.328*/}
            {/*l-0.88-0.879v-8.305L57.845,49.959z'/>*/}
                            {/*<path fill='#414042' d='M63.08,48.877c-0.123-0.125-0.267-0.186-0.45-0.186h-1.574c-0.349,0-0.635,0.287-0.635,0.635*/}
            {/*s0.286,0.633,0.635,0.633h1.309l0.899,0.9v8.305l-0.899,0.879h-1.309c-0.349,0-0.635,0.285-0.635,0.635*/}
            {/*c0,0.346,0.286,0.633,0.635,0.633h1.574c0.184,0,0.327-0.062,0.45-0.186l1.267-1.266c0.124-0.125,0.185-0.268,0.185-0.432v-8.834*/}
            {/*c0-0.143-0.061-0.307-0.185-0.451L63.08,48.877z'/>*/}
                            {/*<path fill='#414042' d='M73.309,48.877c-0.122-0.125-0.266-0.186-0.449-0.186h-6.301c-0.346,0-0.632,0.287-0.632,0.635*/}
            {/*s0.286,0.633,0.632,0.633h6.034l0.899,0.9v4.191l-0.899,0.9h-4.15c-0.35,0-0.636,0.285-0.636,0.637*/}
            {/*c0,0.346,0.286,0.633,0.636,0.633h4.417c0.142,0,0.307-0.064,0.449-0.186l1.269-1.268c0.121-0.143,0.184-0.307,0.184-0.451v-4.723*/}
            {/*c0-0.143-0.062-0.307-0.184-0.451L73.309,48.877z'/>*/}
                            {/*<path fill='#414042' d='M66.559,50.594c-0.346,0-0.632,0.285-0.632,0.635v9.449c0,0.346,0.286,0.633,0.632,0.633*/}
            {/*c0.349,0,0.635-0.287,0.635-0.633v-9.449C67.193,50.879,66.907,50.594,66.559,50.594z'/>*/}
                        {/*</g>*/}
                    {/*</g>*/}
                {/*</svg>*/}
            {/*</foreignObject>*/}


            {/*//####################### Start button ############################*/}
            {/*<foreignObject>*/}
                {/*<svg id='Layer_1'*/}
                     {/*width='374px' height='374px' viewBox='0 0 374 374' enableBackground='new 0 0 374 374'>*/}
                    {/*<rect x='-83.165' y='-503.644' display='none' fill='#2BB259' width='1638.165' height='942.46'/>*/}
                    {/*<g id='START_BUTTON'>*/}

                        {/*<radialGradient id='CENTER_CIRCLE_5_' cx='187.1426' cy='188.5996' r='178.2576'*/}
                                        {/*gradientTransform='matrix(1 0 0 3 0 -377.1992)' gradientUnits='userSpaceOnUse'>*/}
                            {/*<stop offset='0' style={{stopColor: '#D4D4D4'}}/>*/}
                            {/*<stop offset='0.1121' style={{stopColor: '#B8B8B8'}}/>*/}
                            {/*<stop offset='0.273' style={{stopColor: '#989898'}}/>*/}
                            {/*<stop offset='0.4396' style={{stopColor: '#7F7F7F'}}/>*/}
                            {/*<stop offset='0.6119' style={{stopColor: '#6D6D6D'}}/>*/}
                            {/*<stop offset='0.7935' style={{stopColor: '#626262'}}/>*/}
                            {/*<stop offset='1' style={{stopColor: '#5E5E5E'}}/>*/}
                        {/*</radialGradient>*/}

                        {/*<linearGradient id='CENTER_CIRCLE_6_' gradientUnits='userSpaceOnUse' x1='1826.6611'*/}
                                        {/*y1='-96.8818' x2='1570.3267' y2='-353.2163'*/}
                                        {/*gradientTransform='matrix(-0.9981 -0.0613 0.0613 -0.9981 1896.2059 68.0977)'>*/}
                            {/*<stop offset='0' style={{stopColor: '#D1D1D1'}}/>*/}
                            {/*<stop offset='1' style={{stopColor: '#2B2B2B'}}/>*/}
                        {/*</linearGradient>*/}

                        {/*<path id='CENTER_CIRCLE_3_' fill='url(#CENTER_CIRCLE_5_)' stroke='url(#CENTER_CIRCLE_6_)'*/}
                              {/*strokeWidth='6' strokeMiterlimit='10' d='*/}
            {/*M9.226,177.678c-6.039,98.26,68.733,182.805,166.993,188.838c98.261,6.039,182.808-68.727,188.84-166.992*/}
            {/*c6.032-98.259-68.728-182.807-166.993-188.841C99.805,4.65,15.26,79.421,9.226,177.678z'/>*/}
                        {/*<g>*/}
                            {/*<path fill='#414042' d='M116.608,213.305c-0.491,0.494-1.07,0.744-1.81,0.744h-6.356c-1.4,0-2.554-1.154-2.554-2.558*/}
            {/*s1.154-2.558,2.554-2.558h5.282l3.627-3.546v-8.745l-28.953-12.041c-1.074-0.414-1.564-1.238-1.564-2.312v-11.463*/}
            {/*c0-0.743,0.246-1.318,0.74-1.816l5.115-5.114c0.41-0.495,0.993-0.741,1.731-0.741h6.434c1.404,0,2.471,1.154,2.471,2.558*/}
            {/*s-1.067,2.558-2.471,2.558h-5.363l-3.542,3.63v8.661l28.951,12.041c0.907,0.415,1.564,1.319,1.564,2.394v11.466*/}
            {/*c0,0.66-0.246,1.234-0.744,1.729L116.608,213.305z M94.422,214.049c-0.738,0-1.321-0.25-1.731-0.744l-5.115-5.114*/}
            {/*c-0.495-0.409-0.74-0.988-0.74-1.729v-2.557c0-1.402,1.15-2.558,2.554-2.558c1.404,0,2.562,1.155,2.562,2.558v1.483l3.542,3.546*/}
            {/*h5.363c1.404,0,2.471,1.154,2.471,2.558s-1.067,2.558-2.471,2.558H94.422z M122.466,173.384c0,1.403-1.152,2.473-2.552,2.473*/}
            {/*c-1.403,0-2.562-1.069-2.562-2.473v-1.484l-3.627-3.63h-5.282c-1.4,0-2.554-1.154-2.554-2.558s1.154-2.558,2.554-2.558h6.356*/}
            {/*c0.74,0,1.319,0.246,1.81,0.741l5.113,5.114c0.499,0.579,0.744,1.238,0.744,1.816V173.384z'/>*/}
                            {/*<path fill='#414042' d='M143.337,168.27h-12.704c-1.405,0-2.554-1.154-2.554-2.558s1.148-2.558,2.554-2.558h7.589h7.673*/}
            {/*c1.399,0,2.558,1.154,2.558,2.558v45.779c0,1.403-1.158,2.558-2.558,2.558c-1.403,0-2.558-1.154-2.558-2.558V168.27z*/}
            {/*M153.481,168.27c-1.403,0-2.473-1.154-2.473-2.558s1.07-2.558,2.473-2.558h7.675c1.399,0,2.554,1.154,2.554,2.558*/}
            {/*s-1.154,2.558-2.554,2.558H153.481z'/>*/}
                            {/*<path fill='#414042' d='M199.844,197.552H171.88c-0.579,0-1.239-0.249-1.813-0.744c-0.495-0.495-0.744-1.068-0.744-1.812v-24.169*/}
            {/*c0-0.743,0.25-1.318,0.744-1.816l5.113-5.114c0.41-0.495,0.991-0.741,1.729-0.741h20.377c0.74,0,1.319,0.246,1.814,0.741*/}
            {/*l5.113,5.114c0.495,0.579,0.744,1.238,0.744,1.816v16.498c0,1.402-1.154,2.557-2.558,2.557c-1.402,0-2.556-1.154-2.556-2.557*/}
            {/*v-15.425l-3.632-3.63h-18.229l-3.545,3.63v20.538h27.962c1.403,0,2.558,1.154,2.558,2.558v7.586v8.91*/}
            {/*c0,1.403-1.154,2.558-2.558,2.558c-1.402,0-2.556-1.154-2.556-2.558V197.552z M169.322,202.581c0-1.399,1.154-2.557,2.558-2.557*/}
            {/*s2.558,1.157,2.558,2.557v8.91c0,1.403-1.154,2.558-2.558,2.558s-2.558-1.154-2.558-2.558V202.581z'/>*/}
                            {/*<path fill='#414042' d='M226.074,197.552h-5.365c-1.397,0-2.556-1.154-2.556-2.557c0-1.403,1.158-2.558,2.556-2.558h16.748*/}
            {/*l3.629-3.631v-16.907l-3.629-3.63h-24.334c-1.401,0-2.556-1.154-2.556-2.558s1.154-2.558,2.556-2.558h25.406*/}
            {/*c0.742,0,1.319,0.246,1.814,0.741l5.115,5.114c0.495,0.579,0.744,1.238,0.744,1.816v19.055c0,0.579-0.25,1.238-0.744,1.812*/}
            {/*l-5.115,5.114c-0.575,0.495-1.239,0.744-1.814,0.744h-5.278l12.208,12.126c0.989,0.989,0.989,2.638,0,3.627*/}
            {/*c-0.495,0.494-1.074,0.744-1.814,0.744c-0.744,0-1.319-0.25-1.817-0.744L226.074,197.552z M210.567,173.384*/}
            {/*c0-1.404,1.154-2.558,2.556-2.558c1.403,0,2.558,1.153,2.558,2.558v38.107c0,1.403-1.154,2.558-2.558,2.558*/}
            {/*c-1.401,0-2.556-1.154-2.556-2.558V173.384z'/>*/}
                            {/*<path fill='#414042' d='M267.069,168.27h-12.702c-1.403,0-2.558-1.154-2.558-2.558s1.154-2.558,2.558-2.558h7.586h7.671*/}
            {/*c1.404,0,2.558,1.154,2.558,2.558v45.779c0,1.403-1.154,2.558-2.558,2.558c-1.399,0-2.556-1.154-2.556-2.558V168.27z*/}
            {/*M277.215,168.27c-1.403,0-2.475-1.154-2.475-2.558s1.072-2.558,2.475-2.558h7.671c1.404,0,2.558,1.154,2.558,2.558*/}
            {/*s-1.154,2.558-2.558,2.558H277.215z'/>*/}
                        {/*</g>*/}
                    {/*</g>*/}
                {/*</svg>*/}
            {/*</foreignObject>*/}


            {/*//####################### Start button on mouse hover ############################*/}
            {/*<foreignObject>*/}
                {/*<svg x='0px' y='0px'*/}
                     {/*width='400px' height='400px' viewBox='0 0 400 400' enableBackground='new 0 0 400 400'>*/}
                    {/*<rect x='-467.165' y='-503.644' display='none' fill='#2BB259' width='1638.165' height='942.46'/>*/}
                    {/*<g id='START_BUTTON_1_'>*/}

                        {/*<radialGradient id='CENTER_CIRCLE_5_' cx='187.6719' cy='188.5996' r='178.2578'*/}
                                        {/*gradientTransform='matrix(1 0 0 3 0 -377.1992)' gradientUnits='userSpaceOnUse'>*/}
                            {/*<stop offset='0' style={{stopColor: '#D4D4D4'}}/>*/}
                            {/*<stop offset='0.1121' style={{stopColor: '#B8B8B8'}}/>*/}
                            {/*<stop offset='0.273' style={{stopColor: '#989898'}}/>*/}
                            {/*<stop offset='0.4396' style={{stopColor: '#7F7F7F'}}/>*/}
                            {/*<stop offset='0.6119' style={{stopColor: '#6D6D6D'}}/>*/}
                            {/*<stop offset='0.7935' style={{stopColor: '#626262'}}/>*/}
                            {/*<stop offset='1' style={{stopColor: '#5E5E5E'}}/>*/}
                        {/*</radialGradient>*/}

                        {/*<linearGradient id='CENTER_CIRCLE_6_' gradientUnits='userSpaceOnUse' x1='1058.8467'*/}
                                        {/*y1='-73.3096'*/}
                                        {/*x2='802.5129' y2='-329.6434'*/}
                                        {/*gradientTransform='matrix(-0.9981 -0.0613 0.0613 -0.9981 1128.9355 44.5585)'>*/}
                            {/*<stop offset='0' style={{stopColor: '#D1D1D1'}}/>*/}
                            {/*<stop offset='1' style={{stopColor: '#2B2B2B'}}/>*/}
                        {/*</linearGradient>*/}

                        {/*<path id='CENTER_CIRCLE_4_' fill='url(#CENTER_CIRCLE_5_)' stroke='url(#CENTER_CIRCLE_6_)'*/}
                              {/*strokeWidth='6' strokeMiterlimit='10' d='*/}
            {/*M9.756,177.678c-6.039,98.26,68.733,182.805,166.993,188.838c98.261,6.039,182.808-68.727,188.84-166.992*/}
            {/*c6.032-98.259-68.728-182.807-166.993-188.841C100.334,4.65,15.79,79.421,9.756,177.678z'/>*/}
                        {/*<g>*/}
                            {/*<radialGradient id='SVGID_1_' cx='105.1802' cy='188.6016' r='21.9653'*/}
                                            {/*gradientUnits='userSpaceOnUse'>*/}
                                {/*<stop offset='0' style={{stopColor: '#32B44A'}}/>*/}
                                {/*<stop offset='0.0242' style={{stopColor: '#31AC48'}}/>*/}
                                {/*<stop offset='0.1712' style={{stopColor: '#259243'}}/>*/}
                                {/*<stop offset='0.3301' style={{stopColor: '#1A803E'}}/>*/}
                                {/*<stop offset='0.5045' style={{stopColor: '#12743A'}}/>*/}
                                {/*<stop offset='0.7065' style={{stopColor: '#0C6D37'}}/>*/}
                                {/*<stop offset='1' style={{stopColor: '#0A6B37'}}/>*/}
                            {/*</radialGradient>*/}
                            {/*<path fill='url(#SVGID_1_)' d='M117.138,213.305c-0.491,0.494-1.07,0.744-1.81,0.744h-6.356c-1.4,0-2.554-1.154-2.554-2.558*/}
            {/*s1.154-2.558,2.554-2.558h5.282l3.627-3.546v-8.745l-28.953-12.041c-1.074-0.414-1.564-1.238-1.564-2.312v-11.463*/}
            {/*c0-0.743,0.246-1.318,0.74-1.816l5.115-5.114c0.41-0.495,0.993-0.741,1.731-0.741h6.434c1.404,0,2.471,1.154,2.471,2.558*/}
            {/*s-1.067,2.558-2.471,2.558h-5.363l-3.542,3.63v8.661l28.951,12.041c0.907,0.415,1.564,1.319,1.564,2.394v11.466*/}
            {/*c0,0.66-0.246,1.234-0.744,1.729L117.138,213.305z M94.952,214.049c-0.738,0-1.321-0.25-1.731-0.744l-5.115-5.114*/}
            {/*c-0.495-0.409-0.74-0.988-0.74-1.729v-2.557c0-1.402,1.15-2.558,2.554-2.558c1.404,0,2.562,1.155,2.562,2.558v1.483l3.542,3.546*/}
            {/*h5.363c1.404,0,2.471,1.154,2.471,2.558s-1.067,2.558-2.471,2.558H94.952z M122.996,173.384c0,1.403-1.152,2.473-2.552,2.473*/}
            {/*c-1.403,0-2.562-1.069-2.562-2.473v-1.484l-3.627-3.63h-5.282c-1.4,0-2.554-1.154-2.554-2.558s1.154-2.558,2.554-2.558h6.356*/}
            {/*c0.74,0,1.319,0.246,1.81,0.741l5.113,5.114c0.499,0.579,0.744,1.238,0.744,1.816V173.384z'/>*/}
                            {/*<radialGradient id='SVGID_2_' cx='146.4248' cy='188.6016' r='21.9653'*/}
                                            {/*gradientUnits='userSpaceOnUse'>*/}
                                {/*<stop offset='0' style={{stopColor: '#32B44A'}}/>*/}
                                {/*<stop offset='0.0242' style={{stopColor: '#31AC48'}}/>*/}
                                {/*<stop offset='0.1712' style={{stopColor: '#259243'}}/>*/}
                                {/*<stop offset='0.3301' style={{stopColor: '#1A803E'}}/>*/}
                                {/*<stop offset='0.5045' style={{stopColor: '#12743A'}}/>*/}
                                {/*<stop offset='0.7065' style={{stopColor: '#0C6D37'}}/>*/}
                                {/*<stop offset='1' style={{stopColor: '#0A6B37'}}/>*/}
                            {/*</radialGradient>*/}
                            {/*<path fill='url(#SVGID_2_)' d='M143.867,168.27h-12.704c-1.405,0-2.554-1.154-2.554-2.558s1.148-2.558,2.554-2.558h7.589h7.673*/}
            {/*c1.399,0,2.558,1.154,2.558,2.558v45.779c0,1.403-1.158,2.558-2.558,2.558c-1.403,0-2.558-1.154-2.558-2.558V168.27z*/}
            {/*M154.011,168.27c-1.403,0-2.473-1.154-2.473-2.558s1.07-2.558,2.473-2.558h7.675c1.399,0,2.554,1.154,2.554,2.558*/}
            {/*s-1.154,2.558-2.554,2.558H154.011z'/>*/}
                            {/*<radialGradient id='SVGID_3_' cx='187.6694' cy='188.6016' r='21.9661'*/}
                                            {/*gradientUnits='userSpaceOnUse'>*/}
                                {/*<stop offset='0' style={{stopColor: '#32B44A'}}/>*/}
                                {/*<stop offset='0.0242' style={{stopColor: '#31AC48'}}/>*/}
                                {/*<stop offset='0.1712' style={{stopColor: '#259243'}}/>*/}
                                {/*<stop offset='0.3301' style={{stopColor: '#1A803E'}}/>*/}
                                {/*<stop offset='0.5045' style={{stopColor: '#12743A'}}/>*/}
                                {/*<stop offset='0.7065' style={{stopColor: '#0C6D37'}}/>*/}
                                {/*<stop offset='1' style={{stopColor: '#0A6B37'}}/>*/}
                            {/*</radialGradient>*/}
                            {/*<path fill='url(#SVGID_3_)' d='M200.374,197.552H172.41c-0.579,0-1.239-0.249-1.813-0.744c-0.495-0.495-0.744-1.068-0.744-1.812*/}
            {/*v-24.169c0-0.743,0.25-1.318,0.744-1.816l5.113-5.114c0.41-0.495,0.991-0.741,1.729-0.741h20.377c0.74,0,1.319,0.246,1.814,0.741*/}
            {/*l5.113,5.114c0.495,0.579,0.744,1.238,0.744,1.816v16.498c0,1.402-1.154,2.557-2.558,2.557c-1.402,0-2.556-1.154-2.556-2.557*/}
            {/*v-15.425l-3.632-3.63h-18.229l-3.545,3.63v20.538h27.962c1.403,0,2.558,1.154,2.558,2.558v7.586v8.91*/}
            {/*c0,1.403-1.154,2.558-2.558,2.558c-1.402,0-2.556-1.154-2.556-2.558V197.552z M169.852,202.581c0-1.399,1.154-2.557,2.558-2.557*/}
            {/*s2.558,1.157,2.558,2.557v8.91c0,1.403-1.154,2.558-2.558,2.558s-2.558-1.154-2.558-2.558V202.581z'/>*/}
                            {/*<radialGradient id='SVGID_4_' cx='228.9141' cy='188.6016' r='21.9661'*/}
                                            {/*gradientUnits='userSpaceOnUse'>*/}
                                {/*<stop offset='0' style={{stopColor: '#32B44A'}}/>*/}
                                {/*<stop offset='0.0242' style={{stopColor: '#31AC48'}}/>*/}
                                {/*<stop offset='0.1712' style={{stopColor: '#259243'}}/>*/}
                                {/*<stop offset='0.3301' style={{stopColor: '#1A803E'}}/>*/}
                                {/*<stop offset='0.5045' style={{stopColor: '#12743A'}}/>*/}
                                {/*<stop offset='0.7065' style={{stopColor: '#0C6D37'}}/>*/}
                                {/*<stop offset='1' style={{stopColor: '#0A6B37'}}/>*/}
                            {/*</radialGradient>*/}
                            {/*<path fill='url(#SVGID_4_)' d='M226.604,197.552h-5.365c-1.397,0-2.556-1.154-2.556-2.557c0-1.403,1.158-2.558,2.556-2.558h16.748*/}
            {/*l3.629-3.631v-16.907l-3.629-3.63h-24.334c-1.401,0-2.556-1.154-2.556-2.558s1.154-2.558,2.556-2.558h25.406*/}
            {/*c0.742,0,1.319,0.246,1.814,0.741l5.115,5.114c0.495,0.579,0.744,1.238,0.744,1.816v19.055c0,0.579-0.25,1.238-0.744,1.812*/}
            {/*l-5.115,5.114c-0.575,0.495-1.239,0.744-1.814,0.744h-5.278l12.208,12.126c0.989,0.989,0.989,2.638,0,3.627*/}
            {/*c-0.495,0.494-1.074,0.744-1.814,0.744c-0.744,0-1.319-0.25-1.817-0.744L226.604,197.552z M211.097,173.384*/}
            {/*c0-1.404,1.154-2.558,2.556-2.558c1.403,0,2.558,1.153,2.558,2.558v38.107c0,1.403-1.154,2.558-2.558,2.558*/}
            {/*c-1.401,0-2.556-1.154-2.556-2.558V173.384z'/>*/}
                            {/*<radialGradient id='SVGID_5_' cx='270.1562' cy='188.6016' r='21.9661'*/}
                                            {/*gradientUnits='userSpaceOnUse'>*/}
                                {/*<stop offset='0' style={{stopColor: '#32B44A'}}/>*/}
                                {/*<stop offset='0.0242' style={{stopColor: '#31AC48'}}/>*/}
                                {/*<stop offset='0.1712' style={{stopColor: '#259243'}}/>*/}
                                {/*<stop offset='0.3301' style={{stopColor: '#1A803E'}}/>*/}
                                {/*<stop offset='0.5045' style={{stopColor: '#12743A'}}/>*/}
                                {/*<stop offset='0.7065' style={{stopColor: '#0C6D37'}}/>*/}
                                {/*<stop offset='1' style={{stopColor: '#0A6B37'}}/>*/}
                            {/*</radialGradient>*/}
                            {/*<path fill='url(#SVGID_5_)' d='M267.599,168.27h-12.702c-1.403,0-2.558-1.154-2.558-2.558s1.154-2.558,2.558-2.558h7.586h7.671*/}
            {/*c1.404,0,2.558,1.154,2.558,2.558v45.779c0,1.403-1.154,2.558-2.558,2.558c-1.399,0-2.556-1.154-2.556-2.558V168.27z*/}
            {/*M277.745,168.27c-1.403,0-2.475-1.154-2.475-2.558s1.072-2.558,2.475-2.558h7.671c1.404,0,2.558,1.154,2.558,2.558*/}
            {/*s-1.154,2.558-2.558,2.558H277.745z'/>*/}
                        {/*</g>*/}
                    {/*</g>*/}
                {/*</svg>*/}
            {/*</foreignObject>*/}


        </button>
    }
}

export default StartStop