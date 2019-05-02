import Validator from 'validator'
import isEmpty from './is-empty'

const validateQuestionInput = (data) => {
  let errors = {}
  data.question = !isEmpty(data.question) ? data.question : ''
  data.acceptedAnswers = !isEmpty(data.acceptedAnswers) ? data.acceptedAnswers : ''

  if (Validator.isEmpty(data.question)) {
    errors.question = 'Question is required'
  }

  if (Validator.isEmpty(data.acceptedAnswers)) {
    errors.acceptedAnswers = 'Answer is required'
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}

module.exports = validateQuestionInput
