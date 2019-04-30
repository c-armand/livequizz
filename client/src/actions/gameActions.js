import { RECEIVE_GAME_DATA, GAME_RESULTS, INIT_GAME } from './types'

export const receiveGameData = gameData => ({
  type: RECEIVE_GAME_DATA,
  payload: gameData
})

export const initGame = (game) => ({
  type: INIT_GAME,
  payload: game
})

export const gameResult = players => ({
  type: GAME_RESULTS,
  payload: players
})