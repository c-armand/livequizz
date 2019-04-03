import React, { Component } from 'react'
import { Provider } from 'react-redux'
// import { PersistGate } from 'redux-persist/integration/react'

import './App.css'
import '../assets/favicon.ico'

import { store, persistor } from './store/index'
import Game from './containers/Game'
import Sidebar from './containers/Sidebar'

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        {/* <PersistGate loading={null} persistor={persistor}> */}
          <div className="wrap">
            <header className="App-header">
              <h3 className="mb-3">Football Quizz</h3>
            </header>
            <div className="App">
              <div className="App-game rounded shadow">
                <Sidebar />
                <Game />
              </div>
            </div>
          </div>
          {/* </PersistGate> */}
      </Provider>
    );
  }
}

export default App;
