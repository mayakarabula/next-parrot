import { Component } from 'react'
import Link from 'next/link'
import fetch from 'isomorphic-unfetch'

class ChatOne extends Component {
  // fetch old messages data from the server
  static async getInitialProps ({ req }) {
    const response = await fetch('http://localhost:3000/messages/chat1')
    const messages = await response.json()
    return { messages }
  }

  static defaultProps = {
    messages: []
  }

  // init state with the prefetched messages
  state = {
    field: '',
    newMessage: 0,
    messages: this.props.messages,
    subscribe: false,
    subscribed: false
  }

  subscribe = () => {
    if (this.state.subscribe && !this.state.subscribed) {
      // connect to WS server and listen event
      this.props.socket.on('STDOUT', this.handleMessage)
      this.props.socket.on('STDERR', this.handleMessage)
      this.props.socket.on('START_PROCESS', this.handleMessage)
      this.setState({ subscribed: true })
    }
  }
  componentDidMount () {
    this.subscribe()
  }

  componentDidUpdate () {
    this.subscribe()
  }

  static getDerivedStateFromProps (props, state) {
    if (props.socket && !state.subscribe) return { subscribe: true }
    return null
  }

  // close socket connection
  componentWillUnmount () {
    this.props.socket.off('STDOUT', this.handleMessage)
    this.props.socket.off('STDERR', this.handleMessage)
    this.props.socket.off('START_PROCESS', this.handleMessage)
  }

  // add messages from server to the state
  handleMessage = message => {
    console.log(message)
   // this.setState(state => ({ messages: state.messages.concat(message) }))
  }

  handleOtherMessage = () => {
    t//his.setState(prevState => ({ newMessage: prevState.newMessage + 1 }))
  }

  handleChange = event => {
    this.setState({ field: event.target.value })
  }

  // send messages to server and add them to the state
  handleSubmit = event => {
    event.preventDefault()

    // create message object
    // const message = {
    //   id: new Date().getTime(),
    //   value: this.state.field
    // }

    // send object to WS server
    this.props.socket.emit('START', {})

    // add it to state and clean current input value
    // this.setState(state => ({
    //   field: '',
    //   messages: state.messages.concat(message)
    // }))
  }

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
          <ul>
            {this.state.messages.map(message => (
              <li key={message.id}>{message.value}</li>
            ))}
          </ul>
          <form onSubmit={e => this.handleSubmit(e)}>
            <input
              onChange={this.handleChange}
              type='text'
              placeholder='Hello world!'
              value={this.state.field}
            />
            <button>Send</button>
          </form>
        </div>
      </main>
    )
  }
}

export default ChatOne
