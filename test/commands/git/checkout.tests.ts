import { expect, test } from '@salesforce/command/dist/test';

describe('git:checkout', () => {
  test
    .stdout()
    .command(['git:checkout', '--name', 'foo'])
    .it('runs git:checkout --name foo', (ctx) => {
      expect(ctx.stdout).to.contain('...');
    });
});
