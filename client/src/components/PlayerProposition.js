import React from 'react'
import PropTypes from 'prop-types';

const PlayerProposition = props => {

  let elm;
  if (!props.currentPlayer) {

    return null; // Not loggedIn

  } else if (props.currentQuestion.number && !props.currentQuestion.answer && !props.currentQuestion.playerProposition) {

    // LoggedIn, question not finished and no proposition made
    let playerInput;
    elm = (
      <div className="p-3">
        <input
          onKeyPress = { e => {
            if (e.key === 'Enter') {
              props.dispatch({ propositionText: playerInput.value});
              playerInput.value = '';
            }
          }}
          type="text"
          className="form-control"
          ref={ node => {
            playerInput = node
          }}
          placeholder="Votre réponse"
        />
      </div>
    )

  } else if (props.currentQuestion.number && (props.currentQuestion.playerProposition || props.currentQuestion.answer)) {

    // Question answered or proposition made
    let feedback;
    if (props.currentQuestion.playerPropositionIsCorrect === true) {
      feedback = (
        <div className="feedback bg-success p-3">
          Bonne réponse !
          <div className="h5">+{props.currentQuestion.playerPointsWon} point{(props.currentQuestion.playerPointsWon > 1) ? 's' : ''}</div>
        </div>
      )
    } else if (props.currentQuestion.playerPropositionIsCorrect === false) {
      feedback = <div className="feedback bg-danger p-3">Mauvaise réponse !</div>
    }
    const text = (props.currentQuestion.answer && !props.currentQuestion.playerProposition) ? 'Vous n\'avez pas répondu à cette question...' : 'Votre réponse :';

    elm = (
      <div className="text-white">
        <div className="p-3">
          <div className="font-weight-light">{text}</div>
          <div className="h5 mb-0">{props.currentQuestion.playerProposition}</div>
        </div>
        {feedback}
      </div>
    )

  } else {
    elm = <div className="p-3">Attente de la prochaine partie...</div>
  }

  return (
    <div className="PlayerProposition">
      {elm}
    </div>
  )

  /* const PropositionSubmitted = () => {
    if (props.playerProposition && props.playerProposition !== '') {
      let classname = '';
      let comment = 'Vérification...';
      if (props.playerPropositionIsCorrect === true) {
        classname = 'text-success';
        comment = 'Bonne réponse !';
      } else if(props.playerPropositionIsCorrect === false) {
        classname = 'text-danger';
        comment = 'Faux, nul, zéro.';
      }

      return (
        <div className={`PropositionSubmitted ${classname} rounded shadow p-3`}>
          <div className="h5 mb-2">{this.props.playerProposition}</div>
          <div>{comment}</div>
        </div>
      );
    }
    return null;
  }

  const PlayerInput = () => {
    if (props.currentPlayer) {
      const disabled = (this.props.playerProposition || !this.props.currentQuestion.number || this.props.currentQuestion.answer);
      const placeholder = (this.props.playerProposition) ? '' : 'Tapez votre réponse ici';
      let playerInput;
      return (
        <input
          onKeyPress = { e => {
            if (e.key === 'Enter') {
              this.props.dispatch({ propositionText: playerInput.value});
              playerInput.value = '';
            }
          }}
          type="text"
          className="form-control form-control-sm"
          ref={ node => {
            playerInput = node
          }}
          disabled={disabled}
          placeholder={placeholder}
        />
      )
    } else {
      return <input type="text" placeholder="Veuillez vous connecter" className="form-control" disabled="disabled" />;
    }
  } */

}

export default PlayerProposition;