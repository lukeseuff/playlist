import React from 'react'

class SearchItem extends React.Component {
  constructor (props) {
    super(props)

    this.handleClick = this.handleClick.bind(this)
  }

  handleClick(event) {
    event.preventDefault()
    this.props.onSelectPlaylist(this.props.playlist)
  }

  render () {
    return (
      <div className="item" onClick={this.handleClick}>
        <div className="item-image">
          <img src={this.props.thumbnail} />
        </div>
        <div className="item-info">
          <p className="title">{this.props.title}</p>
          <p className="channel">{this.props.channel}</p>
        </div>
        <style jsx>{`
          .item {
            display: flex;
          }

          img {
            max-width: 100px;
            display: block;
          }

          .item-info {
            margin: 2px 4px;
          }

          .title {
            margin-bottom: 8px;
            font-size: 14px;
          }

          .channel {
            font-size: 12px;
          }
        `}</style>
      </div>
    )
  }
}

export default SearchItem
