import React, { Component } from 'react';

import Rules from '../components/Rules';

class Sidebar extends Component {
  render() {
    return (
      <Rules />
    )
  }
}

export default Sidebar;

/* import React, { Component } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types'

import JoinGame from '../components/JoinGame';
import PlayerList from '../components/PlayerList';
import EventLog from '../components/EventLog';

class Sidebar extends Component {
  render() {
    const joinGame = (!this.props.currentPlayer)
      ? <JoinGame />
      : null;

    return (
      <div className="Sidebar rounded-left">
        {joinGame}
        <PlayerList
          playerList={this.props.players}
          playerCurrent={this.props.currentPlayer}
          winners={this.props.currentQuestion.winners}
        />
        <EventLog
          events={this.props.eventLog}
        />
      </div>
    )
  }
}

Sidebar.propTypes = {
  players: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      username: PropTypes.string.isRequired,
      points: PropTypes.number.isRequired
    })
  ).isRequired,
  currentPlayer: PropTypes.shape({
    id: PropTypes.number,
    username: PropTypes.string,
    points: PropTypes.number.isRequired
  }),
  currentQuestion: PropTypes.shape({
    winners: PropTypes.array.isRequired
  }),
  eventLog: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      content: PropTypes.string.isRequired
    })
  )
}

const mapStateToProps = state => ({
  players: state.players.list,
  currentPlayer: state.players.current,
  currentQuestion: state.question,
  eventLog: state.game.eventLog
});

export default connect(mapStateToProps)(Sidebar); */