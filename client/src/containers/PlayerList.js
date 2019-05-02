import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import JoinGame from '../components/JoinGame'

class PlayerList extends Component {
  render() {
    const joinGame = (!this.props.currentPlayer)
      ? <JoinGame />
      : null

    let position = 1
    let previousPoints = 1000000

    const playerItems = (this.props.players.length > 0)
      ? this.props.players
        .sort((a, b) => b.points - a.points)
        .map(p => {

          let positionElm = null
          if (position === 1) {
            positionElm = <span>1</span>
          } else if (p.points < previousPoints) {
            positionElm = <span>{position}</span>
          }

          const classname = (this.props.currentPlayer && p.id === this.props.currentPlayer.id) ? 'active' : ''
          let questionPoints = null

          if (null !== this.props.currentQuestion) {
            let i = 1
            this.props.currentQuestion.winners.forEach(w => {
              if (w.player.id === p.id) {
                questionPoints = <span className={classnames({
                  'badge': true,
                  'badge-light': true,
                  'gold': (i === 1),
                  'silver': (i === 2),
                  'bronze': (i === 3),
                })}>+{w.pointsWon}</span>
              }
              i++
            })
          }

          position++
          previousPoints = p.points
          const pointSuffix = (p.points > 1) ? 'points' : 'point'

          return (
            <tr key={p.id} className={classname}>
              <td width="1" className="pr-2">{positionElm}</td>
              <td>{p.username}</td>
              <td width="1" className="pr-2">{questionPoints}</td>
              <td width="1" className="font-italic">{p.points}&nbsp;{pointSuffix}</td>
            </tr>
          )
        })
      : <tr><td colSpan={4} className="text-white text-center font-weight-light">Aucun joueur connecté</td></tr>

    return (
      <div className="PlayerList h-100">
        {joinGame}
        <div className="p-3">
          <h6 className="pb-3 border-bottom text-center">Classement général</h6>
          <table className="pl-3 pr-3 w-100">
            <tbody>
              {playerItems}
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}

PlayerList.propTypes = {
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
    winners: PropTypes.arrayOf(
      PropTypes.shape({
        player: PropTypes.object.isRequired,
        pointsWon: PropTypes.number.isRequired
      })
    ).isRequired
  })
}

const mapStateToProps = state => ({
  players: state.players.list,
  currentPlayer: state.players.current,
  currentQuestion: (Array.isArray(state.game.questions) && state.game.questions.length > 0)
    ? state.game.questions[state.game.questions.length-1]
    : null
})

export default connect(mapStateToProps)(PlayerList)
