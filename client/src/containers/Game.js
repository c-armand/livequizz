import React, { Component } from 'react'

import GameBoard from '../containers/GameBoard'
import Sidebar from '../containers/Sidebar'
import PlayerList from '../containers/PlayerList'

import '../App.css'
import '../../assets/favicon.ico'
import JoinGame from '../components/JoinGame';
import Rules from '../components/Rules';

class Game extends Component {
  render() {
    return (
      <div className="container h-100" style={{paddingTop: '56px'}}>
        <div className="row h-100">
          <div className="col-sm-3 d-none d-sm-block">
            <Sidebar />
          </div>
          <div className="col">
            <div className="row h-100">
              <div className="col pl-0 pr-0 pt-3 pb-3">
                <GameBoard />
              </div>
              <div className="col-4 d-none d-sm-block">
                <PlayerList />
              </div>
            </div>
            <div className="row d-block d-sm-none">
              <PlayerList />
            </div>
            <div className="row d-block d-sm-none">
              <Rules />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Game
