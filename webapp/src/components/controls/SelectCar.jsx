import React from 'react';

class SelectCar extends React.Component {
    constructor(props) {
        super(props)
    }

    handleSelect() {

    }

    componentDidMount() {
        console.log(this.props.store.getState().ssButtonToggle)
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