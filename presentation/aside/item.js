import React from 'react'

class SearchItem extends React.Component {
  constructor (props) {
    super(props)

    this.handleSelectPlaylist = this.handleSelectPlaylist.bind(this)
    this.handleSavePlaylist = this.handleSavePlaylist.bind(this)
  }

  handleSelectPlaylist(event) {
    event.preventDefault()
    this.props.onSelectPlaylist(this.props.playlist)
  }

  handleSavePlaylist(event) {
    event.preventDefault()
    this.props.onSavePlaylist(this.props.playlist, this.props.title)
  }

  render () {
    return (
      <div className="item">
        <div className="item-image">
          <img src={this.props.thumbnail} />
        </div>
        <div className="item-info">
          <p className="title">{this.props.title}</p>
          <p className="channel">{this.props.channel}</p>
          <div>
            <button onClick={this.handleSelectPlaylist}>play</button>
            <button onClick={this.handleSavePlaylist}>save</button>
          </div>
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
