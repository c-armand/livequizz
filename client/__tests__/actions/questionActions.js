import mockStore from 'redux-mock-store'

import * as questionActions from '../../src/actions/questionActions'
import { NEXT_QUESTION, ANSWER_FOUND, REVEAL_ANSWER, SUBMIT_PROPOSITION, PROPOSITION_FEEDBACK } from '../../src/actions/types';

describe('all question actions', () => {
  it('has an action nextQuestion', () => {
    const payload = {
      number: 1,
      question: 'Quelle est la couleur du cheval blanc d\'Henri IV ?',
      answer: null,
      winners: []
    }
    const expectedAction = {
      type: NEXT_QUESTION,
      payload
    }
    expect(questionActions.nextQuestion(payload)).toEqual(expectedAction)
  })
  it('has an action answerFound', () => {
    const payload = { player: { id: 1, username: 'Leo', points: 3 }, pointsWon: 3 }
    const expectedAction = {
      type: ANSWER_FOUND,
      payload
    }
    expect(questionActions.answerFound(payload)).toEqual(expectedAction)
  })
  it('has an action revealAnswer', () => {
    const payload = 'Blanc'
    const expectedAction = {
      type: REVEAL_ANSWER,
      payload
    }
    expect(questionActions.revealAnswer(payload)).toEqual(expectedAction)
  })
  it('has an action submitProposition', () => {
    const payload = { propositionText: 'Rouge' }
    const expectedAction = {
      type: SUBMIT_PROPOSITION,
      payload
    }
    expect(questionActions.submitProposition(payload)).toEqual(expectedAction)
  })
  it('has an action propositionFeedback', () => {
    const payload = {
      propositionText: 'Blanc',
      isValid: true,
      pointsWon: 4
    }
    const expectedAction = {
      type: PROPOSITION_FEEDBACK,
      payload
    }
    expect(questionActions.propositionFeedback(payload)).toEqual(expectedAction)
  })
})
