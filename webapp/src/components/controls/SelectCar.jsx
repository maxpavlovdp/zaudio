import React from 'react';
import {setCarModelInStore} from '../../actions'
import {carModels} from '../../config/carParams.js'

const options = Object.values(carModels).map(e => <option key={e.key} value={e.key}>{e.name}</option>)

class SelectCar extends React.Component {
    constructor(props) {
        super(props)
        this.handleChange = this.handleChange.bind(this)
    }

    componentDidMount() {
        this.props.store.dispatch(setCarModelInStore(carModels.teslaModelS))
    }

    handleChange(e) {
        this.props.store.dispatch(setCarModelInStore(carModels[e.target.value]))
    }


    render() {
        return (
            <div>
                <label style={{display: 'inline'}}>Chose your car:</label> <select style={{display: 'inline'}} onChange={this.handleChange}>{options}</select>
            </div>
        )
    }
}

export default SelectCar