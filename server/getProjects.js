var config = require('../parrot.json');

config.paths.forEach(
    (path) => {
        const project = require(path);
        console.log(project) 
    }
)