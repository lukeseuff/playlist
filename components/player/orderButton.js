import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class OrderButton extends React.Component {
  constructor(props) {
    super(props)
  }

  render () {
    const color = this.props.order === this.props.type ? "#FF404E" : "#F9F9F9"
    return (
      <FontAwesomeIcon icon={this.props.icon}
                       color={color}
                       size="2x"
                       onClick={this.props.handleClick} />
    )
  }
}

export default OrderButton
