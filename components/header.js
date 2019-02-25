function Header (props) {
  return (
    <header>
      <div className="switchAside">
        <button onClick={props.onSwitchAside}>show/hide saved</button>
      </div>
      <div className="login">
        {props.user ? (
          <button onClick={props.handleLogout}>logout</button>
        ) : (
          <button onClick={props.handleLogin}>login</button>
        )}
      </div>
      <style jsx>{`
        header {
          position: fixed;
          height: 60px;
          width: 100%;
          top: 0;
          background-color: black;
        }

        .login {
          float: right;
        }

        .switchAside {
          float: left;
        }
      `}</style>
    </header>
  )
}

export default Header
