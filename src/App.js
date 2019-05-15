import React, { Component } from 'react';
import './App.css';
import {BrowserRouter} from 'react-router-dom';
import routes from './routes'
import {Provider} from 'react-redux'
import store from './ducks/store'

class App extends Component {
  render() {
    return (
      <Provider store={store}> 
        <BrowserRouter>
          <div className="App">
            {routes}
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
