import React from 'react';
import {registerCarModelInStore} from '../../actions'
import {teslaModelS} from '../../config/carParams.js'

class SelectCar extends React.Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        this.props.store.dispatch(registerCarModelInStore(teslaModelS))
        console.log(this.props.store.getState().carSelect.carModel)
    }

    render() {
        return (
            <div>
                <p> Chose your car:
                    <select>
                        <option>Model S</option>
                        <option>Model 3</option>
                    </select>
                </p>
            </div>
        )
    }
}

export default SelectCar