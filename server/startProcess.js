const { spawn }  = require('child_process')

const processes = []
const std_out = {}
const std_err = {}

module.exports = (io) => ({
    runProcess: runProcess(io)
})

const runProcess = (io) => (config) => {
    // const { task_id, project_id, type, env_params } = config
    // const project = findProject(globalConfig, project_id);
    // const { cwd, command, args } = findTaskInProject(project, type, task_id)

    const {
        env_params = {},
        command = 'ruby',
        cwd = '/home/jakub/parrot-next',
        args = ['hello.rb']
    } = config

    const env = { ...process.env, ...env_params };

    const proc = spawn(command, args, { env, cwd } );

    const procData = { pid: proc.pid, cwd, args, env_params, status: 'running' }

    console.log('proc', procData)

    io.sockets.to('processes').emit('START_PROCESS', { procData })

    proc.stdout.on('data', (data) => {
        console.log('data', data)
        io.sockets.to('processes').emit('STDOUT', { pid: proc.pid, data: data.toString(), time: Date.now() })

        if (std_out[proc.pid]) {
            std_out[proc.pid].push(data.toString())
        } else {
            std_out[proc.pid] = [data.toString()]
        }
    } );

    proc.stderr.on('data', (data) => {
        io.sockets.to('processes').emit('STDERR', { pid: proc.pid, data: data.toString(), time: Date.now() })

        if (std_err[proc.pid]) {
            std_err[proc.pid].push(data.toString())
        } else {
            std_err[proc.pid] = [data.toString()]
        }
    });

    proc.on('close', (data) => {
        io.sockets.to('processes').emit('CLOSE', { pid: proc.pid, data: `[PROCESS HAS STOPPED WITH STATUS: ${data}]`, time: Date.now() })
        // processes[proc.pid].status = `stopped, code ${code}`
    });

    // const procData = { task_id, project_id, type, pid: proc.pid, cwd, args, env_params, status: 'running' }
    processes.push(procData)

    return procData
}