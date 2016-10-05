require('normalize.css/normalize.css');
require('styles/App.css');

import React from 'react';
import Edu from './zebooster/com/components/EduComponent';
import ContactApp from './zebooster/com/components/ContactApp'


let yeomanImage = require('../images/yeoman.png');

class AppComponent extends React.Component {
  render() {
    return (
      <div className="index">
        <img src={yeomanImage} alt="Yeoman Generator"/>
        <div className="notice">Please edit <code>src/components/Main.js</code> to get started!</div>
        <div>Edu component</div>
        <Edu/>
        <div>Contact App</div>
        <ContactApp/>
      </div>
    );
  }
}

AppComponent.defaultProps = {};

export default AppComponent;
