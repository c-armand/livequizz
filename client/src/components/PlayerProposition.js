import React, { Component } from 'react'
import PropTypes from 'prop-types';

import PlayerInput from './PlayerInput';

class PlayerProposition extends Component {
  
  render() {

    let elm;
    if (!this.props.currentPlayer) {

      return null; // Not loggedIn

    } else if (this.props.currentQuestion.number && !this.props.currentQuestion.answer && !this.props.currentQuestion.playerProposition) {

      // LoggedIn, question not finished and no proposition made
      elm = (
        <div className="p-3">
          <PlayerInput dispatch={this.props.dispatch} />
        </div>
      )

    } else if (this.props.currentQuestion.number && (this.props.currentQuestion.playerProposition || this.props.currentQuestion.answer)) {

      // Question answered or proposition made
      let feedback;
      if (this.props.currentQuestion.playerPropositionIsCorrect === true) {
        feedback = (
          <div className="feedback success p-3">
            Bonne réponse !
            <div className="h5">+{this.props.currentQuestion.playerPointsWon} point{(this.props.currentQuestion.playerPointsWon > 1) ? 's' : ''}</div>
          </div>
        )
      } else if (this.props.currentQuestion.playerPropositionIsCorrect === false) {
        feedback = <div className="feedback failure p-3">Mauvaise réponse !</div>
      }
      const text = (this.props.currentQuestion.answer && !this.props.currentQuestion.playerProposition) ? 'Vous n\'avez pas répondu à cette question...' : 'Votre réponse :';

      elm = (
        <div className="text-white">
          {feedback}
          <div className="p-3">
            <div className="font-weight-light">{text}</div>
            <div className="h5 mb-0">{this.props.currentQuestion.playerProposition}</div>
          </div>
        </div>
      )

    } else {
      elm = <div className="p-3">Attente de la prochaine partie...</div>
    }

    return (
      <div className="PlayerProposition rounded-bottom">
        {elm}
      </div>
    )
  }
}

PlayerProposition.propTypes = {
  currentPlayer: PropTypes.shape({
    id: PropTypes.number,
    username: PropTypes.string,
    points: PropTypes.number
  }),
  currentQuestion: PropTypes.shape({
    number: PropTypes.number,
    question: PropTypes.string,
    answer: PropTypes.string
  }),
  dispatch: PropTypes.func
}

export default PlayerProposition;