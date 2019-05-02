import express from 'express'
import passport from 'passport'

import Question from '../model/Question'
import validateQuestionInput from '../validation/question'
require('../passport')(passport)

const router = express.Router()

router.post('/add', passport.authenticate('jwt', { session: false }), function(req, res) {

  var token = getToken(req.headers)

  if (token) {
    const { errors, isValid } = validateQuestionInput(req.body)
    if (!isValid) {
      return res.status(400).json(errors)
    }

    const answersArray = req.body.acceptedAnswers.split('|')
    const newQuestion = new Question({
      question: req.body.question,
      acceptedAnswers: answersArray
    })
    
    newQuestion.save().then(question => {
      res.json(question)
      console.log('question added')
    })

  } else {

    return res.status(403).send({success: false, msg: 'Unauthorized.'})
  }
})

const getToken = function (headers) {
  if (headers && headers.authorization) {
    var parted = headers.authorization.split(' ')
    if (parted.length === 2) {
      return parted[1]
    } else {
      return null
    }
  } else {
    return null
  }
}

module.exports = router