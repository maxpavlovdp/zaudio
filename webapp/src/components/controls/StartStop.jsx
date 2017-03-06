import React from 'react';
import {registerBtnInStore} from '../../actions'

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
        let toggleOtherSSBtns = (store = this.props.store)=> {
            let otherPlaying = store.getState().find(e => (e.isOn && e.name != this.props.carName))

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
        return <button className="start-stop-button"
                       disabled={this.props.carStatus == 'starting' || this.props.carStatus == 'stopping' || this.state.otherPlaying}
                       onClick={this.handleClick}>{this.state.isOn ? 'Stop' : 'Start'}</button>
    }
}

export default StartStop