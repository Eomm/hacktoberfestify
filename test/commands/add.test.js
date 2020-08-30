const { expect, test } = require('@oclif/test')

const ghMockResponse = [
  {
    id: 2307299387,
    node_id: 'XXXXXXXXXXXXXXX',
    url: 'https://api.github.com/repos/Eomm/hacktoberfestify/labels/hacktoberfest',
    name: 'hacktoberfest',
    color: 'ededed',
    default: false,
    description: null
  }
]

describe('add', () => {
  test
    .stdout()
    .command(['add'])
    .exit(2)
    .it('Nothing to do')

  test
    .nock(/api\.github\.com/, api => {
      return api
        .post(/issues\/99\/labels$/)
        .reply(200, ghMockResponse)
        .post(/issues\/404\/labels$/)
        .reply(404, 'ops')
    })
    .stdout()
    .stderr()
    .command(['add', '-i', '99', '-i', '404'])
    .it('add a label to the issue 99', ctx => {
      expect(ctx.stdout).to.include('Issue 99 labelled')
      expect(ctx.stderr).to.include('Issue 404 NOT labelled due error: ops\n')
    })

  test
    .stdout({ print: true })
    .stderr({ print: true })
    .command(['add', '-r', 'not-a-range'])
    .exit(2)
    .catch(ctx => {
      expect(ctx.message).to.include('Invalid range: not-a-range')
    })
    .it('Invalid range')

  test
    .nock(/api\.github\.com/, api => {
      return api
        .post(/issues\/.+\/labels$/)
        .times(4)
        .reply(200, ghMockResponse)
    })
    .stdout()
    .command(['add', '-r', '50-53'])
    .it('add a label to issue rnge', ctx => {
      expect(ctx.stdout).to.include(`Issue 50 labelled
Issue 51 labelled
Issue 52 labelled
Issue 53 labelled`)
    })
})
