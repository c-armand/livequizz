import { RECEIVE_GAME_DATA, GAME_RESULTS } from './types'

export const receiveGameData = gameData => ({
  type: RECEIVE_GAME_DATA,
  payload: gameData
})

export const gameResult = players => ({
  type: GAME_RESULTS,
  payload: players
})