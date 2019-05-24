import React from 'react';

class KeyboardListenerWrapper extends React.Component {
  componentDidMount() {
    document.onkeydown = function(evt) {
      evt = evt || window.event;
      if (evt.keyCode === 27) { // Escape
        document.activeElement.blur()
      }
      if (evt.keyCode === 72) { // h
      }
      if (evt.keyCode === 74) { // j
      }
      if (evt.keyCode === 75) { // k
      }
      if (evt.keyCode === 76) { // l
      }
    }
  }

  render () {
    return (this.props.children)
  }
}

export default KeyboardListenerWrapper
