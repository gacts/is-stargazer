# Is the user stargazer?

![Release version][badge_release_version]
[![Build Status][badge_build]][link_build]
[![License][badge_license]][link_license]

This action checks if the user is a stargazer (starred a repo or not). It can be run on **Linux** (`ubuntu-latest`), **Windows** (`windows-latest`) or **macOS** (`macos-latest`).

## Usage

```yaml
jobs:
  is-stargazer:
    runs-on: ubuntu-latest
    id: check-star
    steps:
      - uses: gacts/is-stargazer@v1
        #with:
        #  github-token: ${{ github.token }}
        #  username: ${{ github.actor }}
        #  repository: ${{ github.repository }}

      - if: steps.check-star.outputs.is-stargazer != 'true'
        run: |
          echo "Please, star this repo"
          exit 1
```

## Customizing

### Inputs

Following inputs can be used as `step.with` keys:

| Name           |   Type   |          Default           | Required | Description                                   |
|----------------|:--------:|:--------------------------:|:--------:|-----------------------------------------------|
| `github-token` | `string` |   `${{ github.token }}`    |   yes    | GitHub token                                  |
| `username`     | `string` |   `${{ github.actor }}`    |   yes    | GitHub username to check (eg. `octocat`)      |
| `repository`   | `string` | `${{ github.repository }}` |   yes    | Target repository (eg. `octocat/Hello-World`) |

### Outputs

| Name           |   Type   | Description                                    |
|----------------|:--------:|------------------------------------------------|
| `is-stargazer` | `string` | User starred a repo or not (`true` or `false`) |

## Releasing

New versions releasing scenario:

- Make required changes in the [changelog](CHANGELOG.md) file
- Build the action distribution (`make build` or `yarn build`)
- Commit and push changes (including `dist` directory changes - this is important) into the `master` branch
- Publish new release using repo releases page (git tag should follow `vX.Y.Z` format)

Major and minor git tags (`v1` and `v1.2` if you publish `v1.2.Z` release) will be updated automatically.

## Support

[![Issues][badge_issues]][link_issues]
[![Issues][badge_pulls]][link_pulls]

If you find any action errors, please, [make an issue][link_create_issue] in the current repository.

## License

This is open-sourced software licensed under the [MIT License][link_license].

[badge_build]:https://img.shields.io/github/workflow/status/gacts/is-stargazer/tests?maxAge=30
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
