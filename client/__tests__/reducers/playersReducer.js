import playersReducer, { initialState } from '../../src/reducers/playersReducer'
import { RECEIVE_GAME_DATA, REGISTERED, PLAYER_JOINED, PLAYER_DISCONNECTED, UPDATE_POINTS, INIT_GAME, PROPOSITION_FEEDBACK } from '../../src/actions/types'

const players = [
  { id: 1, username: 'Leo', points: 5 },
  { id: 2, username: 'Bob', points: 3 },
  { id: 3, username: 'Maria', points: 2 }
]

describe('players reducer', () => {

  it('has a default state', () => {
    expect(playersReducer(undefined, {})).toEqual(initialState)
  })

  it('should handle RECEIVE_GAME_DATA', () => {
    expect(playersReducer(undefined, {
      type: RECEIVE_GAME_DATA,
      payload: { players }
    })).toEqual({
      ...initialState,
      list: players
    })
  })

  it('should handle INIT_GAME', () => {
    expect(playersReducer(undefined, {
      type: INIT_GAME,
      payload: { players }
    })).toEqual({
      ...initialState,
      list: players
    })
  })

  it('should handle REGISTERED', () => {
    expect(playersReducer(undefined, {
      type: REGISTERED,
      payload: { id: 1, username: 'Alex', points: 0 }
    })).toEqual({
      ...initialState,
      list: [{ id: 1, username: 'Alex', points: 0 }],
      current: { id: 1, username: 'Alex', points: 0 }
    })
  })

  it('should handle PLAYER_JOINED', () => {
    expect(playersReducer(undefined, {
      type: PLAYER_JOINED,
      payload: { id: 1, username: 'Jack', points: 0 }
    })).toEqual({
      ...initialState,
      list: [{ id: 1, username: 'Jack', points: 0 }]
    })
  })

  it('should handle PLAYER_DISCONNECTED', () => {
    expect(playersReducer({
      ...initialState,
      list: [{ id: 1, username: 'Jack', points: 0 }]
    }, {
      type: PLAYER_DISCONNECTED,
      payload: { id: 1, username: 'Jack', points: 0 }
    })).toEqual({
      ...initialState,
      list: []
    })
  })

  it('should handle PROPOSITION_FEEDBACK', () => {
    expect(playersReducer({
      ...initialState,
      current: {
        id: 3,
        username: 'Carlos',
        points: 0
      }
    }, {
      type: PROPOSITION_FEEDBACK,
      payload: { pointsWon: 4 }
    })).toEqual({
      ...initialState,
      current: {
        id: 3,
        username: 'Carlos',
        points: 4
      }
    })
  })

  it('should handle UPDATE_POINTS', () => {
    expect(playersReducer({
      ...initialState,
      list: [
        { id: 1, username: 'Jack', points: 3 },
        { id: 2, username: 'Paul', points: 1 },
        { id: 3, username: 'Aldo', points: 0 }
      ]
    }, {
      type: UPDATE_POINTS,
      payload: {
        players: [
          { id: 1, username: 'Jack', points: 5 },
          { id: 2, username: 'Paul', points: 2 },
          { id: 3, username: 'Aldo', points: 0 }
        ]
      }
    })).toEqual({
      ...initialState,
      list: [
        { id: 1, username: 'Jack', points: 5 },
        { id: 2, username: 'Paul', points: 2 },
        { id: 3, username: 'Aldo', points: 0 }
      ]
    })
  })

})