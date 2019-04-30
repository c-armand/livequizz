import { RECEIVE_GAME_DATA, INIT_GAME, REGISTERED, PLAYER_JOINED, PLAYER_DISCONNECTED, PROPOSITION_FEEDBACK, UPDATE_POINTS } from '../actions/types'

export const initialState = {
  list: [],
  current: null,
}

export default function(state = initialState, action) {
  switch(action.type) {
    case RECEIVE_GAME_DATA:
      return {
        ...state,
        list: action.payload.players
      }
    case INIT_GAME:
      let newState = { ...state }
      if (state.current !== null) {
        newState.current.points = 0
      }
      newState.list = action.payload.players
      return newState
    case REGISTERED:
      return {
        ...state,
        list: [...state.list, action.payload],
        current: action.payload
        // eventLog: addEventToLog(state.eventLog, 'Vous avez rejoint la partie')
      }
    case PLAYER_JOINED:
      return {
        ...state,
        list: [...state.list, action.payload]
        // eventLog: addEventToLog(state.eventLog, `${action.payload.username} a rejoint la partie`)
      }
    case PLAYER_DISCONNECTED:
      return {
        ...state,
        list: [...state.list.filter(p => p.id !== action.payload.id)]
        // eventLog: addEventToLog(state.eventLog, `${action.payload.username} a quitté la partie`)
      }
    case PROPOSITION_FEEDBACK:
      return {
        ...state,
        current: {
          ...state.current,
          points: state.current.points + action.payload.pointsWon
        }
      }
    case UPDATE_POINTS:
      return {
        ...state,
        list: action.payload.players
      }
    default:
      return state
  }
}

const addEventToLog = (state, text) => (
  [...state, {
    id: Date.now(),
    content: `${new Date().toLocaleTimeString()} : ${text}`
  }]
)