import * as playersActions from '../../src/actions/playersActions'
import { JOIN_GAME, REGISTERED, PLAYER_JOINED, PLAYER_DISCONNECTED, UPDATE_POINTS } from '../../src/actions/types'

const player = { id: 1, username: 'Bob', points: 0 }
const player2 = { id: 2, username: 'John', points: 2 }
const player3 = { id: 3, username: 'Maria', points: 5 }

describe('all actions', () => {
  it ('has an action joinGame', () => {
    const playerData = { username: 'GalaHad' }
    const expectedAction = {
      type: JOIN_GAME,
      payload: playerData
    }
    expect(playersActions.joinGame(playerData)).toEqual(expectedAction)
  })
  it('has an action registered', () => {
    const expectedAction = {
      type: REGISTERED,
      payload: player
    }
    expect(playersActions.registered(player)).toEqual(expectedAction)
  })
  it('has an action playerJoined', () => {
    const expectedAction = {
      type: PLAYER_JOINED,
      payload: player
    }
    expect(playersActions.playerJoined(player)).toEqual(expectedAction)
  })
  it('has an action playerDisconnected', () => {
    const expectedAction = {
      type: PLAYER_DISCONNECTED,
      payload: player
    }
    expect(playersActions.playerDisconnected(player)).toEqual(expectedAction)
  })
  it('has an action updatePoints', () => {
    const payload = { players: [player, player2, player3] }
    const expectedAction = {
      type: UPDATE_POINTS,
      payload
    }
    expect(playersActions.updatePoints(payload)).toEqual(expectedAction)
  })
})