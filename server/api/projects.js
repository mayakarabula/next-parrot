
const attachProjectsAPI = (app, projects) => {
  app.get('/projects', function (req, res) {
    res.send('Hello World!')
  })

  app.get('/project/:projectId', function (req, res) {
    const projectId = req.params.projectId

    res.json(messages[req.params.chat])
  })

  app.put('/projects', function (req, res) {

    res.send('Hello World!')
  })
}

module.exports = {
  attachProjectsAPI
}