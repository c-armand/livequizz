import Question from './model/Question'
import gameConfig from './config/game'
import getTimeRemaining from './utils/time-remaining'

const gameManager = {
  sockets: [],
  game: {
    questions: [],
    players: [],
    results: [],
    isComplete: false
  },
  selectedQuestions: [],
  isStarted: function() {
    return (this.game.questions.length > 0)
  },
  getCurrentQuestion: function() {
    if (this.isStarted) {
      return this.game.questions[this.game.questions.length-1]
    }
  },
  initGame: function() {
    this.game.questions = [],
    this.game.players = [],
    this.game.results = [],
    this.game.isComplete = false
  },
  nextGame: function() {
    this.initGame()
    this.sockets.emit('initGame', this.game)
    Question.findRandom({}, {}, { limit: gameConfig.questionsByGame }, (err, results) => {
      if (!err) {
        this.selectedQuestions = results
        this.nextQuestion()
      } else {
        console.log('error:', err)
      }
    })
  },
  nextQuestion: function() {
    this.sockets.emit('updatePoints', { players: this.game.players })
    if (this.game.questions.length === 0) {
      // First question of the game
      this.game.questions.push({
        number: 1,
        question: this.selectedQuestions[0].question,
        answer: null,
        winners: []
      })
    } else if (this.game.questions.length < gameConfig.questionsByGame) {
      // Next question
      let i = this.game.questions.length
      this.game.questions.push({
        number: i+1,
        question: this.selectedQuestions[i].question,
        answer: null,
        winners: []
      })
    } else {
      // Game complete, show results
      const results = this.game.players
      this.game.isComplete = true
      this.game.results = results
      this.sockets.emit('gameResults', results)
      setTimeout(() => {
        // Launch new game
        this.nextGame()
      }, gameConfig.nextGameDelay)

      return
    }

    // Emit new question
    this.getCurrentQuestion().emitTimestamp = new Date().getTime()
    this.getCurrentQuestion().timeRemaining = getTimeRemaining(this.getCurrentQuestion())
    this.sockets.emit('nextQuestion', this.getCurrentQuestion())

    setTimeout(() => {
      // Emit answer
      let answer = this.selectedQuestions[this.game.questions.length-1].acceptedAnswers[0]
      this.getCurrentQuestion().answer = answer
      this.sockets.emit('answer', answer)
      // Next question
      setTimeout(() => {
        this.nextQuestion()
      }, gameConfig.nextQuestionDelay)
    }, gameConfig.answerDelay)
  }
}

module.exports = gameManager
