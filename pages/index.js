import { Component } from 'react'
import Link from 'next/link'
import fetch from 'isomorphic-unfetch'

class ChatOne extends Component {

  render () {
    return (
      <main>
        <div>
          <Link href={'/'}>
            <a>{'Chat One'}</a>
          </Link>
          <br />
          <Link href={'/clone'}>
            <a>{`Chat Two ${
              this.state.newMessage > 0
                ? `( ${this.state.newMessage} new message )`
                : ''
            }`}</a>
          </Link>
          
        </div>
      </main>
    )
  }
}

export default ChatOne
