import React, { Component } from 'react'
import classnames from 'classnames'
import ReactTooltip from 'react-tooltip'

class GameHeader extends Component {

  render() {

    let questions = []
    let question
    let liClass

    for (let i = 1; i < 16; i++) {
      question = this.props.questions.find(q => (
        q.number === i
      ))

      liClass = {
        current: false,
        done: false,
        correct: null
      }

      if (undefined !== question) {

        liClass.done = (this.props.questions.length > i || this.props.isComplete)
        liClass.current = (this.props.questions.length === i)

        if (question.playerPropositionIsCorrect === true) {
          liClass.correct = true
        } else if (question.playerPropositionIsCorrect === false) {
          liClass.correct = false
        }
      }

      questions.push({
        number: i,
        liClass,
        question
      })
    }

    const bricks = questions.map(q => {

      const myClassnames = {
        'question-correct': (q.liClass.correct === true),
        'question-wrong': (q.liClass.correct === false),
        'question-unanswered': (q.liClass.done === true && q.liClass.correct === null),
        'question-current': (q.liClass.current === true)
      }

      if (q.liClass.done === true) {

        let content = `<div class="question-label mb-1">Question ${q.number}</div>`
        if (q.question.playerProposition && q.question.playerPropositionIsCorrect === true) {
          content += `<div>Votre réponse</div><div class="player-proposition text-success">${q.question.playerProposition}</div>`
          content += `<div><span class="badge badge-success">+${q.question.playerPointsWon} point${(q.question.playerPointsWon > 1) ? 's' : ''}</span></div>`
        } else if (q.question.playerProposition && q.question.playerPropositionIsCorrect === false) {
          content += `<div>Votre réponse</div><div class="player-proposition text-danger">${q.question.playerProposition}</div>`
        } else {
          content += '<div class="no-answer mb-1">Vous n\'avez pas répondu</div>'
        }

        if (q.question.playerPropositionIsCorrect !== true) {
          content += `<div class="mt-1 correct-answer">La bonne réponse était<br><strong class="text-success">${q.question.answer}</strong></div>`
        }

        return (
          <li
            key={q.number}
            className={classnames(myClassnames)}
            data-tip={content}
            data-for={`tip_${q.number}`}
          >
            {q.number}
            <ReactTooltip
              place="bottom"
              html={true}
              id={`tip_${q.number}`}
              className="brick-tooltip"
            />
          </li>
        )

      } else {

        return (
          <li
            key={q.number}
            className={classnames(myClassnames)}
          >
            {q.number}
          </li>
        )
      }
      
    })

    const playerScore = (null !== this.props.currentPlayer)
      ? (
          <div className="score rounded">
            <span className="score-label pb-1 pt-1 pl-2 pr-2">Votre score</span>
            <span className="score-value pb-1 pt-1 pl-2 pr-2 text-right rounded-right">{this.props.currentPlayer.points} {this.props.currentPlayer.points > 1 ? 'points' : 'point'}</span>
          </div>
        )
      : null

    return (
      <div className="GameHeader p-3 border-bottom">
        <div className="row">
          <div className="col-sm-6">{playerScore}</div>
          <div className="col-sm-6 text-right"><span className="text-black-50 font-italic">Jeu n°14304</span></div>
        </div>
        <ul className="QuestionBricks mt-3 mb-0">
          {bricks}
        </ul>
      </div>
    )
  }
}

export default GameHeader
