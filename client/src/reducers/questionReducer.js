import { RECEIVE_GAME_DATA, NEXT_QUESTION, NEXT_CLUB, ANSWER_FOUND, REVEAL_ANSWER, SUBMIT_PROPOSITION, PROPOSITION_FEEDBACK } from '../actions/types'

export const initialState = {
  number: null,
  clubs: [],
  answer: '',
  winners: [],
  losers: [],
  playerProposition: null,
  playerPropositionIsCorrect: null,
  playerPointsWon: null
}

export default function(state = initialState, action) {
  switch(action.type) {
    case RECEIVE_GAME_DATA:
      return {
        ...state,
        number: action.payload.currentQuestion.number,
        clubs: action.payload.currentQuestion.clubs,
        answer: action.payload.currentQuestion.answer,
        winners: action.payload.currentQuestion.winners,
        losers: action.payload.currentQuestion.losers
      }
    case NEXT_QUESTION:
      return {
        ...state,
        ...action.payload.question,
        playerProposition: null,
        playerPropositionIsCorrect: null,
        playerPointsWon: null
        // eventLog: addEventToLog(state.eventLog, 'Question suivante !')
      }
    case NEXT_CLUB:
      return {
        ...state,
        clubs: [...state.clubs, action.payload.club]
      }
    case ANSWER_FOUND:
      return {
        ...state,
        winners: [...state.winners, action.payload.player]
      }
    case REVEAL_ANSWER:
      return {
        ...state,
        answer: action.payload
        // eventLog: addEventToLog(state.eventLog, `La bonne réponse était ${action.payload}`)
      }
    case SUBMIT_PROPOSITION:
      return {
        ...state,
        playerProposition: action.payload.propositionText
      }
    case PROPOSITION_FEEDBACK:
      return {
        ...state,
        playerProposition: action.payload.propositionText,
        playerPropositionIsCorrect: action.payload.isValid,
        playerPointsWon: action.payload.pointsWon
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