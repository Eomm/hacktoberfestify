const { Command, flags } = require('@oclif/command')
const { Octokit } = require('@octokit/rest')
const readPkgUp = require('read-pkg-up')
const parseGitUrl = require('parse-github-url')

class AddLabelCommand extends Command {
  async run () {
    const { flags } = this.parse(AddLabelCommand)

<<<<<<< HEAD
    const url = (await readPkgUp({ normalize: false })).packageJson.repository
=======
    const url = (await readPkgUp()).packageJson.repository.url
>>>>>>> master
    const data = parseGitUrl(url)
    this.log(`Labeling ${data.repo}...`)

    const auth = process.env[flags.envGithubToken] || flags.envGithubToken
    const octokit = new Octokit({ auth })

    const issueList = flags.issue.concat(flags.range)
    if (issueList.length === 0) {
      this.error('Nothing to do')
    }

    for await (const issueLabelled of addLabels(data, issueList, flags.label)) {
      if (issueLabelled.error) {
        this.warn(`Issue ${issueLabelled.issueNumber} NOT labelled due error: ${issueLabelled.error.message}`)
      } else {
        this.log(`Issue ${issueLabelled.issueNumber} labelled`)
      }
    }

    async function * addLabels (repoData, issuesList, labels) {
      for (const issueNumber of issuesList) {
        try {
          const res = await octokit.issues.addLabels({
            owner: repoData.owner,
            repo: repoData.name,
            issue_number: issueNumber,
            labels
          })
          yield { issueNumber, response: res }
        } catch (error) {
          // quite error
          yield { issueNumber, error }
        }
      }
    }
  }
}

AddLabelCommand.description = 'Add the hacktoberfest label to any issues from your console!'

AddLabelCommand.flags = {
  issue: flags.string({
    char: 'i',
    description: 'issue to label',
    multiple: true,
    required: false,
    default: []
  }),
  range: flags.string({
    char: 'r',
    description: 'an issues\' ids range inclusuve (39-100)',
    default: [],
    parse: input => {
      if (!/^\d+-\d+$/.test(input)) {
        throw new Error(`Invalid range: ${input}`)
      }
      const nums = input.split('-').map(n => parseInt(n, 10)).sort()
      return new Array((nums[1] + 1) - nums[0]).fill(0).map((_, i) => nums[0] + i)
    }
  }),
  envGithubToken: flags.string({
    char: 'k',
    description: 'The ENV key where the GITHUB_TOKEN is stored or the token itself',
    default: 'GITHUB_TOKEN'
  }),
  label: flags.string({
    char: 'l',
    description: 'customize the labels added to the issues',
    hidden: true,
    multiple: true,
    default: ['hacktoberfest']
  })
}

module.exports = AddLabelCommand
