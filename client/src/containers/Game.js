import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import Question from '../components/Question'
import PlayerProposition from '../components/PlayerProposition';
import { submitProposition } from '../actions/questionActions';
import GameResults from '../components/GameResults';

class Game extends Component {
  render() {
    let game;
    if (this.props.game.isComplete) {
      game = (
        <GameResults results={this.props.game.results} />
      )
    } else {
      game = (
        <div>
          <Question
            number={this.props.currentQuestion.number}
            clubs={this.props.currentQuestion.clubs}
            answer={this.props.currentQuestion.answer}
          />
          <PlayerProposition
            currentPlayer={this.props.currentPlayer}
            currentQuestion={this.props.currentQuestion}
            dispatch={this.props.dispatch}
          />
        </div>
      )
    }

    return (
      <div>
        {game}
      </div>
    )
  }
}

Game.propTypes = {
  game: PropTypes.shape({
    isComplete: PropTypes.bool.isRequired,
    results: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number.isRequired,
      username: PropTypes.string.isRequired,
      points: PropTypes.number.isRequired
    }))
  }),
  currentQuestion: PropTypes.shape({
    number: PropTypes.number,
    clubs: PropTypes.array,
    answer: PropTypes.string,
    playerProposition: PropTypes.string,
    playerPropositionIsCorrect: PropTypes.bool,
    playerPointsWon: PropTypes.number
  }),
  currentPlayer: PropTypes.shape({
    id: PropTypes.number.isRequired,
    username: PropTypes.string.isRequired
  }),
  dispatch: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  game: state.game,
  currentPlayer: state.players.current,
  currentQuestion: state.question
})

const mapDispatchToProps = dispatch => ({
  dispatch: (proposition) => {
    dispatch(submitProposition(proposition))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Game);