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

  for (let pageNum = 0; ; pageNum++) {

    const resp = await octokit.request('GET /users/{username}/starred', {
      username: input.username,
      per_page: perPage,
      page: pageNum,
    });

    console.log(resp)

    if (resp.data.length < perPage) {
      break;
    }

    break;
  }

  core.setOutput('is-stargazer', result)

  // // docs: https://octokit.github.io/rest.js/v18#repos-get-latest-release
  // const latest = await octokit.rest.repos.getLatestRelease({
  //   owner: 'StackExchange',
  //   repo: 'dnscontrol',
  // })
  //
  // return latest.data.tag_name.replace(/^v/, '') // strip the 'v' prefix
  //
  // core.setOutput('dnscontrol-bin', dnscontrolBinPath)
  //
  // let version
  //
  // if (input.version.toLowerCase() === 'latest') {
  //   core.debug('Requesting latest DNSControl version...')
  //   version = await getLatestDNSControlVersion(input.githubToken)
  // } else {
  //   version = input.version
  // }
  //
  // core.startGroup('💾 Install DNSControl')
  // await doInstall(version)
  // core.endGroup()
  //
  // core.startGroup('🧪 Installation check')
  // await doCheck()
  // core.endGroup()
}

// /**
//  * @param {octokit.Octokit} octokit
//  * @param {string} user
//  */
// async function isStarredBy(octokit, user) {
//   for (let page = 0; ; page++) {
//     const resp = await octokit.request('GET /repos/{owner}/{repo}/stargazers', {
//       ...github.context.repo,
//       page,
//       per_page: 100
//     });
//     if (resp.data.some(u => u.login === user)) {
//       return true;
//     }
//     if (resp.data.length < 100) {
//       break;
//     }
//   }
//   return false;
// }

// run the action
(async () => {
  await runAction()
})().catch(error => {
  core.setFailed(error.message)
})
