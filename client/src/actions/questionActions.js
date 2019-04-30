import { NEXT_QUESTION, ANSWER_FOUND, REVEAL_ANSWER, SUBMIT_PROPOSITION, PROPOSITION_FEEDBACK } from './types'

export const nextQuestion = data => ({
  type: NEXT_QUESTION,
  payload: data
})

export const answerFound = player => ({
  type: ANSWER_FOUND,
  payload: player
})

export const revealAnswer = answer => ({
  type: REVEAL_ANSWER,
  payload: answer
})

export const submitProposition = proposition => ({
  type: SUBMIT_PROPOSITION,
  payload: proposition
})

export const propositionFeedback = result => ({
  type: PROPOSITION_FEEDBACK,
  payload: result
})