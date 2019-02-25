import React, { Component } from 'react'
import Search from './search'
import SavedList from '../../presentation/aside/savedList'

class Aside extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    return (
      <aside>
        { this.props.showSaved ? (
            <SavedList onSelectPlaylist={this.props.onSelectPlaylist}
                    onDeletePlaylist={this.props.onDeletePlaylist}
                    savedPlaylists={this.props.savedPlaylists} />
          ) : (
            <Search onSelectPlaylist={this.props.onSelectPlaylist}
                    onSavePlaylist={this.props.onSavePlaylist} />
          )
        }

        <style jsx>{`
          aside {
            width: 280px;
            height: calc(100vh - 60px);
            background-color: red;
            box-sizing: content-box;
          }
        `}</style>
      </aside>
    )
  }
}

export default Aside
