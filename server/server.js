const app = require('express')()
const server = require('http').Server(app)
const io = require('socket.io')(server)
const next = require('next')

const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const nextApp = next({ dev })
const nextHandler = nextApp.getRequestHandler()
const processController = require('./controllers/processController')
const projectsController = require('./controllers/projectsController')
const constants = require('../shared/constants')
const errorHandler = require('./logging/errorHandler')
const messagesHandler = require('./logging/messagesHandler')

// fake DB
const messages = {
  chat1: [],
  chat2: []
}

const projects = projectsController.constructProjects()
errorHandler.setIo(io)
messagesHandler.setIo(io)

// socket.io server
io.on('connection', socket => {
  console.log('=== CONNECTED')
  socket.join(constants.PROCESSES_CHANNEL)
  socket.join(constants.GENERAL_CHANNEL)

  socket.emit(constants.PROJECTS_LIST, projects)

  processController.listProcesses()

  socket.on(constants.GET_PROJECTS, () => {
    socket.to(constants.GENERAL_CHANNEL).emit(constants.PROJECTS_LIST, projects)
  })

  socket.on(constants.START_PROCESS, data => {
    processController.prepareProcess(data)
  })

  socket.on(constants.KILL_PROCESS, id => {
    processController.killProcess(id)
  })

  socket.on(constants.RERUN_PROCESS, id => {
    console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!11', id)
    processController.rerunProcess(id)
  })

  // socket.on('message.chat1', data => {
  //   messages['chat1'].push(data)
  //   socket.broadcast.emit('message.chat1', data)
  // })

  // socket.on('message.chat2', data => {
  //   messages['chat2'].push(data)
  //   socket.broadcast.emit('message.chat2', data)
  // })

})

nextApp.prepare().then(() => {
  app.get('/messages/:chat', (req, res) => {
    res.json(messages[req.params.chat])
  })

  app.get('*', (req, res) => {
    return nextHandler(req, res)
  })

  server.listen(port, err => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)
  })
})
