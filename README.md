hacktoberfestify
================

Manage your Hacktoberfest issues!

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/hacktoberfestify.svg)](https://npmjs.org/package/hacktoberfestify)
[![Downloads/week](https://img.shields.io/npm/dw/hacktoberfestify.svg)](https://npmjs.org/package/hacktoberfestify)
[![License](https://img.shields.io/npm/l/hacktoberfestify.svg)](https://github.com/Eomm/hacktoberfestify/blob/master/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g hacktoberfestify
$ hacktoberfestify COMMAND
running command...
$ hacktoberfestify (-v|--version|version)
hacktoberfestify/0.0.0 win32-x64 node-v12.2.0
$ hacktoberfestify --help [COMMAND]
USAGE
  $ hacktoberfestify COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`hacktoberfestify add`](#hacktoberfestify-add)
* [`hacktoberfestify help [COMMAND]`](#hacktoberfestify-help-command)

## `hacktoberfestify add`

Add the hacktoberfest label!

```
USAGE
  $ hacktoberfestify add

OPTIONS
  -i, --issue=issue                    (required) issue to label

  -k, --envGithubToken=envGithubToken  [default: GITHUB_TOKEN] The ENV key where the GITHUB_TOKEN is stored or the token
                                       itself

  -l, --label=label                    [default: hacktoberfest] customize the labels added to the issues
```

_See code: [src\commands\add.js](https://github.com/Eomm/hacktoberfestify/blob/v0.0.0/src\commands\add.js)_

## `hacktoberfestify help [COMMAND]`

display help for hacktoberfestify

```
USAGE
  $ hacktoberfestify help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v3.2.0/src\commands\help.ts)_
<!-- commandsstop -->
