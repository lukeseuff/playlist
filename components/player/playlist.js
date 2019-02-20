import React from 'react'
import PlaylistItem from '../../presentation/player/playlistItem'

class Playlist extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        {this.props.videos.map((item, index) =>
          <PlaylistItem
          isCurrent={index === this.props.currentVideo}
          key={`${this.props.playlistId}${item.id}${item.position}`}
          position={item.position}
          id={item.id}
          thumbnail={item.thumbnail}
          title={item.title}
          index={index}
          selectVideo={this.props.selectVideo}
          />)}
      </div>
    )
  }
}

export default Playlist
