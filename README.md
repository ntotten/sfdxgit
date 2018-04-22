git
===

Git tools for SFDX

[![Version](https://img.shields.io/npm/v/git.svg)](https://npmjs.org/package/git)
[![CircleCI](https://circleci.com/gh/dev/git/tree/master.svg?style=shield)](https://circleci.com/gh/dev/git/tree/master)
[![Appveyor CI](https://ci.appveyor.com/api/projects/status/github/dev/git?branch=master&svg=true)](https://ci.appveyor.com/project/heroku/git/branch/master)
[![Codecov](https://codecov.io/gh/dev/git/branch/master/graph/badge.svg)](https://codecov.io/gh/dev/git)
[![Greenkeeper](https://badges.greenkeeper.io/dev/git.svg)](https://greenkeeper.io/)
[![Known Vulnerabilities](https://snyk.io/test/github/dev/git/badge.svg)](https://snyk.io/test/github/dev/git)
[![Downloads/week](https://img.shields.io/npm/dw/git.svg)](https://npmjs.org/package/git)
[![License](https://img.shields.io/npm/l/git.svg)](https://github.com/dev/git/blob/master/package.json)

<!-- toc -->
* [Debugging your plugin](#debugging-your-plugin)
<!-- tocstop -->
<!-- install -->
<!-- usage -->
```sh-session
$ npm install -g @ntotten/sfdxgit
$ git COMMAND
running command...
$ git (-v|--version|version)
git/0.0.0 darwin-x64 node-v8.9.4
$ git --help [COMMAND]
USAGE
  $ git COMMAND
...
```
<!-- usagestop -->
<!-- commands -->
* [`sfdx git:checkout]`](#git-helloorg-file)

## `sfdx git:checkout`

```
USAGE
  $ git git:checkout

OPTIONS
  -n, --name=name                                  branch to checkout
  -b , --branch                                    create a new branch?

EXAMPLES
  $ sfdx git:checkout --name mybranch --branch 
  

  $ sfdx git:checkout --name mybranch
```

## Git Branch Config
Create a file at `.sfdx/git-branch-config.json` with the following contents:

```json
{
  "master": {
    "defaultdevhubusername": "test0@example.com"
  },
  "foo":
  {
    "defaultdevhubusername": "test1@example.com"
  },
  "baz":
  {
    "defaultdevhubusername": "test-baz@example.com"
  }
}
```

_See code: [src/commands/git/checkout.ts](https://github.com/ntotten/sfdxgit/blob/v0.0.0/src/commands/git/checkout.ts)_
<!-- commandsstop -->
<!-- debugging-your-plugin -->
# Debugging your plugin
We recommend using the Visual Studio Code (VS Code) IDE for your plugin development. Included in the `.vscode` directory of this plugin is a `launch.json` config file, which allows you to attach a debugger to the node process when running your commands.

To debug the `hello:org` command: 
1. Start the inspector
  
If you linked your plugin to the sfdx cli, call your command with the `dev-suspend` switch: 
```sh-session
$ sfdx hello:org -u myOrg@example.com --dev-suspend
```
  
Alternatively, to call your command using the `bin/run` script, set the `NODE_OPTIONS` environment variable to `--inspect-brk` when starting the debugger:
```sh-session
$ NODE_OPTIONS=--inspect-brk bin/run hello:org -u myOrg@example.com
```

2. Set some breakpoints in your command code
3. Click on the Debug icon in the Activity Bar on the side of VS Code to open up the Debug view.
4. In the upper left hand corner of VS Code, verify that the "Attach to Remote" launch configuration has been chosen.
5. Hit the green play button to the left of the "Attach to Remote" launch configuration window. The debugger should now be suspended on the first line of the program. 
6. Hit the green play button at the top middle of VS Code (this play button will be to the right of the play button that you clicked in step #5).
<br><img src=".images/vscodeScreenshot.png" width="480" height="278"><br>
Congrats, you are debugging!
