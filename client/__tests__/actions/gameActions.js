import mockStore from 'redux-mock-store'

import * as gameActions from '../../src/actions/gameActions'
import { RECEIVE_GAME_DATA, GAME_RESULTS } from '../../src/actions/types';

describe('all game actions', () => {
  it('has an action receiveGameData', () => {
    const gameData = {
      results: [],
      isComplete: false
    }
    const expectedAction = {
      type: RECEIVE_GAME_DATA,
      payload: gameData
    }
    expect(gameActions.receiveGameData(gameData)).toEqual(expectedAction)
  })
  it('has an action gameResults', () => {
    const results = [
      { id: 1, username: 'Joe', points: 10 },
      { id: 2, username: 'Maria', points: 7 },
      { id: 3, username: 'Bob', points: 6 }
    ]
    const expectedAction = {
      type: GAME_RESULTS,
      payload: results
    }
    expect(gameActions.gameResult(results)).toEqual(expectedAction)
  })
})
