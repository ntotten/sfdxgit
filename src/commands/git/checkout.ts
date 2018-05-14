import { flags } from '@oclif/command';
import { join } from 'path';
import { SfdxCommand, core } from '@salesforce/command';
import * as fs from 'fs';
import { execSync } from 'child_process';

core.Messages.importMessagesDirectory(join(__dirname, '..', '..', '..'));
const messages = core.Messages.loadMessages('sfdx-plugin-git', 'checkout');

export default class Checkout extends SfdxCommand {
  public static description = messages.getMessage('commandDescription');

  public static examples = [
    `$ sfdx git:checkout --name mybranch --branch
  `
  ];

  public static args = [{ name: 'string', branch: 'boolean' }];

  protected static flagsConfig = {
    // flag with a value (-n, --name=VALUE)
    name: flags.string({
      char: 'n',
      description: messages.getMessage('nameFlagDescription')
    }),
    branch: flags.boolean({
      char: 'b',
      description: messages.getMessage('branchFlagDescription')
    })
  };

  // Comment this out if your command does not require an org username
  protected static requiresUsername = false;

  // Comment this out if your command does not support a hub org username
  protected static supportsDevhubUsername = false;

  // Set this to true if your command requires a project workspace; 'requiresProject' is false by default
  protected static requiresProject = true;

  public async run(): Promise<any> {
    // tslint:disable-line:no-any
    const name: string = this.flags.name || 'master';
    const branch: boolean = this.flags.branch || false;

    const sfdxConfigPath = './.sfdx/sfdx-config.json';
    const sfdxGitBranchConfigPath = './.sfdx/git-branch-config.json';

    if (!fs.existsSync(sfdxConfigPath)) {
      this.ux.error(`No config found at: ${sfdxConfigPath}`);
      return;
    }

    if (!fs.existsSync(sfdxGitBranchConfigPath)) {
      this.ux.error(`No git branch config found at: ${sfdxGitBranchConfigPath}`);
      return;
    }

    const sfdxConfigJson = fs.readFileSync(sfdxConfigPath, 'utf8');
    const sfdxGitBranchConfigJson = fs.readFileSync(sfdxGitBranchConfigPath, 'utf8');

    let sfdxConfig;
    try {
      sfdxConfig = JSON.parse(sfdxConfigJson);
    } catch (ex) {
      this.ux.error(`Invalid JSON in ${sfdxConfigPath}`);
      return;
    }

    let sfdxGitBranchConfig;
    try {
      sfdxGitBranchConfig = JSON.parse(sfdxGitBranchConfigJson);
    } catch (ex) {
      this.ux.error(`Invalid JSON in ${sfdxGitBranchConfigPath}`);
      return;
    }

    if (!sfdxGitBranchConfig[name]) {
      this.ux.warn(`No configuration information provided for branch ${branch}`);
      return;
    }

    const sfdxConfigOut = Object.assign(sfdxConfig, sfdxGitBranchConfig[name]);

    const sfdxConfigOutJson = JSON.stringify(sfdxConfigOut, null, 2);

    execSync(`git checkout ${branch ? '-b ' : ''}${name}`);

    fs.writeFileSync(sfdxConfigPath, sfdxConfigOutJson, 'utf8');

    // Return an object to be displayed with --json
    return;
  }
}
