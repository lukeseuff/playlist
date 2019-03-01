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
            background-color: #d3d3d3;
            border-top: solid 1px #000;
          }
          .title {
            margin-left: 10px;
          }
          .current {
            background-color: #2de697;
          }
          `}
        </style>
      </div>
    )
  }
}

export default PlaylistItem
