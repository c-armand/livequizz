import { RECEIVE_GAME_DATA, GAME_RESULTS } from '../actions/types'

export const initialState = {
  results: [],
  isComplete: false,
  eventLog: []
}

export default function(state = initialState, action) {
  switch(action.type) {
    case RECEIVE_GAME_DATA:
      return {
        ...state,
        results: action.payload.results,
        isComplete: action.payload.isComplete
      }
    case GAME_RESULTS:
      return {
        ...state,
        results: action.payload,
        isComplete: true
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