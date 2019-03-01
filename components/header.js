import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function Header (props) {
  return (
    <header>
      <div>
        <button onClick={props.onSwitchAside}>
          {props.showAside ? (
            <FontAwesomeIcon icon="chevron-left" color="#dad8de" size="lg" />
          ) : (
            <FontAwesomeIcon icon="chevron-right" color="#dad8de" size="lg" />
          )}
        </button>
      </div>
      <div>
        {props.loggedIn ? (
          <button onClick={props.handleLogout}>
            <FontAwesomeIcon icon="sign-out-alt" color="#dad8de" size="lg" />
          </button>
        ) : (
          <button onClick={props.handleLogin}>
            <FontAwesomeIcon icon="sign-in-alt" color="#dad8de" size="lg" />
          </button>
        )}
      </div>
      <style jsx>{`
        header {
          position: fixed;
          height: 60px;
          width: 100%;
          top: 0;
          background-color: #0f0e11;
          display: flex;
          justify-content: space-between;
          align-self: center;
        }

        button {
          padding: 0;
          margin: 0;
          border: 0;
          width: 60px;
          height: 100%;
          background-color: rgba(0, 0, 0, 0);
        }

        button:hover {
          cursor: pointer;
        }

        button:focus {
          outline: none;
        }
      `}</style>
    </header>
  )
}

export default Header
