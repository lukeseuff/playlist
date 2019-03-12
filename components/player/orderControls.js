import React from 'react'
import OrderButton from './orderButton'


class OrderControls extends React.Component {
  constructor(props) {
    super(props)
  }

  render () {
    return (
      <div className="control-group">
        <div className="control-item">
          <OrderButton icon="long-arrow-alt-left"
                       type="reversed"
                       order={this.props.order}
                       handleClick={this.props.reverse} />
        </div>
        <div className="control-item">
          <OrderButton icon="random"
                       type="shuffled"
                       order={this.props.order}
                       handleClick={this.props.shuffle} />
        </div>
        <div className="control-item">
          <OrderButton icon="long-arrow-alt-right"
                       type="sorted"
                       order={this.props.order}
                       handleClick={this.props.sort} />
        </div>
        <style jsx>{`
          .control-group {
            display: flex;
          }

          .control-item {
            padding: 0 10px;
          }
        `}</style>
      </div>
    )
  }
}

export default OrderControls
