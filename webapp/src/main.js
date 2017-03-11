import React from 'react';
import {render} from 'react-dom';
import {Router, Route, hashHistory} from 'react-router';

import ZEBoosterApp from './components/ZEBoosterApp.jsx';
import FocusGroupPage from './components/pages/focusGroupPage.jsx';

render((
        <Router history={hashHistory}>
            <Route path="/" component={ZEBoosterApp}/>
            <Route path="/focusGroup" component={FocusGroupPage}/>
        </Router>
    ), document.getElementById('content')
);