import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addQuestion } from '../../actions/adminQuestionAction';
import classnames from 'classnames';

class QuestionAdd extends Component {

  constructor() {
    super();
    this.state = {
      question: '',
      acceptedAnswers: '',
      errors: {}
    }
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit(e) {
    e.preventDefault();
    const question = {
      question: this.state.question,
      acceptedAnswers: this.state.acceptedAnswers
    }
    this.props.addQuestion(question);
    this.setState({
      question: '',
      acceptedAnswers: '',
      errors: {}
    })
  }

  componentDidMount() {
    if (!this.props.isAuthenticated) {
      this.props.history.push('/login');
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }

  render() {
    const { errors } = this.state;
    return (
      <div className="container" style={{ marginTop: '50px', width: '700px' }}>
        <h2 style={{ marginBottom: '40px' }}>Nouvelle question</h2>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              placeholder="Question"
              className={classnames('form-control form-control-lg', {
                'is-invalid': errors.question
              })}
              name="question"
              onChange={this.handleInputChange}
              value={this.state.question}
            />
            { errors.question && (<div className="invalid-feedback">{errors.question}</div>) }
          </div>
          <div className="form-group">
            <input
              type="text"
              placeholder="Réponse"
              className={classnames('form-control form-control-lg', {
                'is-invalid': errors.acceptedAnswers
              })}
              name="acceptedAnswers"
              onChange={this.handleInputChange}
              value={this.state.acceptedAnswers}
            />
            {errors.acceptedAnswers && (<div className="invalid-feedback">{errors.acceptedAnswers}</div>)}
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-primary">
              Ajouter
            </button>
          </div>
        </form>
      </div>
    )
  }
}

QuestionAdd.propTypes = {
  addQuestion: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  isAuthenticated: PropTypes.bool.isRequired
}

const mapStateToProps = (state) => ({
  errors: state.errors,
  isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, { addQuestion })(QuestionAdd)
