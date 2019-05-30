import App, { Container } from 'next/app'
import React from 'react'
import { Provider } from 'react-redux'
import withReduxStore from '../lib/with-redux-store'
import { MuiThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import PageWrapper from '../src/PageWrapper';
import Head from 'next/head';
import JssProvider from 'react-jss/lib/JssProvider';
import getPageContext from '../src/getPageContext';
import SocketIOWrapper from '../src/wrappers/sockets/socketIOWrapper'
import KeyboardListenerWrapper from '../src/wrappers/keyboardListenerWrapper'

class MyApp extends App {
  static async getInitialProps ({ Component, ctx }) {
    let pageProps = {}

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }

    return { pageProps }
  }

  constructor() {
    super();
    this.pageContext = getPageContext();
  }

  render () {
    const { Component, pageProps, reduxStore } = this.props

    return (
      <Provider store={reduxStore}>
        <Container>
          <Head>
            <title>My page</title>
          </Head>
          <JssProvider
            registry={this.pageContext.sheetsRegistry}
            generateClassName={this.pageContext.generateClassName}
          >
            <MuiThemeProvider
              theme={this.pageContext.theme}
              sheetsManager={this.pageContext.sheetsManager}
            >
              {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
              <CssBaseline />
              {/* Pass pageContext to the _document though the renderPage enhancer
                  to render collected styles on server-side. */}
              <KeyboardListenerWrapper>
                <SocketIOWrapper>
                  <PageWrapper>
                    <Component pageContext={this.pageContext} {...pageProps} />
                  </PageWrapper>
                </SocketIOWrapper>
              </KeyboardListenerWrapper>
            </MuiThemeProvider>
          </JssProvider>
        </Container>
      </Provider>
    )
  }
}

export default withReduxStore(MyApp)
