// TODO:
// current way of communicating is done thru global window object
// continue researching webpack chunk loading and backbone ability to work with it


const Puppeteer = config => {
  const global = window
  const topics = {}
  let store = {}
  let activeApp = null
  let routerInitiated = false
  let storeAttached = false
  
  const log = (...args) => { if (config.dev) console.log(...args) }
  const warn = (...args) => { console.warn(...args) }
  const error = (...args) => { console.error(...args) }
  
  if (!SystemJS) error('SystemJS is required')
  if (!config.apps || typeof config.apps !== "object") error('Missing "apps" object definition')
  Object.keys(config.apps).forEach(app => {
    const _app = config.apps[app]
    if (!_app.bundleLocation) error('Missing "bundleLocation" for app', app)
    if (!_app.domHook) error('Missing "domHook" (element id) for app', app)
    if (!_app.mountFuncName) error('Missing "mountFuncName" (global mount function) for app', app)
  })

  return {
    subscribe: (topic, listener = () => {}) => {
      if (storeAttached && ['STORE:GET', 'STORE:SET', 'STORE:CHANGE'].includes(topic)) {
        warn('Piggybacking on STORE.GET/SET/CHANGE prohibited')
      }
      if (!topics.hasOwnProperty(topic)) topics[topic] = []
      const index = topics[topic].push(listener) - 1
      return () => delete topics[topic][index]
    },

    publish: (topic, payload = {}) => {
      log('--- TOPIC LAUNCHED ---', topic, payload)
      const promises = topics[topic] && topics[topic].length ? topics[topic].map(t => t(payload)) : []
      return Promise.all(promises)
    },

    store: function(action, arg) {
      if (!storeAttached) {
        warn('Store is not attached', action, arg)
        return false
      }
      const self = this
      switch (action) {
        case 'GET':
          return self.publish('STORE:GET', arg).then(data => data[0])
          break
        case 'SET':
          return self.publish('STORE:SET', arg)
          break
        case 'CHANGE':
          return self.subscribe('STORE:CHANGE', arg)
          break
        default:
          warn('Unrecognised Store action', action, arg)
          break
      }
    },

    generateAppEvents: function() {
      const self = this
      let { apps } = config
      Object.keys(apps).forEach(app => {
        self.subscribe(`${app.toUpperCase()}:MOUNT`, () => {
          if (apps[app].mounted) return true
          return SystemJS.import(apps[app].bundleLocation).then(module => {
            apps[app].mounted = true
            const mountFunc = global[apps[app].mountFuncName]
            if (!mountFunc) {
              warn("Couldn't find mount function window." + apps[app].mountFuncName)
              return false
            }
            apps[app].unmount = mountFunc(self, apps[app].domHook)
            self.publish(`${app.toUpperCase()}:MOUNT_SUCCESS`)
          })
        })
        self.subscribe(`${app.toUpperCase()}:ACTION`, payload => {
          if (!apps[app].mounted) return self.publish(`${app.toUpperCase()}:MOUNT`).then(() => {
            self.publish(`${app.toUpperCase()}:ACTION`, payload)
          })
          if (activeApp === app) return false
          if (activeApp && apps[activeApp].unmount) {
            self.publish(`${activeApp.toUpperCase()}:UNMOUNT`)
            if (!apps[activeApp].unmount) {
              warn(apps[activeApp].mountFuncName + "did not return unmount function")
            }
            apps[activeApp].unmount()
            apps[activeApp].mounted = false
          }
          activeApp = app
          if (!payload.skipHashUpdate && routerInitiated) {
            global.location.hash = `#/${app.toLowerCase()}`
          }
        })
      })
      return self
    },

    initiateAppRouter: function() {
      const self = this
      let { apps } = config
      self.subscribe('ROUTER:CUSTOM_HASH_CHANGE', () => {
        const hash = global.location.hash
        let hashMatched = false
        Object.keys(apps).forEach(app => {
          const re = new RegExp("^#\/" + app.toLowerCase() + "($|\/)", 'g');
          if (!!hash.match(re)) hashMatched = true
          if (!!hash.match(re) && activeApp !== app) {
            self.publish(`${app.toUpperCase()}:ACTION`, { type: 'openApp', skipHashUpdate: true })
          }
        })
        if (hashMatched) return true
        self.publish('ROUTER:NONE_EXISTING_ROUTE')
        if (activeApp && apps[activeApp].unmount) {
          apps[activeApp].unmount()
          apps[activeApp].mounted = false
          activeApp = null
        }
      })
      global.addEventListener('hashchange', () => self.publish('ROUTER:CUSTOM_HASH_CHANGE'))
      self.publish('ROUTER:CUSTOM_HASH_CHANGE')
      routerInitiated = true
      return self
    },

    attachStore: function(_store = {}) {
      const self = this
      store = _store
      self.subscribe('STORE:SET', (data) => {
        if (typeof data !== 'object') {
          warn('STORE:SET expect object s argument')
          return false
        }
        store = {
          ...store,
          ...data,
        }
        self.publish('STORE:CHANGE', data)
      })
      self.subscribe('STORE:GET', key => {
        return store[key]
      })
      storeAttached = true
      return self
    },

    getActiveApp: () => activeApp,
  }
}

export default Puppeteer