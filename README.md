<p align="center">
  <img src="https://user-images.githubusercontent.com/7326800/198824913-32caf179-f739-4a8c-b9f1-f1826e19531d.png" alt="Logo" width="150" />
</p>

# Is the user stargazer?

![Release version][badge_release_version]
[![Build Status][badge_build]][link_build]
[![License][badge_license]][link_license]

This action checks if the user is a stargazer (starred a repo or not). It can be run on **Linux** (`ubuntu-latest`),
**Windows** (`windows-latest`) or **macOS** (`macos-latest`).

## Usage

```yaml
jobs:
  is-stargazer:
    runs-on: ubuntu-latest
    steps:
      - uses: gacts/is-stargazer@v1
        id: check-star
        #with:
        #  github-token: ${{ github.token }}
        #  username: ${{ github.actor }} # or ${{ github.event.pull_request.user.login }} for PR author
        #  repository: ${{ github.repository }}

      - if: steps.check-star.outputs.is-stargazer != 'true'
        uses: actions/github-script@v7
        with:
          script: core.setFailed('⭐ Please, star this repository!')
```

In addition, you can combine this action with, for example, [`actions/github-script`](https://github.com/actions/github-script):

```yaml
on:
  issues:
    types: [opened]

jobs:
  comment:
    runs-on: ubuntu-latest
    steps:
      - uses: gacts/is-stargazer@v1
        id: check-star

      - if: steps.check-star.outputs.is-stargazer != 'true'
        uses: actions/github-script@v7
        with:
          script: |
            github.rest.issues.createComment({
              issue_number: context.issue.number,
              owner: context.repo.owner,
              repo: context.repo.repo,
              body: '⭐ Please, star this repository!'
            })
```

## Customizing

### Inputs

The following inputs can be used as `step.with` keys:

| Name           |   Type   |          Default           | Required | Description                                   |
|----------------|:--------:|:--------------------------:|:--------:|-----------------------------------------------|
| `github-token` | `string` |   `${{ github.token }}`    |    no    | GitHub token                                  |
| `username`     | `string` |   `${{ github.actor }}`    |    no    | GitHub username to check (eg. `octocat`)      |
| `repository`   | `string` | `${{ github.repository }}` |    no    | Target repository (eg. `octocat/Hello-World`) |

### Outputs

| Name           |   Type   | Description                                    |
|----------------|:--------:|------------------------------------------------|
| `is-stargazer` | `string` | User starred a repo or not (`true` or `false`) |

## Releasing

To release a new version:

- Build the action distribution (`make build` or `npm run build`).
- Commit and push changes (including `dist` directory changes - this is important) to the `master|main` branch.
- Publish the new release using the repo releases page (the git tag should follow the `vX.Y.Z` format).

Major and minor git tags (`v1` and `v1.2` if you publish a `v1.2.Z` release) will be updated automatically.

> [!TIP]
> Use [Dependabot](https://bit.ly/45zwLL1) to keep this action updated in your repository.

## Support

[![Issues][badge_issues]][link_issues]
[![Pull Requests][badge_pulls]][link_pulls]

If you find any errors in the action, please [create an issue][link_create_issue] in this repository.

## License

This is open-source software licensed under the [MIT License][link_license].

[badge_build]:https://img.shields.io/github/actions/workflow/status/gacts/is-stargazer/tests.yml?branch=master&maxAge=30
[badge_release_version]:https://img.shields.io/github/release/gacts/is-stargazer.svg?maxAge=30
[badge_license]:https://img.shields.io/github/license/gacts/is-stargazer.svg?longCache=true
[badge_release_date]:https://img.shields.io/github/release-date/gacts/is-stargazer.svg?maxAge=180
[badge_commits_since_release]:https://img.shields.io/github/commits-since/gacts/is-stargazer/latest.svg?maxAge=45
[badge_issues]:https://img.shields.io/github/issues/gacts/is-stargazer.svg?maxAge=45
[badge_pulls]:https://img.shields.io/github/issues-pr/gacts/is-stargazer.svg?maxAge=45

[link_build]:https://github.com/gacts/is-stargazer/actions
[link_license]:https://github.com/gacts/is-stargazer/blob/master/LICENSE
[link_issues]:https://github.com/gacts/is-stargazer/issues
[link_create_issue]:https://github.com/gacts/is-stargazer/issues/new
[link_pulls]:https://github.com/gacts/is-stargazer/pulls
