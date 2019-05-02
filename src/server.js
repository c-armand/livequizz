import express from 'express'
import socket from 'socket.io'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import passport from 'passport'

import dbConfig from './config/db'
import gameManager from './game'
import userRoutes from './routes/user'
import questionRoutes from './routes/question'
import validatePlayer from './validation/player'
import verifyProposition from './utils/verify-proposition'
import getTimeRemaining from './utils/time-remaining'
require('dotenv').config()

const app = express()

// Database connection
mongoose.connect(dbConfig.host, { useNewUrlParser: true }).then(
  () => {console.log('Database is connected') },
  err => { console.log('Can not connect to the database'+ err)}
)

// CORS + Auth Token
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080')
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,authorization')
  next()
})

// Log activity
app.use((req, res, next) => {
  console.log(`${new Date().toString()} => ${req.originalUrl}`)
  next()
})

app.use(passport.initialize())
require('./passport')(passport)

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/api/users', userRoutes)
app.use('/api/questions', questionRoutes)

// Start listening
const port = process.env.PORT || 3001
const server = app.listen(port, () => {
  console.log(`Listening on port ${port}...`)
})

// Start socket
const io = socket(server)

// Start game
gameManager.sockets = io.sockets
gameManager.nextGame()

io.on('connection', socket => {
  let currentPlayer = null

  if (gameManager.isStarted()) {
    gameManager.getCurrentQuestion().timeRemaining = getTimeRemaining(gameManager.getCurrentQuestion())
  }

  // Send game data with up-to-date current question timer
  socket.emit('receiveGameData', gameManager.game)

  // New player join the game
  socket.on('joinGame', player => {

    const { errors, isValid } = validatePlayer(player, gameManager.game.players)

    if (!isValid) {
      socket.emit('invalidPlayer', errors)
      return
    }

    console.log(player.username, 'joined the game')

    const lastId = (gameManager.game.players.length > 0) ? Math.max.apply(Math, gameManager.game.players.map(function(p) { return p.id })) : 0
    currentPlayer = player
    currentPlayer.id = lastId+1
    currentPlayer.points = 0
    gameManager.game.players.push(currentPlayer)

    socket.emit('registered', currentPlayer)
    socket.broadcast.emit('playerJoined', currentPlayer)
  })

  // Player left the game
  socket.on('disconnect', () => {
    if (currentPlayer) {
      console.log(currentPlayer.username, ' has left the game')
      gameManager.game.players = gameManager.game.players.filter(p => p.id !== currentPlayer.id)
      io.sockets.emit('playerDisconnected', currentPlayer)
    }
  })

  socket.on('submitProposition', proposition => {
    if (!currentPlayer || gameManager.getCurrentQuestion().winners.indexOf(currentPlayer) > -1) {
      return
    }

    // todo: improve
    const propositionResult = verifyProposition(proposition.propositionText, gameManager.selectedQuestions[gameManager.game.questions.length-1].acceptedAnswers)

    let feedback = {
      isValid: false,
      pointsWon: 0
    }

    if (propositionResult !== false) {
      const totalWinners = gameManager.getCurrentQuestion().winners.length
      let pointsWon = 1

      if (totalWinners === 0) {
        pointsWon += 3
      } else if (totalWinners === 1) {
        pointsWon += 2
      } else if (totalWinners === 2) {
        pointsWon += 1
      }

      currentPlayer.points += pointsWon
      const winner = {
        player: currentPlayer,
        pointsWon
      }
      gameManager.getCurrentQuestion().winners.push(winner)

      feedback.propositionText = propositionResult
      feedback.isValid = true
      feedback.pointsWon = pointsWon

      io.sockets.emit('answerFound', winner)

    } else {
      feedback.propositionText = proposition.propositionText
    }

    socket.emit('propositionFeedback', feedback)
  })
})
