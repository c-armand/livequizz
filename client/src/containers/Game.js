import React, { Component } from 'react'

import GameBoard from '../containers/GameBoard'
import Sidebar from '../containers/Sidebar'
import PlayerList from '../containers/PlayerList'

import '../App.css'
import '../../assets/favicon.ico'

class Game extends Component {
  render() {
    return (
      <div className="container h-100" style={{paddingTop: '56px'}}>
        <div className="row h-100">
          <div className="col-sm-3">
            <Sidebar />
          </div>
          <div className="col-sm-9">
            <div className="row h-100">
              <div className="col-sm-8 pl-0 pr-0 pt-3 pb-3">
                <GameBoard />
              </div>
              <div className="col-sm-4">
                <PlayerList />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Game
