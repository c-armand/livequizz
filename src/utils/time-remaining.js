import gameConfig from '../config/game'

const getTimeRemaining = question => {
  let now = new Date().getTime()
  return gameConfig.answerDelay - (now - question.emitTimestamp)
}

module.exports = getTimeRemaining