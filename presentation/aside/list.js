import SearchItem from './item'

function SearchList(props) {
  return (
    <div className="search-list">
      <div className="keyword-results">
        {props.keywordResults.map((playlist) => {
          return <SearchItem
                  key={playlist.id}
                  thumbnail={playlist.thumbnail}
                  title={playlist.title}
                  channel={playlist.channel}
                  playlist={playlist.id}
                  onSelectPlaylist={props.onSelectPlaylist}
                  onSavePlaylist={props.onSavePlaylist}
                  />
        })}
      </div>
      <div className="id-results">
        {props.idResults.map((playlist) => {
          return <SearchItem
                  key={playlist.id}
                  thumbnail={playlist.thumbnail}
                  title={playlist.title}
                  channel={playlist.channel}
                  playlist={playlist.id}
                  onSelectPlaylist={props.onSelectPlaylist}
                  onSavePlaylist={props.onSavePlaylist}
                  />
        })}
      </div>
      <style jsx>{`
        .search-list {
          background-color: white;
        }
      `}</style>
    </div>
  )
}

export default SearchList
