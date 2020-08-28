const { Command, flags } = require('@oclif/command')
const { Octokit } = require('@octokit/rest')
const readPkgUp = require('read-pkg-up')
const parseGitUrl = require('parse-github-url')

class AddLabelCommand extends Command {
  async run () {
    const { flags } = this.parse(AddLabelCommand)

    const url = (await readPkgUp({ normalize: false })).packageJson.repository
    const data = parseGitUrl(url)

    const auth = process.env[flags.envGithubToken] || flags.envGithubToken
    const octokit = new Octokit({ auth })

    for await (const issueLabelled of addLabels(data, flags.issue, flags.label)) {
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

AddLabelCommand.description = 'Add the hacktoberfest label!'

AddLabelCommand.flags = {
  issue: flags.string({
    char: 'i',
    description: 'issue to label',
    multiple: true,
    required: true
  }),
  envGithubToken: flags.string({
    char: 'k',
    description: 'The ENV key where the GITHUB_TOKEN is stored or the token itself',
    default: 'GITHUB_TOKEN'
  }),
  label: flags.string({
    char: 'l',
    description: 'customize the labels added to the issues',
    // hidden: true,
    multiple: true,
    default: ['hacktoberfest']
  })
}

module.exports = AddLabelCommand
