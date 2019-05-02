import { takeEvery, all } from 'redux-saga/effects'
import { SUBMIT_PROPOSITION, JOIN_GAME } from '../actions/types'

const rootSaga = function* rootSaga(params) {
  const submitPropositionSaga = action => {
    params.socket.emit('submitProposition', action.payload)
  }
  const joinGameSaga = action => {
    params.socket.emit('joinGame', action.payload)
  }

  yield all([
    takeEvery(SUBMIT_PROPOSITION, submitPropositionSaga),
    takeEvery(JOIN_GAME, joinGameSaga)
  ])
}

export default rootSaga