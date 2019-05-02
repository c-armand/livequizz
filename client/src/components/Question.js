import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Question extends Component {
  constructor(props) {
    super(props)
    this.state = {
      endTime: null,
      timeRemaining: null
    }
  }

  componentDidMount() {
    this.setTimer(this.props.question.timeRemaining)
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.question.number != nextProps.question.number && nextProps.question.timeRemaining > 0 && nextProps.question.answer == null) {
      if (this.timerID !== null) clearInterval(this.timerID)
      this.setTimer(nextProps.question.timeRemaining)
    }
  }

  componentWillUnmount() {
    clearInterval(this.timerID)
  }

  tick(timeRemaining) {
    this.setState({
      ...this.state,
      timeRemaining
    })
    if (timeRemaining <= 0) {
      clearInterval(this.timerID)
    }
  }

  setTimer(timeRemaining) {
    let endTime = new Date(new Date().getTime() + timeRemaining)
    this.setState({
      ...this.state,
      endTime
    }, () => {
      this.timerID = this.startTimer()
    })
  }

  startTimer() {
    let timeRemaining = Math.round((this.state.endTime.getTime() - new Date().getTime()) / 1000)   
    this.tick(timeRemaining)

    return setInterval(() => {
      this.tick(Math.round((this.state.endTime.getTime() - new Date().getTime()) / 1000))
    }, 1000)
  }

  render() {

    let time = (this.state.timeRemaining > 0) ? this.state.timeRemaining : 0
    const countDown = (
      <div className="mt-5 countdown text-center">
        <span className="time">{time}</span>
      </div>
    )

    const title = (this.props.question.number)
      ? <h5 className="pt-5 mb-3 text-center">Question {this.props.question.number} / 15</h5>
      : <div className="pt-5 text-center">Attente de la prochaine partie...</div>

    const Answer = (props) => {
      if (props.answer) {
        return (
          <div className="Answer text-center p-4">
            <div className="mb-2">Réponse</div>
            <div className="answer-text mb-0">{props.answer}</div>
          </div>
        )
      }
      return null
    }

    return (
      <div className="Question">
        {title}
        <div className="text-center border-bottom pb-5">
          <div className="pl-3 pr-3">{this.props.question.question}</div>
          {countDown}
        </div>
        <Answer answer={this.props.question.answer} />
      </div>
    )
  }
}

Question.propTypes = {
  question: PropTypes.shape(
    {
      number: PropTypes.number,
      question: PropTypes.string,
      answer: PropTypes.string
    }
  )
}

export default Question
