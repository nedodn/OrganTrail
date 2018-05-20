import React from 'react';
import ReactDOM from 'react-dom';

import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux'
import reduxThunk from 'redux-thunk';

import { Switch, Route, Router } from 'react-router';
import createBrowserHistory from 'history/createBrowserHistory';

import reducers from './reducers';

import Home from './pages/Home';
import Hospital from './pages/Hospital';
import Delivery from './pages/Delivery';
import Truck from './pages/Truck';
import Recipient from './pages/Recipient';

// CSS font
import '../node_modules/font-awesome/css/font-awesome.min.css';
// CSS ref
import '../node_modules/materialize-css/dist/css/materialize.css';
import 'react-transitions/dist/animations.css';

const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
const history = createBrowserHistory()

ReactDOM.render(
    <Provider store={createStoreWithMiddleware(reducers)}>
        <Router history={history}>

        <Switch>

            <Route exact path='/' component={ Home } />
            
            <Route exact path='/hospital' component={ Hospital } />
            <Route exact path='/truck' component={ Truck } />
            <Route exact path='/delivery' component={ Delivery } />
            <Route exact path='/recipient' component={ Recipient } />
            
        </Switch>

        </Router>
    </Provider>
  ,document.getElementById('root')
);
