import React from 'react'
import SearchList from '../../presentation/aside/list'
import getConfig from 'next/config'
import request from '../../lib/client/request'

const {publicRuntimeConfig} = getConfig()


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
      })
    })
  }

  handleChange(event) {
    this.setState({value: event.target.value})
  }

  handleSubmit(event) {
    event.preventDefault()
    this.listSearchResults(this.state.value)
  }

  render() {
    return (
      <div>
        <form
          onSubmit={this.handleSubmit}
          >
          <input type="text" value={this.state.value} onChange={this.handleChange} />
          <button type="submit">search</button>
        </form>
        <SearchList
          keywordResults={this.state.keywordResults}
          idResults={this.state.idResults}
          onSelectPlaylist={this.props.onSelectPlaylist}
          />
        <style jsx>{`
            form {
              display: flex;
            }

            form input {
              flex: 1;
            }
        `}</style>
      </div>
    );
  }
}

export default Search
