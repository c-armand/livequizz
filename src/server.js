// const Joi = require('joi');
import express from 'express';
import socket from 'socket.io';
import { Observable } from 'rxjs/Observable';
import path from 'path';

// Local questions
import questions from '../schema/questions';

const app = express();

app.use(express.json());
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  next();
});
app.use((req, res, next) => {
  console.log(`${new Date().toString()} => ${req.originalUrl}`);
  next();
});

app.use(express.static(path.join(__dirname, '../client/dist')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/../client/dist/index.html'))
});

const currentGame = {
  currentQuestion: {
    number: null,
    clubs: [],
    answer: null,
    winners: [],
    losers: []
  },
  players: [],
  results: [],
  isComplete: false
};

// Start listening
const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});

// Start socket
const io = socket(server);

const createObservable = currentGame => {
  return Observable.create(observer => {
    const index = currentGame.currentQuestion.number-1;
    const clubs = questions[index].clubs;
    let i = 0;
    setInterval(() => {
      if (i < clubs.length) {
        observer.next(clubs[i]);
      } else {
        setTimeout(() => (
          observer.complete()
        ), 5000);
      }
      i++;
    }, 2000);
  });
}

const createObserver = (observable) => {
  return observable.subscribe(
    club => {
      currentGame.currentQuestion.clubs.push(club);
      io.sockets.emit('nextClub', { club });
    },
    error => console.log('error:', error),
    () => {
      const i = currentGame.currentQuestion.number-1;
      const answer = questions[i].acceptedAnswers[0];
      currentGame.currentQuestion.answer = answer;
      io.sockets.emit('answer', answer);
      setTimeout(() => {
        nextQuestion();
      }, 5000);
    }
  )
}

let observable, observer;

const nextQuestion = () => {

  io.sockets.emit('updatePoints', { players: currentGame.players });

  // Update current game
  if (!currentGame.currentQuestion) {
    currentGame.currentQuestion = {
      number: 1,
      clubs: [],
      winners: [],
      losers: []
    }
  } else if (currentGame.currentQuestion.number == 5) {

    observer.unsubscribe();
    const results = currentGame.players;
    currentGame.isComplete = true;
    currentGame.results = results;
    io.sockets.emit('gameResults', results);
    return;

  } else {
    const index = currentGame.currentQuestion.number;
    currentGame.currentQuestion = {
      number: index+1,
      clubs: [],
      winners: [],
      losers: [],
      answer: ''
    }
  }

  // Create clubs observable/observer for this new question
  observable = createObservable(currentGame);
  observer = createObserver(observable);

  // Notify all users question has changed
  io.sockets.emit('nextQuestion', {
    question: currentGame.currentQuestion,
    players: currentGame.players
  });
}

// Utils
const getCurrentQuestion = () => questions[currentGame.currentQuestion.number-1];

const verifyProposition = proposition => {
  const question = getCurrentQuestion();
  if (question.acceptedAnswers.map(a => a.toLowerCase()).indexOf(proposition.toLowerCase()) > -1) {
    return question.acceptedAnswers[0];
  }
  return false;
}

// Start game
nextQuestion();

io.on('connection', (socket) => {
  let currentPlayer = null;

  // Send current game data
  socket.emit('receiveGameData', currentGame);

  // New player join the game
  socket.on('joinGame', (player) => {
    console.log(player.username, 'joined the game');

    const lastId = (currentGame.players.length > 0) ? Math.max.apply(Math, currentGame.players.map(function(p) { return p.id; })) : 0;
    currentPlayer = player;
    currentPlayer.id = lastId+1;
    currentPlayer.points = 0;
    currentGame.players.push(currentPlayer);

    socket.emit('registered', currentPlayer);
    socket.broadcast.emit('playerJoined', currentPlayer);
  });

  // Player send a proposition
  socket.on('submitProposition', proposition => {
    if (!currentPlayer
      || currentGame.currentQuestion.winners.indexOf(currentPlayer) > -1
      || currentGame.currentQuestion.losers.indexOf(currentPlayer) > -1)
      return;

    const propositionResult = verifyProposition(proposition.propositionText);

    let feedback = {
      isValid: false,
      pointsWon: null
    }

    if (propositionResult !== false) {

      const totalWinners = currentGame.currentQuestion.winners.length;
      let pointsWon = 1;

      if (totalWinners === 0) {
        pointsWon = 3;
      } else if (totalWinners === 1) {
        pointsWon = 2;
      }

      currentPlayer.points += pointsWon;
      currentGame.currentQuestion.winners.push(currentPlayer);

      feedback.propositionText = propositionResult;
      feedback.isValid = true;
      feedback.pointsWon = pointsWon;

      io.sockets.emit('answerFound', { player: currentPlayer });

    } else {

      currentGame.currentQuestion.losers.push(currentPlayer);
      feedback.propositionText = proposition.propositionText;
    }

    socket.emit('propositionFeedback', feedback);
  });

  // Player
  socket.on('disconnect', () => {
    if (currentPlayer) {
      console.log(currentPlayer.username, ' has left the game');
      currentGame.players = currentGame.players.filter(p => p.id !== currentPlayer.id);
      io.sockets.emit('playerDisconnected', currentPlayer);
    }
  });
});


