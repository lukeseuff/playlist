import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Video from './video'
import Playlist from './playlist'
import request from '../../lib/client/request'

const playlist = require('../../lib/client/playlist')

class Player extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      id: undefined,
      shuffled: true,
      videos: [],
      currentVideo: undefined
    }

    this.fetchPlaylist = this.fetchPlaylist.bind(this)
    this.shuffle = this.shuffle.bind(this)
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
    if (!this.state.shuffled) {
      this.setState(playlist.shuffle(this.state))
    }
  }
  sort = () => {
    if (this.state.shuffled) {
      this.setState(playlist.sort(this.state))
    }
  }
  forward = () => this.setState(playlist.skipForward(this.state))
  back = () => this.setState(playlist.skipBack(this.state))
  selectVideo = (index) => this.setState(playlist.selectVideo(this.state, index))

  async fetchPlaylist(id) {
    request.playlistGet(window.location.origin, id, (videos) => {
      this.setState(playlist.load(this.state, videos, id))
    })
  }

  render() {
    return (
      <div className="content-scroll">
        <Video currentVideo={this.state.videos[this.state.currentVideo]}
               forward={this.forward} />
        <div className="controls">
          <div className="skip control-group">
            <div className="control-item">
              <FontAwesomeIcon icon="backward"
                               color="#dad8de"
                               size="2x"
                               onClick={this.back} />
            </div>
            <div className="control-item">
              <FontAwesomeIcon icon="forward"
                               color="#dad8de"
                               size="2x"
                               onClick={this.forward} />
            </div>
          </div>
          <div className="order control-group">
            <div className="control-item">
              <FontAwesomeIcon icon="random"
                               color="#dad8de"
                               size="2x"
                               onClick={this.shuffle} />
            </div>
            <div className="control-item">
              <FontAwesomeIcon icon="long-arrow-alt-right"
                               color="#dad8de"
                               size="2x"
                               onClick={this.sort} />
            </div>
          </div>
        </div>
        <div>
          <Playlist videos={this.state.videos}
                    currentVideo={this.state.currentVideo}
                    selectVideo={this.selectVideo}
                    playlistId={this.state.id} />
        </div>
        <style jsx>{`
          .controls {
            display: flex;
            width: 250px;
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

          .content-scroll {
            overflow: hidden;
            flex: 1;
            background-color: blue;
            height: calc(100vh - 60px);
          }

          .content-scroll {
            overflow-y: scroll;
          }

          .content-scroll::-webkit-scrollbar-track
          {
            -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
            background-color: #F5F5F5;
          }

          .content-scroll::-webkit-scrollbar
          {
            width: 10px;
            background-color: #F5F5F5;
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
