import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class PlayerControls extends React.Component {
  constructor (props) {
    super(props)
  }

  render () {
    return (
      <div className="skip control-group">
        <div className="control-item">
          <FontAwesomeIcon icon="backward"
                           color="#F9F9F9"
                           size="2x"
                           onClick={this.props.back} />
        </div>
        <div className="control-item">
          <FontAwesomeIcon icon={this.props.playing ? 'pause' : 'play'}
                           color="#F9F9F9"
                           size="2x"
                           onClick={this.props.pauseUnpause} />
        </div>
        <div className="control-item">
          <FontAwesomeIcon icon="forward"
                           color="#F9F9F9"
                           size="2x"
                           onClick={this.props.forward} />
        </div>
        <style jsx>{`
          .control-group {
            display: flex;
          }

          .control-item {
            padding: 0 10px;
          }
        `}</style>
      </div>
    )
  }
}

export default PlayerControls
