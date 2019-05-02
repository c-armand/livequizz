import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { joinGame } from '../actions/playersActions'

class JoinGame extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: ''
    }
    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  onChange(e) {
    this.setState({ username: e.target.value})
  }

  onSubmit(e) {
    e.preventDefault()
    this.props.dispatch({ username: this.state.username })
    this.setState({ username: '' })
  }

  render() {
    return (
      <div className="JoinGame p-3">
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <input
              type="text"
              name="username"
              placeholder="Votre nom"
              className="form-control"
              value={this.state.username}
              onChange={this.onChange}
            />
          </div>
          <div className="form-group mb-0">
            <button className="btn btn-primary btn-block shadow-sm">Jouer !</button>
          </div>
        </form>
      </div>
    )
  }
}

JoinGame.propTypes = {
  dispatch: PropTypes.func.isRequired
}

const mapDispatchToProps = dispatch => ({
  dispatch: (player) => {
    dispatch(joinGame(player))
  }
})

export default connect(() => ({}), mapDispatchToProps)(JoinGame)
