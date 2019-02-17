import Search from './search'

function Aside(props) {
  return (
    <aside>
      <Search onSelectPlaylist={props.onSelectPlaylist} />
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

export default Aside
