# Updates

In response to https://github.com/single-spa/single-spa-vue/issues/89#issuecomment-2048381494, I tried running this again. I made one or two changes to get the project working again. I then bumped `vue-router` to the latest and ran the example again. The issue persisted. 

## Incidental changes

### Uninstalled husky in `root/`. 

When I ran `npm ci` in `root/` the husky `prepare` hook was throwing an error. The inclusion of husky was incidental and not really relevant to the demo, so I just uninstalled it.

### Added a `.nvmrc`

I think the reason I hit new issues when trying to run the servers as described in [README.md#example-1](../README.md#example-1) is that I never specified a node version, so I am likely running this with a newer version of NodeJS than I did when I first committed the project in 2021. I specified the current LTS in [.nvmrc](./.nvmrc), and used [fnm](https://github.com/Schniz/fnm) to assume it. [nvm](https://github.com/nvm-sh/nvm) as a switcher would of course work too.

### openssl-legacy-provider node option

When I went to run the servers in `vue-2-app/` and `vue-3-app/`, webpack was throwing an error with `digital envelope routines::unsupported`. I read [webpack/webpack//issues/14532](https://github.com/webpack/webpack/issues/14532) and found that this was caused by using webpack with a newer version NodeJS than I used when I originally ran this project. It seems like webpack has since resolved this issue, but I didn't want to track down which dependency was using webpack (probably `vue-cli-service`...), so I instead used a workaround mentioned in the issue, adding `NODE_OPTIONS=--openssl-legacy-provider`. I only added this in `start` command in `root/` and the `serve` commands in both `vue-2-app/` and `vue-3-app/`, since these are the commands I used in the examples.

<hr>

## Experiment

After making the above changes to get the project running, I followed [README.md#example-1](../README.md#example-1) and was able to reproduce the issue described.

### Bump `vue-router` and `@vue/cli-plugin-router`

After confirming the issue still existed, I bumped `vue-router` and `@vue/cli-plugin-router` to the latest versions. I then followed the example again. I was able to confirm that problem persisted when using the latest `vue-router`. 
