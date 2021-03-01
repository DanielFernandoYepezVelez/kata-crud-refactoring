import React from 'react';
import Header from './components/Header';
import Form from './components/Form';

import { Provider } from 'react-redux';
import store from './store';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Provider store={store}>
        <Header />
        <div>
          <Switch>
            <Route exact path='/' component={Form}/>
            <Route exact path='/todoUpdate/:id' component={Form}/>
          </Switch>
        </div>
      </Provider>
    </Router>
  );
}

export default App;