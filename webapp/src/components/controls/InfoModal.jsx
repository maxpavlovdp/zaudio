import React from 'react';
import Modal from 'react-modal'

class InfoModal extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showModal: false
        };

        this.handleOpenModal = this.handleOpenModal.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
    }

    handleOpenModal () {
        this.setState({ showModal: true });
    }

    handleCloseModal () {
        this.setState({ showModal: false });
    }

    render() {
        return(<div>
                    <a onClick={this.handleOpenModal} className="info-button"><span>info</span>Info</a>
                    <Modal
                        isOpen={this.state.showModal}
                        contentLabel="Info"
                        style={{
                            overlay: {
                                zIndex: 100
                            },
                            content: {
                                zIndex: 100
                            }
                        }}
                    >
                        <h1>Info</h1>
                        <p>Same Text</p>
                        <button onClick={this.handleCloseModal}>Ok</button>
                    </Modal>
            </div>
        )}
}

export default InfoModal