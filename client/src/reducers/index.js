import { combineReducers } from 'redux'

import gameReducer from './gameReducer'
import playersReducer from './playersReducer'
import errorReducer from './errorReducer'
import authReducer from './authReducer'

export default combineReducers({
  game: gameReducer,
  players: playersReducer,
  errors: errorReducer,
  auth: authReducer
})
