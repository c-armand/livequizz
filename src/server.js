// const Joi = require('joi');
import express from 'express';
import socket from 'socket.io';
// import { Observable } from 'rxjs/Observable';
import path from 'path';
import config from './db';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import passport from 'passport';

import userRoutes from './routes/user'; 
import questionRoutes from './routes/question'; 
import Question from './model/Question';
import validatePlayer from './validation/player';

mongoose.connect(config.DB, { useNewUrlParser: true }).then(
  () => {console.log('Database is connected') },
  err => { console.log('Can not connect to the database'+ err)}
);

require('dotenv').config()

const app = express();

// app.use(express.json());
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,authorization');
  next();
});
app.use((req, res, next) => {
  console.log(`${new Date().toString()} => ${req.originalUrl}`);
  next();
});

app.use(passport.initialize());
require('./passport')(passport);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/api/users', userRoutes);
app.use('/api/questions', questionRoutes);

/*const index_path = (process.env.NODE_ENV == 'development') ? '../client/dist' : '../client/dist';

app.use(express.static(path.join(__dirname, index_path)));
app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, `${index_path}/index.html`));
});*/

/*app.use(express.static(path.join(__dirname, '../client/dist')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/../client/dist/index.html'))
});*/

let currentGame = {
  questions: [],
  players: [],
  results: [],
  isComplete: false
}
let currentQuestions;

const questionsByGame = 15;
const answerDelay = 18000; // 15 sec before showing the answer
const nextQuestionDelay = 5000; // 10 sec before next question
const nextGameDelay = 30000; // 10 sec before next question

// Start listening
const port = process.env.PORT || 3001;
const server = app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});

// Start socket
const io = socket(server);

const nextGame = () => {

  // Reinit game data
  reinitGameData();
  io.sockets.emit('initGame', currentGame)

  Question.findRandom({}, {}, { limit: questionsByGame }, function(err, results) {
    if (!err) {
      currentQuestions = results;
      nextQuestion();
    } else {
      console.log('error:', err)
    }
  });
}

const nextQuestion = () => {

  io.sockets.emit('updatePoints', { players: currentGame.players });

  if (currentGame.questions.length === 0) {
    // First question of the game
    currentGame.questions.push({
      number: 1,
      question: currentQuestions[0].question,
      answer: null,
      winners: []
    });

  } else if (currentGame.questions.length < questionsByGame) {
    // Next question
    let i = currentGame.questions.length;
    currentGame.questions.push({
      number: i+1,
      question: currentQuestions[i].question,
      answer: null,
      winners: []
    });

  } else {
    // Game complete, show results
    const results = currentGame.players;
    currentGame.isComplete = true;
    currentGame.results = results;
    io.sockets.emit('gameResults', results);

    setTimeout(() => {
      // Launch new game
      nextGame();
    }, nextGameDelay)

    return;
  }

  // Emit new question

  currentGame.questions[currentGame.questions.length-1].emitTimestamp = new Date().getTime();
  currentGame.questions[currentGame.questions.length-1].timeRemaining = getTimeRemaining(currentGame.questions[currentGame.questions.length-1]);
  io.sockets.emit('nextQuestion', currentGame.questions[currentGame.questions.length-1]);

  setTimeout(() => {
    // Emit answer
    let answer = currentQuestions[currentGame.questions.length-1].acceptedAnswers[0];
    currentGame.questions[currentGame.questions.length-1].answer = answer;
    io.sockets.emit('answer', answer);
    // Next question
    setTimeout(() => {
      nextQuestion()
    }, nextQuestionDelay)
  }, answerDelay)
}

const reinitGameData = () => {
  currentGame.isComplete = false
  currentGame.questions = []
  currentGame.results = []
  currentGame.players.forEach(p => {
    p.points = 0
  })
}

nextGame();

const verifyProposition = proposition => {
  console.log(accentFold(proposition.toLowerCase()))
  const question = getCurrentQuestion();
  for (let acceptedAnswer of question.acceptedAnswers) {
    // Set in lower case, accents folded
    if (accentFold(proposition.toLowerCase()).indexOf(accentFold(acceptedAnswer.toLowerCase())) > -1) {
      return question.acceptedAnswers[0];
    }
  }

  return false;
}

const getTimeRemaining = (question) => {
  let now = new Date().getTime();
  return answerDelay - (now - question.emitTimestamp);
}

const getCurrentQuestion = () => currentQuestions[currentGame.questions.length-1];

const accentMap = {
  'á': 'a',
  'à': 'a',
  'â': 'a',
  'ä': 'a',
  'ã': 'a',
  'é': 'e',
  'è': 'e',
  'ê': 'e',
  'ë': 'e',  
  'í': 'i',
  'ï': 'i',
  'î': 'i',
  'ó': 'o',
  'ô': 'o',
  'ö': 'o',
  'õ': 'o',
  'ú': 'u',
  'û': 'u',
  'ü': 'u',
  'ç': 'c',
  'œ': 'oe'
}

const accentFold = string => {
  if (!string) { return '' }
  let ret = '';
  for (let i = 0; i < string.length; i++) {
    ret += accentMap[string.charAt(i)] || string.charAt(i);
  }
  return ret;
}


io.on('connection', (socket) => {
  let currentPlayer = null;

  if (currentGame.questions.length > 0) {
    currentGame.questions[currentGame.questions.length-1].timeRemaining = getTimeRemaining(currentGame.questions[currentGame.questions.length-1]);
  }

  // Send current game data
  socket.emit('receiveGameData', currentGame);

  // New player join the game
  socket.on('joinGame', (player) => {

    const { errors, isValid } = validatePlayer(player, currentGame.players);

    if (!isValid) {
      socket.emit('invalidPlayer', errors);
      return;
    }

    console.log(player.username, 'joined the game');

    const lastId = (currentGame.players.length > 0) ? Math.max.apply(Math, currentGame.players.map(function(p) { return p.id; })) : 0;
    currentPlayer = player;
    currentPlayer.id = lastId+1;
    currentPlayer.points = 0;
    currentGame.players.push(currentPlayer);

    socket.emit('registered', currentPlayer);
    socket.broadcast.emit('playerJoined', currentPlayer);
  });

  // Player
  socket.on('disconnect', () => {
    if (currentPlayer) {
      console.log(currentPlayer.username, ' has left the game');
      currentGame.players = currentGame.players.filter(p => p.id !== currentPlayer.id);
      io.sockets.emit('playerDisconnected', currentPlayer);
    }
  });

  socket.on('submitProposition', proposition => {
    if (!currentPlayer || currentGame.questions[currentGame.questions.length-1].winners.indexOf(currentPlayer) > -1)
      return;

    const propositionResult = verifyProposition(proposition.propositionText);

    let feedback = {
      isValid: false,
      pointsWon: 0
    }

    if (propositionResult !== false) {
      const totalWinners = currentGame.questions[currentGame.questions.length-1].winners.length;
      let pointsWon = 1;

      if (totalWinners === 0) {
        pointsWon += 3;
      } else if (totalWinners === 1) {
        pointsWon += 2;
      } else if (totalWinners === 2) {
        pointsWon += 1;
      }

      currentPlayer.points += pointsWon;

      const winner = {
        player: currentPlayer,
        pointsWon
      }

      currentGame.questions[currentGame.questions.length-1].winners.push(winner);

      feedback.propositionText = propositionResult;
      feedback.isValid = true;
      feedback.pointsWon = pointsWon;

      io.sockets.emit('answerFound', winner);

    } else {

      feedback.propositionText = proposition.propositionText;
    }

    socket.emit('propositionFeedback', feedback);
  });
});
