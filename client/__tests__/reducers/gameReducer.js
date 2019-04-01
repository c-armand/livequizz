import gameReducer, { initialState } from '../../src/reducers/gameReducer'
import { RECEIVE_GAME_DATA, GAME_RESULTS } from '../../src/actions/types'

describe('game reducer', () => {

  it('has a default state', () => {
    expect(gameReducer(undefined, {})).toEqual(initialState)
  })

  it('should handle RECEIVE_GAME_DATA', () => {
    expect(gameReducer(undefined, {
      type: RECEIVE_GAME_DATA,
      payload: {
        results: [],
        isComplete: false
      }
    })).toEqual({
      ...initialState,
      results: [],
      isComplete: false
    })
  })

  it('should handle GAME_RESULTS', () => {
    expect(gameReducer(undefined, {
      type: GAME_RESULTS,
      payload: [
        { id: 1, username: 'Leo', points: 12 },
        { id: 2, username: 'Bob', points: 10 },
        { id: 3, username: 'Maria', points: 6 }
      ]
    })).toEqual({
      ...initialState,
      results: [
        { id: 1, username: 'Leo', points: 12 },
        { id: 2, username: 'Bob', points: 10 },
        { id: 3, username: 'Maria', points: 6 }
      ],
      isComplete: true
    })
  })
})