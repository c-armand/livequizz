import { combineReducers } from 'redux'

import gameReducer from './gameReducer'
import playersReducer from './playersReducer'
import questionReducer from './questionReducer'

export default combineReducers({
  game: gameReducer,
  players: playersReducer,
  question: questionReducer
})
