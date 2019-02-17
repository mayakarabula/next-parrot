var config = require('../parrot.json');

const constructProjects = () => {
  const projects = []

  config.paths.forEach(
      (path) => {
          const project = require(path);
          projects.push(project)
      }
  )

  return projects
}

module.exports = {
  constructProjects
}
