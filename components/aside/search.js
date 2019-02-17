import React from 'react'
import SearchList from '../../presentation/aside/list'
import getConfig from 'next/config'

const {publicRuntimeConfig} = getConfig()


class Search extends React.Component {
  constructor(props) {
    super(props)
    this.state = {value: '', keywordResults: [], idResults: []};

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.listSearchResults = this.listSearchResults.bind(this)
  }

  async listSearchResults(text) {
    // const searchResults = await axios.get(publicRuntimeConfig.backend + '/search?playlist=' + text)
    //
    // if (searchResults.data['keyword_result'] === undefined)
    //   searchResults.data['keyword_result'] = []
    // if (searchResults.data['id_result'] === undefined)
    //   searchResults.data['id_result'] = []
    //
    // this.setState({
    //   keywordResults: searchResults.data['keyword_result'],
    //   idResults: searchResults.data['id_result'],
    // })
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
