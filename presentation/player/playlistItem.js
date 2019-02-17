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
        <p>{this.props.position}</p>
        <p>{this.props.id}</p>
        <p>{this.props.thumbnail}</p>
        <p>{this.props.title}</p>
        <style jsx>{`
          .item {
            background-color: #d3d3d3;
            padding: 5px;
            border-top: solid 1px #000;
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
