import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import request from '../../lib/client/request'

class Search extends React.Component {
  constructor(props) {
    super(props)
    this.state = {value: '', keywordResults: [], idResults: []};

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.listSearchResults = this.listSearchResults.bind(this)
  }

  async listSearchResults(query) {
    request.playlistSearch(window.location.origin, query, (results) => {
      if (results['keyword_result'] === undefined)
        results['keyword_result'] = []
      if (results['id_result'] === undefined)
        results['id_result'] = []

      this.setState({
        keywordResults: results['keyword_result'],
        idResults: results['id_result'],
      }, () => {
        let results = this.state.keywordResults
        results.push(...this.state.idResults)
        this.props.displayPlaylists(results)
      })
    })
  }

  handleChange(event) {
    this.setState({ value: event.target.value })
  }

  handleSubmit(event) {
    event.preventDefault()
    this.listSearchResults(this.state.value)
    this.props.onSelectMenuItem('search')
  }

  render() {
    return (
      <div className="container">
        <form onSubmit={this.handleSubmit}>
          {/*<div className="icon">
            <FontAwesomeIcon icon="search" color="#dad8de" />
          </div>*/}
          <input type="text"
                 value={this.state.value}
                 onChange={this.handleChange}
                 placeholder="search" />
        </form>
        <style jsx>{`
            .container {
              width: 100%;
            }

            form {
              padding: 15px 20px 25px 20px;
            }

            input {
              width: 100%;
              padding: 5px 5px;
              margin-left: -5px;
              border: 0;
            }
        `}</style>
      </div>
    );
  }
}

export default Search
