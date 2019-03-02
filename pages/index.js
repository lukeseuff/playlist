import React, { Component } from 'react'
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'isomorphic-unfetch'
import Header from '../components/header'
import Aside from '../components/aside/aside'
import Player from '../components/player/player'

var clientCredentials

try {
  clientCredentials = require('../config/firebase/client')
} catch(err) {
  clientCredentials = JSON.parse(process.env.FIREBASE_CLIENT_CREDENTIALS)
}

export default class Index extends Component {
  constructor (props) {
    super(props)
    this.state = {
      user: this.props.user,
      playlists: this.props.playlists || {},
      showAside: true
    }

    this.onSelectPlaylist = this.onSelectPlaylist.bind(this)
    this.addDbListener = this.addDbListener.bind(this)
    this.removeDbListener = this.removeDbListener.bind(this)
    this.handleLogin = this.handleLogin.bind(this)
    this.handleLogout = this.handleLogout.bind(this)
    this.onSavePlaylist = this.onSavePlaylist.bind(this)
    this.onDeletePlaylist = this.onDeletePlaylist.bind(this)
    this.onSwitchAside = this.onSwitchAside.bind(this)
  }

  componentDidMount() {
    firebase.initializeApp(clientCredentials)

    if (this.state.user) this.addDbListener()

    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({ user: user })
        return user
          .getIdToken()
          .then(token => {
            // eslint-disable-next-line no-undef
            return fetch(`${window.location.origin}/api/login`, {
              method: 'POST',
              // eslint-disable-next-line no-undef
              headers: new Headers({ 'Content-Type': 'application/json' }),
              credentials: 'same-origin',
              body: JSON.stringify({ token })
            })
          })
          .then(res => this.addDbListener())
      } else {
        this.setState({ user: null })
        // eslint-disable-next-line no-undef
        fetch(`${window.location.origin}/api/logout`, {
          method: 'POST',
          credentials: 'same-origin'
        }).then(() => this.removeDbListener())
      }
    })
  }

  addDbListener() {
    var db = firebase.firestore()

    let unsubscribe = db.collection(`profile/${this.state.user.uid}/playlists`).onSnapshot(
      querySnapshot => {
        var playlists = {}
        querySnapshot.forEach(function (doc) {
          playlists[doc.id] = doc.data()
        })
        if (playlists) this.setState({ playlists })
      },
      error => {
        console.error(error)
      }
    )
    this.setState({ unsubscribe })
  }

  removeDbListener () {
    if (this.state.unsubscribe) {
      this.state.unsubscribe()
    }
  }

  handleLogin () {
    firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider())
  }

  handleLogout () {
    firebase.auth().signOut()
  }

  onSelectPlaylist (id) {
    this.setState({
      playlistId: id
    })
  }

  onDeletePlaylist (playlistId) {
    var db = firebase.firestore()

    if (this.state.user) {
      db.collection(`profile/${this.state.user.uid}/playlists`)
        .doc(playlistId)
        .delete()
    }
  }

  onSavePlaylist (playlistId, title, channel, thumbnail) {
    var db = firebase.firestore()

    if (this.state.user) {
      db.collection(`profile/${this.state.user.uid}/playlists`)
        .doc(playlistId)
        .set({
          title: title,
          channel: channel,
          thumbnail: thumbnail
        })
    }
  }

  onSwitchAside () {
    this.setState({ showAside: !this.state.showAside })
  }

  render() {
    return (
      <div>
        <Header handleLogin={this.handleLogin}
                handleLogout={this.handleLogout}
                loggedIn={this.state.user !== null}
                onSwitchAside={this.onSwitchAside}
                showAside={this.state.showAside} />
        <div className="content">
          <Aside onSelectPlaylist={this.onSelectPlaylist}
                 onSavePlaylist={this.onSavePlaylist}
                 onDeletePlaylist={this.onDeletePlaylist}
                 savedPlaylists={Object.keys(this.state.playlists).map((id) => {
                   return Object.assign({id: id}, this.state.playlists[id])
                 })}
                 showAside={this.state.showAside} />
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
              color: #F9F9F9;
              font-family: 'Noto Sans', 'sans-serif';
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
