import React from 'react'

class SavedItem extends React.Component {
  constructor (props) {
    super(props)

    this.handleSelectPlaylist = this.handleSelectPlaylist.bind(this)
    this.handleDeleteItem = this.handleDeleteItem.bind(this)
  }

  handleSelectPlaylist(event) {
    event.preventDefault()
    this.props.onSelectPlaylist(this.props.playlist)
  }

  handleDeleteItem(event) {
    event.preventDefault()
    this.props.onDeletePlaylist(this.props.playlist)
  }

  render () {
    return (
      <div className="item">
        <div className="item-image">
          {/*<img src={this.props.thumbnail} />*/}
        </div>
        <div className="item-info">
          <p className="title">{this.props.title}</p>
          {/*<p className="channel">{this.props.channel}</p>*/}
          <div>
            <button onClick={this.handleSelectPlaylist}>play</button>
            <button onClick={this.handleDeleteItem}>delete</button>
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

export default SavedItem
