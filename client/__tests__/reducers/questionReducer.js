import questionReducer, { initialState } from '../../src/reducers/questionReducer'
import { RECEIVE_GAME_DATA, NEXT_QUESTION, NEXT_CLUB, ANSWER_FOUND, REVEAL_ANSWER, SUBMIT_PROPOSITION, PROPOSITION_FEEDBACK } from '../../src/actions/types'

describe('question reducer', () => {

  it('has a default state', () => {
    expect(questionReducer(undefined, {})).toEqual(initialState)
  })

  it('should handle RECEIVE_GAME_DATA', () => {
    expect(questionReducer(undefined, {
      type: RECEIVE_GAME_DATA,
      payload: {
        currentQuestion: {
          number: 1,
          clubs: ['Paris SG', 'FC Nantes'],
          answer: '',
          winners: [{ id: 1, username: 'Tom', points: 1}],
          losers: [{ id: 2, username: 'Bob', points: 0}]
        }
      }
    })).toEqual({
      ...initialState,
      number: 1,
      clubs: ['Paris SG', 'FC Nantes'],
      answer: '',
      winners: [{ id: 1, username: 'Tom', points: 1}],
      losers: [{ id: 2, username: 'Bob', points: 0}]
    })
  })

  it('should handle NEXT_QUESTION', () => {
    expect(questionReducer({
      ...initialState,
      number: 3,
      clubs: ['Paris SG', 'FC Nantes'],
      answer: 'Basile BOLI',
      winners: [{ id: 1, username: 'Tom', points: 1}],
      losers: [{ id: 2, username: 'Bob', points: 0}],
      playerProposition: 'Patrice Loko',
      playerPropositionIsCorrect: false
    }, {
      type: NEXT_QUESTION,
      payload: {
        question: {
          number: 4,
          clubs: [],
          winners: [],
          losers: [],
          answer: ''
        }
      }
    })).toEqual({
      ...initialState,
      number: 4,
      clubs: [],
      answer: '',
      winners: [],
      losers: [],
      playerProposition: null,
      playerPropositionIsCorrect: null,
      playerPointsWon: null
    })
  })

  it('should handle NEXT_CLUB', () => {
    expect(questionReducer({
      ...initialState,
      clubs: ['Paris SG']
    }, {
      type: NEXT_CLUB,
      payload: { club: 'FC Nantes' }
    })).toEqual({
      ...initialState,
      clubs: ['Paris SG', 'FC Nantes']
    })
  })

  it('should handle ANSWER_FOUND', () => {
    expect(questionReducer(undefined, {
      type: ANSWER_FOUND,
      payload: {
        player: { id: 1, username: 'Joe', points: 3 }
      }
    })).toEqual({
      ...initialState,
      winners: [{ id: 1, username: 'Joe', points: 3 }]
    })
  })

  it('should handle REVEAL_ANSWER', () => {
    expect(questionReducer(undefined, {
      type: REVEAL_ANSWER,
      payload: 'Jean-Pierre PAPIN'
    })).toEqual({
      ...initialState,
      answer: 'Jean-Pierre PAPIN'
    })
  })

  it('should handle SUBMIT_PROPOSITION', () => {
    expect(questionReducer(undefined, {
      type: SUBMIT_PROPOSITION,
      payload: { propositionText: 'Thierry Henry' }
    })).toEqual({
      ...initialState,
      playerProposition: 'Thierry Henry'
    })
  })

  it('should handle PROPOSITION_FEEDBACK', () => {
    expect(questionReducer(undefined, {
      type: PROPOSITION_FEEDBACK,
      payload: {
        propositionText: 'Thierry Henry',
        isValid: false,
        pointsWon: 0
      }
    })).toEqual({
      ...initialState,
      playerProposition: 'Thierry Henry',
      playerPropositionIsCorrect: false,
      playerPointsWon: 0
    })
  })

})