import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class SavedPlaylistDisplay extends React.Component {
  constructor (props) {
    super(props)
    this.state = { saved: true }
    this.handleSelectPlaylist = this.handleSelectPlaylist.bind(this)
    this.handleDeletePlaylist = this.handleDeletePlaylist.bind(this)
  }

  handleSelectPlaylist (event) {
    event.preventDefault()
    this.props.onSelectPlaylist(this.props.id)
  }

  handleDeletePlaylist (event) {
    event.preventDefault()
    this.setState({ saved: false })
    this.props.onDeletePlaylist(this.props.id)
  }

  render () {
    return (
      <div className="item">
        <div className="item-image">
          <img src={this.props.thumbnail}
               onClick={this.handleSelectPlaylist} />
        </div>
        <div className="item-info">
          <p className="title"
             onClick={this.handleSelectPlaylist}>
             {this.props.title}
          </p>
          <p className="channel"
             onClick={this.handleSelectPlaylist}>
            {this.props.channel}
          </p>
        </div>
        <div className="save">
          <FontAwesomeIcon icon={[this.state.saved ? "fas" : "far", "heart"]}
                           onClick={this.handleDeletePlaylist}
                           color="#FF404E" />
        </div>
        <style jsx>{`
          .item {
            display: flex;
            position: relative;
            height: 66px;
            margin-left: 10px;
            margin-bottom: 15px;
          }

          img {
            max-width: 88px;
          }

          img:hover {
            cursor: pointer;
          }

          .item-info {
            margin: 0 10px;
          }

          .title {
            font-size: 14px;
            overflow: hidden;
            max-height: 18px;
          }

          .title:hover {
            cursor: pointer;
          }

          .channel {
            font-size: 12px;
            margin-top: 5px;
          }

          .channel:hover {
            cursor: pointer;
          }

          .save {
            position: absolute;
            bottom: 0;
            right: 0;
            padding: 10px 20px 10px 10px;
            font-size: 24px;
          }
        `}</style>
      </div>
    )
  }
}

export default SavedPlaylistDisplay
