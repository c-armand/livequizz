import { RECEIVE_GAME_DATA, INIT_GAME, NEXT_QUESTION, SUBMIT_PROPOSITION, PROPOSITION_FEEDBACK, ANSWER_FOUND, REVEAL_ANSWER, GAME_RESULTS } from '../actions/types'

export const initialState = {
  questions: [],
  isComplete: false,
  results: [],
  eventLog: []
}

export default function(state = initialState, action) {
  switch(action.type) {
    case RECEIVE_GAME_DATA:
      return {
        ...state,
        questions: action.payload.questions,
        isComplete: action.payload.isComplete,
        results: action.payload.results
      }
    case INIT_GAME:
      return {
        ...state,
        questions: [],
        isComplete: false,
        results: []
      }
    case NEXT_QUESTION:
      return {
        ...state,
        questions: [...state.questions, action.payload]
      }
    case SUBMIT_PROPOSITION:
      var previousQuestions = state.questions.slice(0, state.questions.length-1)
      var lastQuestion = state.questions[state.questions.length-1]
      var newState = {
        ...state,
        questions: [
          ...previousQuestions,
          {
            ...lastQuestion,
            playerProposition: action.payload.propositionText
          }
        ]
      }
      return newState
    case PROPOSITION_FEEDBACK:
      var previousQuestions = state.questions.slice(0, state.questions.length-1)
      var lastQuestion = state.questions[state.questions.length-1]
      var newState = {
        ...state,
        questions: [
          ...previousQuestions,
          {
            ...lastQuestion,
            playerProposition: action.payload.propositionText,
            playerPropositionIsCorrect: action.payload.isValid,
            playerPointsWon: action.payload.pointsWon
          }
        ]
      }
      return newState
    case ANSWER_FOUND:
      var previousQuestions = state.questions.slice(0, state.questions.length-1)
      var lastQuestion = state.questions[state.questions.length-1]
      var newState = {
        ...state,
        questions: [
          ...previousQuestions,
          {
            ...lastQuestion,
            winners: [...lastQuestion.winners, action.payload]
          }
        ]
      }
      return newState
    case REVEAL_ANSWER:
      var previousQuestions = state.questions.slice(0, state.questions.length-1)
      var lastQuestion = state.questions[state.questions.length-1]
      var newState = {
        ...state,
        questions: [
          ...previousQuestions,
          {
            ...lastQuestion,
            answer: action.payload
          }
        ]
      }
      return newState
    case GAME_RESULTS:
      return {
        ...state,
        isComplete: true,
        results: action.payload
      }
    default:
      return state
  }
}

/* const addEventToLog = (state, text) => (
  [...state, {
    id: Date.now(),
    content: `${new Date().toLocaleTimeString()} : ${text}`
  }]
) */