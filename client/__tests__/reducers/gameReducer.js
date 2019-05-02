import gameReducer, { initialState } from '../../src/reducers/gameReducer'
import { RECEIVE_GAME_DATA, GAME_RESULTS, INIT_GAME, NEXT_QUESTION, SUBMIT_PROPOSITION, PROPOSITION_FEEDBACK, ANSWER_FOUND, REVEAL_ANSWER } from '../../src/actions/types'

const question = {
  number: 1,
  question: 'Quelle mer se situe au nord de la Turquie ?',
  answer: null,
  winners: [],
  emitTimestamp: 1556636355859,
  timeRemaining: 5000
}

describe('game reducer', () => {
  it('has a default state', () => {
    expect(gameReducer(undefined, {})).toEqual(initialState)
  })
  it('should handle RECEIVE_GAME_DATA', () => {
    expect(gameReducer(undefined, {
      type: RECEIVE_GAME_DATA,
      payload: {
        questions: [],
        isComplete: false,
        results: []
      }
    })).toEqual({
      ...initialState,
      questions: [],
      isComplete: false,
      results: []
    })
  })
  it('should handle INIT_GAME', () => {
    expect(gameReducer(undefined, {
      type: INIT_GAME,
      payload: {
        questions: [],
        players: [],
        results: [],
        isComplete: false
      }
    })).toEqual({
      ...initialState,
      questions: [],
      isComplete: false,
      results: []
    })
  })
  it('should handle NEXT_QUESTION', () => {
    expect(gameReducer(undefined, {
      type: NEXT_QUESTION,
      payload: question
    })).toEqual({
      ...initialState,
      questions: [...initialState.questions, question]
    })
  })
  it('should handle SUBMIT_PROPOSITION', () => {
    const definedState = {
      ...initialState,
      questions: [question]
    }
    expect(gameReducer(definedState, {
      type: SUBMIT_PROPOSITION,
      payload: {
        propositionText: 'Blanc'
      }
    })).toEqual({
      ...definedState,
      questions: [{
        ...question,
        playerProposition: 'Blanc'
      }]
    })
  })
  it('should handle PROPOSITION_FEEDBACK', () => {
    const definedState = {
      ...initialState,
      questions: [question]
    }
    expect(gameReducer(definedState, {
      type: PROPOSITION_FEEDBACK,
      payload: {
        propositionText: 'Blanc',
        isValid: true,
        pointsWon: 3
      }
    })).toEqual({
      ...definedState,
      questions: [{
        ...question,
        playerProposition: 'Blanc',
        playerPropositionIsCorrect: true,
        playerPointsWon: 3
      }]
    })
  })
  it('should handle ANSWER_FOUND', () => {
    const definedState = {
      ...initialState,
      questions: [question]
    }
    const winner = {
      player: {
        id: 3,
        username: 'Carlos',
        points: 6
      },
      pointsWon: 3
    }
    expect(gameReducer(definedState, {
      type: ANSWER_FOUND,
      payload: winner
    })).toEqual({
      ...definedState,
      questions: [{
        ...question,
        winners: [winner]
      }]
    })
  })
  it('should handle REVEAL_ANSWER', () => {
    const definedState = {
      ...initialState,
      questions: [question]
    }
    expect(gameReducer(definedState, {
      type: REVEAL_ANSWER,
      payload: 'Blanc'
    })).toEqual({
      ...definedState,
      questions: [{
        ...question,
        answer: 'Blanc'
      }]
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