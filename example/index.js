import puppeteer from '../lib/index.js'

const config = {
  dev: true,
  apps: {
    app1: {
      bundleLocation: './app1.js',
      domHook: 'hookForApp1',
      mountFuncName: 'mountApp1'
    },
    app2: {
      bundleLocation: './app2.js',
      domHook: 'hookForApp2',
      mountFuncName: 'mountApp2'
    },
  },
}

// let store = {
//   hello: 'Robert',
// }

const p = puppeteer(config)
  .generateAppEvents()
  // .initiateAppRouter()
  // .attachStore(store)

p.publish('APP1:ACTION')
