import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class MenuItem extends Component {
  constructor (props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick () {
    this.props.onSelect(this.props.text.toLowerCase())
  }

  render () {
    return (
    <div className="menu-item" onClick={this.handleClick}>
        <div className="menu-item-icon">
          <FontAwesomeIcon icon={this.props.icon} color="#F9F9F9" size="lg" />
        </div>
        <div>
          <p>{this.props.text}</p>
        </div>
        <style jsx>{`
          .menu-item {
            display: flex;
            padding: 0 0 25px 20px;
            align-items: center;
            font-size: 20px;
          }

          .menu-item-icon {
            padding-right: 20px;
            width: 27px;
          }
        `}</style>
      </div>
    )
  }
}

export default MenuItem
