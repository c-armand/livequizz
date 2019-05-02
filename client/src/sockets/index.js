import io from 'socket.io-client'

import { store } from '../store'
import * as gameActions from '../actions/gameActions'
import * as playersActions from '../actions/playersActions'
import * as questionActions from '../actions/questionActions'

const setupSocket = dispatch => {
  const socket = io(process.env.API_URL)

  socket.on('receiveGameData', gameData => {
    dispatch(gameActions.receiveGameData(gameData))
    const currentPlayer = store.getState().players.current
    if (currentPlayer) {
      dispatch(playersActions.joinGame(currentPlayer))
    }
  })

  socket.on('initGame', game => {
    dispatch(gameActions.initGame(game))
  })

  socket.on('registered', player => {
    dispatch(playersActions.registered(player))
  })

  socket.on('playerJoined', player => {
    dispatch(playersActions.playerJoined(player))
  })

  socket.on('invalidPlayer', errors => {
    alert(errors.username)
  })

  socket.on('playerDisconnected', player => {
    dispatch(playersActions.playerDisconnected(player))
  })

  socket.on('nextQuestion', data => {
    dispatch(questionActions.nextQuestion(data))
  })

  socket.on('propositionFeedback', result => {
    dispatch(questionActions.propositionFeedback(result))
  })

  socket.on('answerFound', player => {
    dispatch(questionActions.answerFound(player))
  })

  socket.on('answer', answer => {
    dispatch(questionActions.revealAnswer(answer))
  })

  socket.on('gameResults', players => {
    dispatch(gameActions.gameResult(players))
  })

  socket.on('updatePoints', players => {
    dispatch(playersActions.updatePoints(players))
  })

  return socket
}

export default setupSocket