import { JOIN_GAME, REGISTERED, PLAYER_JOINED, PLAYER_DISCONNECTED, UPDATE_POINTS } from './types'

export const joinGame = playerData => ({
  type: JOIN_GAME,
  payload: playerData
})

export const registered = player => ({
  type: REGISTERED,
  payload: player
})

export const playerJoined = player => ({
  type: PLAYER_JOINED,
  payload: player
})

export const playerDisconnected = player => ({
  type: PLAYER_DISCONNECTED,
  payload: player
})

export const updatePoints = players => ({
  type: UPDATE_POINTS,
  payload: players
})