import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import jwt_decode from 'jwt-decode'

import { store } from './store/index'
import Navbar from './components/Navbar'
import Register from './components/Register'
import Login from './components/Login'
import Game from './containers/Game'
import QuestionAdd from './components/admin/QuestionAdd'

import setAuthToken from './utils/setAuthToken'
import { setCurrentUser, logoutUser } from './actions/authenticationAction'

if (localStorage.jwtToken) {
  setAuthToken(localStorage.jwtToken)
  const decoded = jwt_decode(localStorage.jwtToken)
  store.dispatch(setCurrentUser(decoded))

  const currentTime = Date.now() / 1000
  if (decoded.exp < currentTime) {
    store.dispatch(logoutUser())
    window.location.href = '/login'
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="h-100">
            <Navbar />
            <Route exact path="/" component={ Game } />
            <div className="container">
              <Route exact path="/register" component={ Register } />
              <Route exact path="/login" component={ Login } />
              <Route exact path="/admin/questions/add" component={ QuestionAdd } />
            </div>
          </div>
        </Router>
      </Provider>
    )
  }
}

export default App
