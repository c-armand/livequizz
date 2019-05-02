import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import Question from '../components/Question'
import GameHeader from '../components/GameHeader'
import GameResults from '../components/GameResults'
import PlayerProposition from '../components/PlayerProposition'
import { submitProposition } from '../actions/questionActions'

import loader from '../../assets/loader.svg'

class GameBoard extends Component {
  render() {
    let game
    if (this.props.game.isComplete) {
      game = (
        <GameResults results={this.props.game.results} />
      )
    } else if (this.props.game.questions.length > 0) {
      game = (
        <div>
          <Question
            question={this.props.game.questions[this.props.game.questions.length-1]}
          />
          <PlayerProposition
            currentPlayer={this.props.currentPlayer}
            currentQuestion={this.props.game.questions[this.props.game.questions.length-1]}
            dispatch={this.props.dispatch}
          />
        </div>
      )
    } else {
      game = (
        <div className="text-center pt-5">
          <img src={loader} width="36" />
          <div>Attente de la prochaine partie...</div>
        </div>
      )
    }

    return (
      <div className="Game h-100 rounded shadow-sm bg-white">
        <GameHeader
          questions={this.props.game.questions}
          isComplete={this.props.game.isComplete}
          currentPlayer={this.props.currentPlayer}
        />
        {game}
      </div>
    )
  }
}

GameBoard.propTypes = {
  game: PropTypes.shape({
    questions: PropTypes.arrayOf(PropTypes.shape({
      number: PropTypes.number,
      question: PropTypes.string,
      answer: PropTypes.string
    })),
    isComplete: PropTypes.bool.isRequired,
    results: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number.isRequired,
      username: PropTypes.string.isRequired,
      points: PropTypes.number.isRequired
    }))
  }),
  currentPlayer: PropTypes.shape({
    id: PropTypes.number.isRequired,
    username: PropTypes.string.isRequired
  }),
  dispatch: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  game: state.game,
  currentPlayer: state.players.current
})

const mapDispatchToProps = dispatch => ({
  dispatch: (proposition) => {
    dispatch(submitProposition(proposition))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(GameBoard)