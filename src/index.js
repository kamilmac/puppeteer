import defaultLoader from './defaultLoader.js'

/**
 * Consumes Config object and creates Puppeteer instance
 *
 * {
 *   loader: OPTIONAL_LOADER_FUNCTION
 *   dev: DEV_FLAG
 *   apps: {
 *     // Uppercase object key is used as a base for action type and hash name
 *     app1: {
 *       bundleLocation: ['app1.js'],
 *       // document element id where app will be attached
 *       domHook: 'app1',
 *       // Mounting function accesible of window object
 *       // should return unmount function
 *       mountFuncName: 'mountApp1'
 *     },
 *     app2: {
 *       bundleLocation: ['app2.js'],
 *       domHook: 'app2',
 *       mountFuncName: 'mountApp2'
 *     },
 *   },
 * }
 * @param {Object} config
 * @returns {Object} Puppeteer instance
 */
const Puppeteer = config => {
  const global = window
  const topics = {}
  const loader = config.loader || defaultLoader
  let store = {}
  let activeApp = null
  let routerInitiated = false
  let storeAttached = false
  
  const log = (...args) => { if (config.dev) console.log(...args) }
  const warn = (...args) => { console.warn(...args) }
  const error = (...args) => { console.error(...args) }
  
  global.puppeteerActive = true
  
  if (typeof loader !== 'function') error('Provider app loader is not a function')
  if (!config.apps || typeof config.apps !== "object") error('Missing "apps" object definition')
  Object.keys(config.apps).forEach(app => {
    const _app = config.apps[app]
    if (!_app.bundleLocation) error('Missing "bundleLocation" for app', app)
    if (!_app.domHook) error('Missing "domHook" (element id) for app', app)
    if (!_app.mountFuncName) error('Missing "mountFuncName" (global mount function) for app', app)
  })

  return {
    /**
     * Subscribes to TOPIC on event buss.
     * Callback is executed with payload data each time 'publish' method is run. 
     *
     * @param {String} topic Event to subscribe to.
     * @param {Function} listener Callback function run when topic event is published.
     * @returns {Function} Unsubscribe function.
     */
    subscribe: (topic, listener = () => {}) => {
      if (storeAttached && ['STORE:GET', 'STORE:SET', 'STORE:CHANGE'].includes(topic)) {
        warn('Piggybacking on STORE.GET/SET/CHANGE prohibited')
      }
      if (!topics.hasOwnProperty(topic)) topics[topic] = []
      const index = topics[topic].push(listener) - 1
      return () => delete topics[topic][index]
    },

    /**
     * Publishes event with optional payload.
     *
     * @param {String} topic Event to publish.
     * @param {Object} payload optional payload object.
     * @returns {Promise} Resolves when all subscribed callbacks finished.
     */
    publish: (topic, payload = {}) => {
      log('--- TOPIC LAUNCHED ---', topic, payload)
      const promises = topics[topic] && topics[topic].length ? topics[topic].map(t => t(payload)) : []
      return Promise.all(promises)
    },

    /**
     * Wrapper for store events
     *
     * @param {String} action Event to publish. (GET|SET|CHANGE)
     * @param {String|Object|Function} arg Depending on action. (KEY_STRING|OBJECT|CALLBACK)
     * @returns {Promise|Function} Returns Promise on GET action / Unsubscribe function on CHANGE
     */
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

    /**
     * Creates default actions/events for children apps in config object.
     * It uses subscribe/publish methods.
     * Route names are based on app keys in config object
     * For each app TOPICs are created:
     *
     * ${APP}:ACTION, ${APP}:MOUNT, ${APP}:UNMOUNT
     *
     * Apps should communicate by using ${APP}:ACTION topic. MOUNT/UNMOUNT actions are resolved automatically.
     *
     * @returns {Object} returns this instance
     */
    generateAppEvents: function() {
      const self = this
      let { apps } = config
      Object.keys(apps).forEach(app => {
        self.subscribe(`${app.toUpperCase()}:MOUNT`, () => {
          if (apps[app].mounted) return true
          return loader(apps[app].bundleLocation).then(() => {
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

    /**
     * Subscribes to ROUTER:CUSTOM_HASH_CHANGE event
     * which is run each time url location changes.
     * It publishes ROUTER:NONE_EXISTING_ROUTE event when apps dont match url.
     * It also uses ${APP}:ACTION events for dynamic app mounting.
     * App route names are based on app keys in config object.
     *
     * @returns {Object} returns this instance
     */
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


    /**
     * Creates simple key-value store which also uses publish/subscribe for communication.
     * Instead of calling publish/subscribe,
     * Puppeteer provides store wrapper for dealing with it.
     *
     * @param {Object} Optional initial store.
     * @returns {Object} returns this instance.
     */
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

    /**
     * Returns name of current active app.
     *
     * @returns {String}
     */
    getActiveApp: () => activeApp,
  }
}

export default Puppeteer
