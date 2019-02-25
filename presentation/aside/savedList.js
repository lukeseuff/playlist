import SavedItem from './savedItem'

function SearchList(props) {
  return (
    <div className="saved-list">
      {props.savedPlaylists.map((playlist) => {
        return <SavedItem
                key={playlist.id}
                title={playlist.title}
                playlist={playlist.id}
                onSelectPlaylist={props.onSelectPlaylist}
                onDeletePlaylist={props.onDeletePlaylist}
                />
      })}
      <style jsx>{`

      `}</style>
    </div>
  )
}

export default SearchList
