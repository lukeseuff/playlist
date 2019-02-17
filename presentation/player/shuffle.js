import React from 'react'

class ShuffleButton extends React.Component {
  constructor(props) {
    super(props)
    this.state = { shuffled: true }
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick(event) {
    event.preventDefault()
    this.props.updateShuffle()
  }

  render() {
    return (
      <button onClick={this.handleClick}>
        { this.props.shuffled ? 'order' : 'shuffle' }
      </button>
    )
  }
}

export default ShuffleButton
