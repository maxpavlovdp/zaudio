import React from 'react'
import CarSimulator from './CarSimulator.jsx'
import {createStore} from 'redux'
import reducers from '../reducers'
import AppConstants from '../AppConstants'
import __ZEBCONFIG__ from '../config/config'
import SelectCar from './controls/SelectCar.jsx'
import Modal from 'react-modal'


class ZEB extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showModal: false
        };

        this.handleCloseModal = this.handleCloseModal.bind(this);

        if (__ZEBCONFIG__.env === AppConstants.DEV) {
            this.store = createStore(reducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
        } else {
            this.store = createStore(reducers)
        }
    }

    handleCloseModal() {
        this.setState({showModal: false});
    }

    componentDidMount() {
        // var isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
        // if (!isChrome) {
        //     this.setState({
        //         showModal: true
        //     })
        // }
    }

    render() {
        return (
            <div>
                <SelectCar store={this.store}/>
                <CarSimulator store={this.store} scheme={require("../sounds/daily/schemeDaily.jsx").schemeDaily}/>
                <CarSimulator store={this.store} scheme={require("../sounds/v4_1/schemeV4_1.jsx").soundSchemeV4_1}/>
                <CarSimulator store={this.store}
                              scheme={require("../sounds/futuristic/schemeFuturistic.jsx").schemeFuturistic}/>


                {/*<CarSimulator store={this.store} scheme={require("../sounds/v4/v4Scheme.jsx").ssv4}/>*/}
                {/*<CarSimulator store={this.store} scheme={require("../sounds/v4/schemeV4_example.jsx").ssv4example}/>*/}
                {/*<CarSimulator store={this.store} scheme={require("../sounds/v3/schemeV3.jsx").ssv3}/>*/}
                {/*<CarSimulator store={this.store} scheme={require("../sounds/v2/schemeV2.jsx").ssv2}/>*/}
                {/*<CarSimulator store={this.store} scheme={require("../sounds/v1/schemeV1.jsx").ssv1}/>*/}

                <Modal
                    isOpen={this.state.showModal}
                    contentLabel="Info Chrome"
                    style={{
                        overlay: {
                            zIndex: 100
                        },
                        content: {
                            zIndex: 100,
                            height: '200px',
                            width: '400px',
                            textAlign: 'center',
                            display: 'inline-block',
                            margin: 'auto'
                        }
                    }}
                >
                    <p>Please Use Chrome Browser Only</p>
                    <button className="ok-button" onClick={this.handleCloseModal}>Ok</button>
                </Modal>
            </div>
        )
    }
}

export default ZEB;
