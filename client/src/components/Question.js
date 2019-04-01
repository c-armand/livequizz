import React from 'react'
import PropTypes from 'prop-types';

const Question = props => {
  const title = (props.number)
    ? <h5 className="mb-4 text-white">Question {props.number} / 10</h5>
    : <div>Attente de la prochaine partie...</div>;

  const clubs = (props.number)
    ? props.clubs.map((c, index) => (<li key={index} className="rounded shadow mb-1 p-2">{c}</li>))
    : null;

  const Answer = (props) => {
    if (props.answer) {
      return (
        <div className="Answer rounded shadow p-3">
          <div className="mb-2">La bonne réponse était</div>
          <div className="h5 mb-0">{props.answer.toUpperCase()}</div>
        </div>
      );
    }
    return null;
  }

  return (
    <div className="Question">
      {title}
      <ul className="mb-4">
        {clubs}
      </ul>
      <Answer answer={props.answer} />
    </div>
  )
}

Question.propTypes = {
  number: PropTypes.number,
  clubs: PropTypes.array,
  answer: PropTypes.string
}

export default Question;
