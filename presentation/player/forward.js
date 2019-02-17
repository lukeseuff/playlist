import React from 'react'

class ForwardButton extends React.Component {
  constructor(props) {
    super(props)

    this.handleClick = this.handleClick.bind(this)
  }

  handleClick(event) {
    event.preventDefault()
    this.props.skipForward()
  }

  render() {
    return (
      <button className="button" onClick={this.handleClick}>
        next
      </button>
    )
  }
}

export default ForwardButton
