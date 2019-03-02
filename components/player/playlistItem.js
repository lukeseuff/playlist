import React from 'react'

class PlaylistItem extends React.Component {
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick = () => {
    this.props.selectVideo(this.props.index)
  }

  render() {
    return (
      <div className={'item ' + (this.props.isCurrent ? 'current' : '')}
           onClick={this.handleClick}>
        <img src={this.props.thumbnail} />
        <p className="title">{this.props.title}</p>
        <style jsx>{`
          .item {
            display: flex;
            align-items: center;
            background-color: #191D2B;
          }
          .title {
            margin-left: 10px;
          }
          .current {
            background-color: #F9F9F9;
          }
          .current p {
            color: #06070C;
          }
          `}
        </style>
      </div>
    )
  }
}

export default PlaylistItem
