const constants = require('../../shared/constants')

let io = null
const setIo = (_io) => { io = _io }

const general = (type, message) => {
  console.log(message)
  if (io) {
      io.sockets.to(constants.GENERAL_CHANNEL).emit(type, message)
  }
}

const processes = (type, message) => {
  console.log(message)
  if (io) {
      io.sockets.to(constants.PROCESSES_CHANNEL).emit(type, message)
  }
}


module.exports = {
  general,
  processes,
  setIo
}
