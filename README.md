# single-spa-routing-example

## What

This repo is intended to illustrate an issue using [single-spa-vue](https://github.com/single-spa/single-spa-vue). It contains a simple example of:

- a root config
- an app using [vue 3](https://v3.vuejs.org/guide/) and [vue-router 4](https://next.router.vuejs.org/guide/)
- an app using [vue 2](https://vuejs.org/v2/guide/) and [vue-router 3](https://router.vuejs.org/guide/)

Both apps have the same set of routes. The issue is that when using single-spa's [navigateToUrl()](https://single-spa.js.org/docs/api/#navigatetourl), the Vue3 app's router tries to hijack the navigation event, even after that app should have been unmounted.
While I think the fix might ultimately be in the [vuejs/vue-router-next](https://github.com/vuejs/vue-router-next) repo, I think some interplay of single-spa & vue-router is at fault.

## Example 1

- start all 3 dev servers:
  - `cd root && npm start`
  - `cd vue-2-app && npm run serve`
  - `cd vue-3-app && npm run serve`
- visit `http://localhost:9000/`
- using the top nav links, navigate > `vue-2-app`. visit any of the subroutes if you wish.
  - Navigate > `Default`.
    - no problems. we land back at `http://localhost:9000/`.
- visit `http://localhost:9000/` and do a hard refresh.
- using the top nav links, navigate > `vue-2-app`. visit any of the subroutes if you wish.
  - Navigate > `vue-3-app`.
    - no problems. we land at `http://localhost:9000/vue-3-app/ping`.
- visit `http://localhost:9000/` and do a hard refresh.
- using the top nav links, navigate > `vue-3-app`. visit any of the subroutes if you wish.
  - Navigate > `Default`.
  - oops. we land at `http://localhost:9000/vue-3-app/ping`.
    - we also get a warning `[Vue Router warn]: No match found for location with path "/vue-2-app"`
- visit `http://localhost:9000/` and do a hard refresh.
- using the top nav links, navigate > `vue-3-app`. visit any of the subroutes if you wish.
  - Navigate > `vue-2-app`.
  - oops. we land at `http://localhost:9000/vue-3-app/vue-2-app`.

## Example 2

- in `root/src/microfrontend-layout.html`, remove all three of the `onclick="singleSpaNavigate(event)"` handlers in the nav.
- try the same scenarios as in Example 1 above. Result: expected navigation between apps w/ no problems.

## References

- I think this is related to [vuejs/vue-router/pull/3172](https://github.com/vuejs/vue-router/pull/3172).
  - So seems like this is fixed in vue-router 3, but broken in vue-router 4? I am not clear how the vue-router & vue-router-next repos are kept in sync.