import React from 'react';
import Modal from 'react-modal'
import cookie from 'react-cookie';


class Pedal extends React.Component {
    constructor(props) {
        super(props);
        this.handleSpeed = this.handleSpeed.bind(this);
        this.handleMouseDown = this.handleMouseDown.bind(this);
        this.handleMouseUp = this.handleMouseUp.bind(this);

        this.handleOpenModal = this.handleOpenModal.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);

        this.state = {
            isEnable: this.props.isEnable,
            pedalPos: 0,
            showModal: false
        };
    }

    handleOpenModal() {
        let firstVisit = !cookie.load('notFirstVisit');
        if (firstVisit) {
            cookie.save('notFirstVisit', true, {path: 'z-audio.shop/'})
            // this.setState({showModal: true});
        }
    }

    handleCloseModal() {
        this.setState({showModal: false});
    }

    handleSpeed(pedalPosition) {
        if ('speedHandler' in this.props && typeof this.props.speedHandler === 'function') {
            this.props.speedHandler(pedalPosition);
        }

        this.setState({
            pedalPos: pedalPosition
        })
    }

    updatePedalPos(pedalPos) {
        this.setState({
            pedalPos: pedalPos
        })
    }

    componentWillReceiveProps(nextProps) {
        if (this.state.isEnable != nextProps.isEnable) {
            this.setState({
                isEnable: nextProps.isEnable,
            });
        }
    }

    handleMouseDown() {
        if(this.state.isEnable) {
            this.handleSpeed(1);
        }
    }

    handleMouseUp() {
        if(this.state.isEnable) {
            this.handleSpeed(0);
        }
    }


    render() {
        return(
        <div onMouseDown={this.handleMouseDown} onMouseUp={this.handleMouseUp} style={{cursor: this.state.isEnable? 'pointer': ""}}>
             <svg className="pedal" style={{transformOrigin: '50% 140px', transform: 'perspective(250px) rotateX(' + this.state.pedalPos*50 +  'deg)'}} version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="140px" height="140px" viewBox="0 0 140 140" enableBackground="new 0 0 140 140" xmlSpace="preserve">
                 <rect x="-1172.791" y="-257.597" display="none" fill="#2BB259" width="1638.165" height="942.46"/>
                 <g>
                     <path fill="#6D6E71" stroke="#BCBEC0" strokeWidth="2" strokeMiterlimit="10" d="M34.339,128.534h14.775
                     c0,0-1.349-7.066,0.367-15.398L43.956,91.15C38.509,99.265,34.339,111.151,34.339,128.534z"/>
                     <radialGradient id="SVGID_1_" cx="70.001" cy="72.6377" r="49.5787" gradientUnits="userSpaceOnUse">
                         <stop  offset="0" style={{stopColor: '#939598'}}/>
                         <stop  offset="0.1972" style={{stopColor: '#8F9194'}}/>
                         <stop  offset="0.4545" style={{stopColor: '#838587'}}/>
                         <stop  offset="0.5845" style={{stopColor: '#7B7C7F'}}/>
                         <stop  offset="1" style={{stopColor: '#696A6D'}}/>
                     </radialGradient>
                     <path fill="url(#SVGID_1_)" onMouseEnter={this.handleOpenModal} style={{cursor: this.state.isEnable? 'pointer': ""}} stroke="#BCBEC0" strokeWidth="2" strokeMiterlimit="10" d="M111.277,114.74L90.115,30.534
                     c-1.972-7.842-10.2-14.259-18.287-14.259H39.843c-8.086,0-13.091,6.417-11.119,14.259L43.956,91.15l5.525,21.985l0.404,1.604
                     C51.856,122.582,60.085,129,68.171,129h31.987C108.245,129,113.249,122.582,111.277,114.74z M42.148,41.317
                     c-0.752-2.998-0.752-2.998-0.752-2.998c1.726-1.335,9.752-2.428,17.839-2.428h3.059c8.088,0,16.663,1.093,19.061,2.428
                     c0,0,0,0,0.752,2.998c0.754,2.995,0.754,2.995,0.754,2.995c-1.727,1.336-9.751,2.429-17.84,2.429h-3.059
                     c-8.086,0-16.664-1.093-19.059-2.429C42.903,44.312,42.903,44.312,42.148,41.317z M71.065,109.384
                     c-4.436,0-10.023-1.094-12.42-2.428c0,0,0,0-0.754-2.997c-0.752-2.996-0.752-2.996-0.752-2.996c1.724-1.337,6.765-2.43,11.201-2.43
                     c4.434,0,10.022,1.093,12.42,2.43c0,0,0,0,0.752,2.996c0.754,2.997,0.754,2.997,0.754,2.997
                     C80.542,108.29,75.502,109.384,71.065,109.384z M70.72,88.503c-6.009,0-12.489-0.776-15.814-1.819
                     c-0.619-0.195-1.131-0.398-1.508-0.61c0,0,0,0-0.752-2.995c-0.117-0.465-0.213-0.847-0.297-1.179
                     c-0.455-1.811-0.457-1.817-0.457-1.817c1.723-1.336,8.969-2.429,16.102-2.429c7.131,0,14.925,1.093,17.321,2.429
                     c0,0,0,0,0.753,2.996c0.752,2.995,0.752,2.995,0.752,2.995C85.096,87.41,77.851,88.503,70.72,88.503z M70.269,67.622h-3.061
                     c-8.086,0-16.662-1.094-19.057-2.429c0,0,0,0-0.754-2.997C46.646,59.2,46.646,59.2,46.646,59.2
                     c1.725-1.335,9.75-2.428,17.838-2.428h3.06c8.085,0,16.663,1.093,19.058,2.428c0,0,0,0,0.754,2.996
                     c0.753,2.997,0.753,2.997,0.753,2.997C86.382,66.528,78.354,67.622,70.269,67.622z"/>
                 </g>
             </svg>

            <Modal
                isOpen={this.state.showModal}
                contentLabel="Info"
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
                <p>To control pedal use mouse wheel or just push the left button</p>
                <button className="ok-button" onClick={this.handleCloseModal}>Ok</button>
            </Modal>
        </div>
        )}
}

export default Pedal