import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Video from './video'
import Playlist from './playlist'
import OrderControls from './orderControls'
import request from '../../lib/client/request'

const playlist = require('../../lib/client/playlist')

class Player extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      id: undefined,
      order: 'shuffled',
      videos: [],
      currentVideo: undefined,
      // TODO(luke): video player should be hauled out and work robustly
      playing: true
    }

    this.fetchPlaylist = this.fetchPlaylist.bind(this)
    this.shuffle = this.shuffle.bind(this)
    this.sort = this.sort.bind(this)
    this.reverse = this.reverse.bind(this)
    this.forward = this.forward.bind(this)
    this.back = this.back.bind(this)
    this.selectVideo = this.selectVideo.bind(this)
  }

  componentDidUpdate(prevProps) {
    if (this.props.currentPlaylist !== prevProps.currentPlaylist) {
      this.fetchPlaylist(this.props.currentPlaylist)
    }
  }

  shuffle = () => {
    if (this.state.order !== 'shuffled') {
      this.setState(playlist.shuffle(this.state))
    }
  }
  sort = () => this.setState(playlist.sort(this.state))
  reverse = () => this.setState(playlist.reverse(this.state))
  forward = () => this.setState(playlist.skipForward(this.state))
  back = () => this.setState(playlist.skipBack(this.state))
  selectVideo = (index) => this.setState(playlist.selectVideo(this.state, index))

  async fetchPlaylist(id) {
    request.playlistGet(window.location.origin, id, (videos) => {
      this.setState(playlist.load(this.state, videos, id))
    })
  }

  render() {
    let playlistContent;
    if (this.state.id === undefined) {
      playlistContent = <p className="empty-text">change playlist order by clicking on the controls above!</p>
    } else {
      playlistContent = <Playlist videos={this.state.videos}
                                  currentVideo={this.state.currentVideo}
                                  selectVideo={this.selectVideo}
                                  playlistId={this.state.id} />
    }

    return (
      <div className="player">
        <Video currentVideo={this.state.videos[this.state.currentVideo]}
               forward={this.forward} />
        <div className="controls-container">
          <div className="controls">
            <div className="skip control-group">
              <div className="control-item">
                <FontAwesomeIcon icon="backward"
                                 color="#F9F9F9"
                                 size="2x"
                                 onClick={this.back} />
              </div>
              <div className="control-item">
                <FontAwesomeIcon icon="play"
                                 color="#F9F9F9"
                                 size="2x"
                                 onClick={this.forward} />
              </div>
              <div className="control-item">
                <FontAwesomeIcon icon="forward"
                                 color="#F9F9F9"
                                 size="2x"
                                 onClick={this.forward} />
              </div>
            </div>
            <OrderControls order={this.state.order}
                           reverse={this.reverse}
                           shuffle={this.shuffle}
                           sort={this.sort} />
          </div>
        </div>
        <div className={"content-scroll playlist-container" + (this.state.id === undefined ? " empty-playlist" : "")}>
          {playlistContent}
        </div>
        <style jsx>{`
          .controls-container {
            flex: 0 0 60px;
            width: 100%;
          }

          .controls {
            display: flex;
            width: 350px;
            height: 60px;
            margin: 0 auto;
            justify-content: space-between;
            align-items: center;
          }

          .control-group {
            display: flex;
          }

          .control-item {
            padding: 0 10px;
          }

          .player {
            overflow: hidden;
            display: flex;
            flex: 1;
            flex-direction: column;
            background-color: #121420;
            height: calc(100vh - 60px);
          }

          .playlist-container {
            flex: 1 1 0;
          }

          .empty-playlist {
            display: flex;
            align-items: center;
            justify-content: center;
          }

          .empty-text {
            font-weight: 300;
          }

          .content-scroll {
            overflow: hidden;
            overflow-y: scroll;
          }

          .content-scroll::-webkit-scrollbar-track
          {
            -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0);
            background-color: rgba(0,0,0,0);
          }

          .content-scroll::-webkit-scrollbar
          {
            width: 10px;
            background-color: rgba(0,0,0,0);
          }

          .content-scroll::-webkit-scrollbar-thumb
          {
            background-color: #555;
            border: 2px solid #555;
            border-radius: 10px;
          }
        `}</style>
      </div>
    )
  }
}

export default Player
