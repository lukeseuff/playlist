import React, { Component } from 'react'
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'isomorphic-unfetch'
import clientCredentials from '../config/firebase/client'
import Header from '../components/header'
import Aside from '../components/aside/aside'
import Player from '../components/player/player'

export default class Index extends Component {
  constructor (props) {
    super(props)
    this.state = {
      user: this.props.user,
      value: '',
      messages: this.props.messages
    }
    this.onSelectPlaylist = this.onSelectPlaylist.bind(this)
    this.addDbListener = this.addDbListener.bind(this)
    this.removeDbListener = this.removeDbListener.bind(this)
    this.handleLogin = this.handleLogin.bind(this)
    this.handleLogout = this.handleLogout.bind(this)
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

    let unsubscribe = db.collection('messages').onSnapshot(
      querySnapshot => {
        var messages = {}
        querySnapshot.forEach(function (doc) {
          messages[doc.id] = doc.data()
        })
        if (messages) this.setState({ messages })
      },
      error => {
        console.error(error)
      }
    )
    this.setState({ unsubscribe })
  }

  removeDbListener () {
    // firebase.database().ref('messages').off()
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

  onSelectPlaylist(id) {
    this.setState({
      playlistId: id
    })
  }

  render() {
    return (
      <div>
        <Header handleLogin={this.handleLogin}
                handleLogout={this.handleLogout}
                user={this.state.user} />
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
