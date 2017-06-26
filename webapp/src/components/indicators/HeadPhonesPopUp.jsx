import React from 'react'
import {Button} from 'react-bootstrap'
import Dialog from 'react-bootstrap-dialog'

export default class SampleCode extends React.Component {
    constructor () {
        super()
        this.onClick = this.onClick.bind(this)
        this.onClick()
    }

    onClick () {
        this.refs.dialog.showAlert('Hello Dialog!')
    }

    render () {
        return (
            <div>
                {/*<Button onClick={this.onClick}>Show alert</Button>*/}
                <Dialog ref='dialog' />
            </div>
        )
    }
}