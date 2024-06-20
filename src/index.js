const core = require('@actions/core') // docs: https://github.com/actions/toolkit/tree/main/packages/core
const github = require('@actions/github') // docs: https://github.com/actions/toolkit/tree/main/packages/github

// read action inputs
const input = {
  githubToken: core.getInput('github-token', {required: true}),
  username: core.getInput('username', {required: true}), // eg. octocat
  repository: core.getInput('repository', {required: true}), // eg. octocat/Hello-World
}

// main action entrypoint
async function runAction() {
  const octokit = github.getOctokit(input.githubToken)

  const perPage = 100
  let result = false

  core.startGroup('⭐ Fetching stargazer...')

  for (let pageNum = 0; ; pageNum++) {
    core.info(`🐇 Request stargazer page #${pageNum}...`)

    const resp = await octokit.request('GET /users/{username}/starred', {
      username: input.username,
      per_page: perPage,
      page: pageNum,
    })

    core.info(`${resp.data.length} repositories found in the response`)

    if (resp.data.some(repo => repo.full_name.toLowerCase() === input.repository.toLowerCase())) {
      result = true

      break
    }

    if (resp.data.length < perPage) {
      break
    }
  }

  core.endGroup()
  core.info((result ? '✅' : '❌') + ' The star was' + (result ? ' ' : ' not ') + 'found')
  core.setOutput('is-stargazer', result)
}

// run the action
(async () => {
  await runAction()
})().catch(error => {
  core.setFailed(error.message)
})
