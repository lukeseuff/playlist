import React from 'react'
import App, { Container } from 'next/app'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLongArrowAltRight, faLongArrowAltLeft, faBackward, faForward, faRandom, faHeart as fasHeart, faSearch, faChevronLeft, faChevronRight, faSignInAlt, faSignOutAlt, faHandHoldingHeart, faCog, faQuestion } from '@fortawesome/free-solid-svg-icons'
import { faHeart as farHeart } from '@fortawesome/free-regular-svg-icons'

library.add(faBackward, faForward, faRandom, faLongArrowAltLeft, faLongArrowAltRight)
library.add(faChevronRight)
library.add(faChevronLeft)
library.add(faSignInAlt)
library.add(faSignOutAlt)
library.add(faHandHoldingHeart)
library.add(faCog)
library.add(faQuestion)
library.add(faSearch)
library.add(farHeart, fasHeart)

class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {}

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }

    return { pageProps }
  }

  render () {
    const { Component, pageProps } = this.props

    return (
      <Container>
        <Component {...pageProps} />
      </Container>
    )
  }
}

export default MyApp
