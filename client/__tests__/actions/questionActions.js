import mockStore from 'redux-mock-store'

import * as questionActions from '../../src/actions/questionActions'
import { NEXT_QUESTION, NEXT_CLUB, ANSWER_FOUND, REVEAL_ANSWER, SUBMIT_PROPOSITION, PROPOSITION_FEEDBACK } from '../../src/actions/types';

describe('all question actions', () => {
  it('has an action nextQuestion', () => {
    const payload = {
      number: 1,
      clubs: [],
      answer: '',
      winners: [],
      losers: [],
    }
    const expectedAction = {
      type: NEXT_QUESTION,
      payload
    }
    expect(questionActions.nextQuestion(payload)).toEqual(expectedAction)
  })
  it('has an action nextClub', () => {
    const payload = { club: 'Paris SG' }
    const expectedAction = {
      type: NEXT_CLUB,
      payload
    }
    expect(questionActions.nextClub(payload)).toEqual(expectedAction)
  })
  it('has an action answerFound', () => {
    const payload = { player: { id: 1, username: 'Leo', points: 3 } }
    const expectedAction = {
      type: ANSWER_FOUND,
      payload
    }
    expect(questionActions.answerFound(payload)).toEqual(expectedAction)
  })
  it('has an action revealAnswer', () => {
    const payload = 'Patrick VIEIRA'
    const expectedAction = {
      type: REVEAL_ANSWER,
      payload
    }
    expect(questionActions.revealAnswer(payload)).toEqual(expectedAction)
  })
  it('has an action submitProposition', () => {
    const payload = { propositionText: 'Didier DESCHAMPS' }
    const expectedAction = {
      type: SUBMIT_PROPOSITION,
      payload
    }
    expect(questionActions.submitProposition(payload)).toEqual(expectedAction)
  })
  it('has an action propositionFeedback', () => {
    const payload = {
      propositionText: 'Didier DESCHAMPS',
      isValid: false,
      pointsWon: 0
    }
    const expectedAction = {
      type: PROPOSITION_FEEDBACK,
      payload
    }
    expect(questionActions.propositionFeedback(payload)).toEqual(expectedAction)
  })
})
