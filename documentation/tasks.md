# Task

## Defined
Example of config for defined task
```
{
    "id": "easy mode",
    "name": "easy mode",
    "env_params": {
        "fields": ["a"]
    },
    "command": "ruby",
    "cwd": "/home/jakub/parrot-next/parrot-next",
    "args": ["hello.rb"]
}
```
Parameters
* `id` is used internally by server to run a task (String)
* `name` is used in application to identify a task (String)
* `env_params` allows JSON Schema Form format that will utalised to generate a form in application. The data passed is then used by server to setup environment for the command, eg. `PORT: 3000`
* `command` is used to specify what program should be executed (String)
* `cwd` specifies where the program should start (String)
* `args` specifies what arguments are passed to the command (array of Strings)

## Quick

## Queue