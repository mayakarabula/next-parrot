const isEqual = require('lodash/isEqual')
const intersection = require('lodash/intersection')

const verifyDefinedTask = (task, config) => {
    const { env_params = {}, command, cwd } = config
    
    if (env_params) {
        const validEnv =  isEqual(
             intersection(Object.keys(env_params), task.fields),
             Object.keys(env_params)
         )
         if (!validEnv) {
             return false
         }
     }
    if (command && task.command !== command) {
        return false
    }
    if (cwd && task.cwd !== cwd) {
        return false
    }

    return true
}

exports.default = verifyDefinedTask
