const isEqual = require('lodash/isEqual')
const intersection = require('lodash/intersection')

const verifyQuickTask = (task, config) => {
    const { env_params, command, cwd, args } = config

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
    if (args && args !== task.args) {
        return false
    }
    if (cwd && task.cwd !== cwd) {
        return false
    }

    return true
}

exports.default = verifyQuickTask
