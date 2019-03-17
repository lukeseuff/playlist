import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class OrderButton extends React.Component {
  constructor(props) {
    super(props)

    this.handleClick = this.handleClick.bind(this)
  }

  handleClick () {
    this.props.setOrder(this.props.type)
    this.props.setToast(this.props.type)
  }

  render () {
    const color = this.props.order === this.props.type ? "#FF404E" : "#F9F9F9"
    return (
      <FontAwesomeIcon icon={this.props.icon}
                       color={color}
                       size="2x"
                       onClick={this.handleClick} />
    )
  }
}

export default OrderButton
