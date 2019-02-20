import React, { Component } from 'react'
import Header from '../components/header'
import Aside from '../components/aside/aside'
import Player from '../components/player/player'

export default class Index extends Component {
  constructor (props) {
    super(props)
    this.state = {}
    this.onSelectPlaylist = this.onSelectPlaylist.bind(this)
  }

  onSelectPlaylist(id) {
    this.setState({
      playlistId: id
    })
  }

  render() {
    return (
      <div>
        <Header />
        <div className="content">
          <Aside onSelectPlaylist={this.onSelectPlaylist} />
          <Player currentPlaylist={this.state.playlistId} />
        </div>
        <style jsx global>{`
            html, body, div, span, applet, object, iframe,
            h1, h2, h3, h4, h5, h6, p, blockquote, pre,
            a, abbr, acronym, address, big, cite, code,
            del, dfn, em, img, ins, kbd, q, s, samp,
            small, strike, strong, sub, sup, tt, var,
            b, u, i, center,
            dl, dt, dd, ol, ul, li,
            fieldset, form, label, legend,
            table, caption, tbody, tfoot, thead, tr, th, td,
            article, aside, canvas, details, embed,
            figure, figcaption, footer, header, hgroup,
            menu, nav, output, ruby, section, summary,
            time, mark, audio, video {
            	margin: 0;
            	padding: 0;
            	border: 0;
            	font-size: 100%;
            	font: inherit;
            	vertical-align: baseline;
            }
        `}</style>
        <style jsx>{`
            .content {
              display: flex;
              margin-top: 60px;
            }
        `}</style>
      </div>
    )
  }
}
