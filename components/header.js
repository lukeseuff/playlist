import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function Header (props) {
  return (
    <header>
      <div className="button" onClick={props.onSwitchAside}>
        {props.showAside ? (
          <FontAwesomeIcon icon="chevron-left" color="#dad8de" size="lg" />
        ) : (
          <FontAwesomeIcon icon="chevron-right" color="#dad8de" size="lg" />
        )}
      </div>
      {props.loggedIn ? (
        <div className="button" onClick={props.handleLogout} className="button">
          <FontAwesomeIcon icon="sign-out-alt" color="#dad8de" size="lg" />
        </div>
      ) : (
        <div className="button" onClick={props.handleLogin} className="button">
          <FontAwesomeIcon icon="sign-in-alt" color="#dad8de" size="lg" />
        </div>
      )}
      <style jsx>{`
        header {
          position: fixed;
          height: 60px;
          width: 100%;
          top: 0;
          background-color: #121420;
          display: flex;
          justify-content: space-between;
          align-self: center;
        }

        .button {
          display: flex;
          align-items: center;
          width: 60px;
          justify-content: center;
        }

        .button:hover {
          cursor: pointer;
        }
      `}</style>
    </header>
  )
}

export default Header
