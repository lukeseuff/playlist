import React from 'react'

class Video extends React.Component {
  constructor (props) {
    super(props)

    this.changeVideo = this.changeVideo.bind(this)
  }

  async loadVideoPlayer () {
    let tag = document.createElement('script')
    tag.src = "https://www.youtube.com/iframe_api"
    let firstScriptTag = document.getElementsByTagName('script')[0]
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag)

    window['onYouTubeIframeAPIReady'] = () => {
      this.setState({
        player: new YT.Player('player', {
          height: '390',
          width: '640',
          events: {
           'onStateChange': onPlayerStateChange,
           'onError': onPlayerError
          }
        })
      })
    }

    window['onPlayerError'] = (event) => {
      this.props.forward()
    }

    window['onPlayerStateChange'] = (event) => {
      // Skip to next video
      if (event.data == YT.PlayerState.ENDED) {
        this.props.forward()
      }
      if (event.data == YT.PlayerState.PAUSED && this.props.playing) {
        this.props.pause()
      }
      if (event.data == YT.PlayerState.PLAYING && !this.props.playing) {
        this.props.play()
      }
      if (event.data == YT.PlayerState.CUED) {
        this.props.play()
      }
    }
  }

  componentDidMount () {
    this.loadVideoPlayer()
  }

  componentDidUpdate(prevProps) {
    // Video changed or shuffled/ordered entire playlist
    if (this.props.playing !== prevProps.playing) {
      if (this.props.playing) {
        this.state.player.playVideo()
      } else {
        this.state.player.pauseVideo()
      }
    }
    if (this.props.currentVideo !== prevProps.currentVideo
        || (this.props.shuffled !== prevProps.shuffled
            && this.props.currentVideo === 0)) {
      this.changeVideo(this.props.currentVideo.id)
      this.state.player.playVideo()
      this.props.play()
    }
  }

  changeVideo(video) {
    this.state.player.cueVideoById(video)
  }

  render () {
    return (
      <div>
        <div id="player" />
        <style jsx>{`
          #player {
            width: 100%;
            height: 250px;
            flex: 0 0 250px;
          }
        `}</style>
      </div>
    )
  }
}

export default Video
