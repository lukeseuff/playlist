import React, { Component } from 'react'
import Search from './search'
import MenuItem from './menuItem'
import PlaylistDisplay from './playlistDisplay'
import SavedPlaylistDisplay from './savedPlaylistDisplay'

class Aside extends Component {
  constructor (props) {
    super(props)
    this.state = { menuSelection: 'bookmarked', playlists: [] }
    this.onSelectMenuItem = this.onSelectMenuItem.bind(this)
    this.displayPlaylists = this.displayPlaylists.bind(this)
  }

  onSelectMenuItem (item) {
    if (!this.props.loggedIn && item == 'bookmarked') {
      this.props.setToast('login to bookmark items')
    } else {
      this.setState({ menuSelection: item })
    }
  }

  displayPlaylists (playlists) {
    this.setState({ playlists: playlists })
  }

  render () {
    let display;

    if (this.state.menuSelection === 'search') {
      display = this.state.playlists.map((playlist) => {
        return <PlaylistDisplay {...playlist}
                                key={playlist.id}
                                onSelectPlaylist={this.props.onSelectPlaylist}
                                onSavePlaylist={this.props.onSavePlaylist}
                                setToast={this.props.setToast}
                                loggedIn={this.props.loggedIn} />
      })
    } else if (this.state.menuSelection === 'bookmarked') {
      display = this.props.savedPlaylists.map((playlist) => {
        return <SavedPlaylistDisplay {...playlist}
                                     key={playlist.id}
                                     onSelectPlaylist={this.props.onSelectPlaylist}
                                     onDeletePlaylist={this.props.onDeletePlaylist} />
      })
    }

    return (
      <aside className={'content-scroll ' + (this.props.showAside ? 'show' : 'hide')}>
        <div className="menu-list">
          <Search onSelectPlaylist={this.props.onSelectPlaylist}
                  onSavePlaylist={this.props.onSavePlaylist}
                  onSelectMenuItem={this.onSelectMenuItem}
                  displayPlaylists={this.displayPlaylists} />
          <MenuItem icon="cog"
                    text="Settings"
                    onSelect={this.onSelectMenuItem}/>
          <MenuItem icon="hand-holding-heart"
                    text="Bookmarked"
                    onSelect={this.onSelectMenuItem}/>
          <MenuItem icon="question"
                    text="About"
                    onSelect={this.onSelectMenuItem}/>
        </div>
        <div className="menu-display">
          {display}
        </div>
        {/* this.props.showSaved ? (
            <SavedList onSelectPlaylist={this.props.onSelectPlaylist}
                    onDeletePlaylist={this.props.onDeletePlaylist}
                    savedPlaylists={this.props.savedPlaylists} />
          ) : (
            <Search onSelectPlaylist={this.props.onSelectPlaylist}
                    onSavePlaylist={this.props.onSavePlaylist} />
          )
        */}

        <style jsx>{`
          @media screen and (max-width: 800px) {
            aside {
              position: absolute;
            }
          }

          aside {
            height: calc(100vh - 60px);
            background-color: #191D2B;
            box-sizing: content-box;
          }

          .menu-list {
            display: flex;
            flex-direction: column;
          }

          .menu-item {
            display: flex;
            padding: 0 0 25px 20px;
            align-items: center;
            font-size: 20px;
          }

          .menu-item-icon {
            padding-right: 20px;
            width: 27px;
          }

          .show {
            width: 300px;
            max-width: 100%;
          }

          .hide {
            width: 0;
          }

          .content-scroll {
            overflow: hidden;
            overflow-y: scroll;
          }

          .content-scroll::-webkit-scrollbar-track
          {
            -webkit-box-shadow: inset 0 0 0 rgba(0,0,0,0);
            background-color: rgba(0, 0, 0, 0);
          }

          .content-scroll::-webkit-scrollbar
          {
            width: 10px;
            background-color: rgba(0, 0, 0, 0);
          }

          .content-scroll::-webkit-scrollbar-thumb
          {
            background-color: #555;
            border: 2px solid #555;
            border-radius: 10px;
          }
        `}</style>
      </aside>
    )
  }
}

export default Aside
