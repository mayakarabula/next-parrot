const constants = require('../../shared/constants')

let io = null
const setIo = (_io) => { io = _io }

const error = (message) => {
  console.log(message)
  if (io) {
      io.sockets.to(constants.GENERAL_CHANNEL).emit(constants.GENERAL_ERROR, {
        error: message,
        time: Date.now()
    })
  }
}

module.exports = {
  error,
  setIo
}
