SFDX Git Tools Plugin
===

Git tools for SFDX

<!-- toc -->
* [Debugging your plugin](#debugging-your-plugin)
<!-- tocstop -->
<!-- install -->
<!-- usage -->
```sh-session
$ npm install -g sfdx-plugin-git
$ sfdx-plugin-git COMMAND
running command...
$ sfdx-plugin-git (-v|--version|version)
sfdx-plugin-git/0.0.2 darwin-x64 node-v8.9.4
$ sfdx-plugin-git --help [COMMAND]
USAGE
  $ sfdx-plugin-git COMMAND
...
```
<!-- usagestop -->
<!-- commands -->
* [`sfdx-plugin-git git:checkout [STRING]`](#sfdx-plugin-git-gitcheckout-string)

## `sfdx-plugin-git git:checkout [STRING]`

Manages config of sfdx related to git branches

```
USAGE
  $ sfdx-plugin-git git:checkout [STRING]

OPTIONS
  -b, --branch                                    create a new branch on checkout
  -n, --name=name                                 the branch to switch
  --json                                          format output as json
  --loglevel=(trace|debug|info|warn|error|fatal)  logging level for this command invocation

EXAMPLE
  $ sfdx git:checkout --name mybranch --branch
```

_See code: [src/commands/git/checkout.ts](https://github.com/ntotten/sfdxgit/blob/v0.0.2/src/commands/git/checkout.ts)_
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
