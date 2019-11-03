import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

// NOTE(Luke): This is going to change in the future
class PlaylistList extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        <div className="item-image">
          <img src={this.props.thumbnail} />
        </div>
        <div className="item-info">
          <p className="title">{this.props.title}</p>
          <p className="channel">{this.props.channel}</p>
        </div>
      </div>
    );
  }
}

export default PlaylistList
