import React, { Component } from 'react'

class PlayerInput extends Component {
  constructor(props) {
    super(props)
    this.state = {
      playerProposition: ''
    }
    this.handleInputChange = this.handleInputChange.bind(this)
  }

  componentDidMount() {
    this.playerInput.focus()
  }

  handleInputChange(e) {
    this.setState({
        playerProposition: e.target.value
    })
  }

  render() {
    return (
      <input
        onKeyPress = { e => {
          if (e.key === 'Enter') {
            this.props.dispatch({ propositionText: this.state.playerProposition })
            this.setState({ playerProposition: '' })
          }
        }}
        type="text"
        className="form-control"
        onChange={ this.handleInputChange }
        value={ this.state.playerProposition }
        placeholder="Votre réponse"
        ref={(input) => { this.playerInput = input }}
      />
    )
  }
}

export default PlayerInput
