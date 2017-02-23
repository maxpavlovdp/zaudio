import React from 'react';
import {render} from 'react-dom';
import {Router, Route, hashHistory} from 'react-router';

import ZEBoosterApp from './components/ZEBoosterApp.jsx';
import FocusGroupPage from './components/pages/focusGroupPage.jsx';

import {Provider} from 'react-redux';
import {createStore} from 'redux';


const initialState = [
    "some state value 1",
    "some state value 2"
]
function reduceFunc(state = initialState, action) {
    return state;
}
const store = createStore(reduceFunc)

render((
        <Provider store={store}>
            <Router history={hashHistory}>
                <Route path="/" component={ZEBoosterApp}/>
                <Route path="/focusGroup" component={FocusGroupPage}/>
            </Router>
        </Provider>
    ), document.getElementById('content')
);