# Puppeteer
Library for managing micro-frontends.

## How it works ?

Puppeteer is based on simple pub/sub pattern implementation.

By passing config object and running generateAppEvents Puppeteer
creates instance of event bus with default actions responsible for
dynamic mounting/unmounting of children applications.

One can also use inititateAppRouter when simple routing is needed.
In this case Puppeteer observes and appends hash dynamicaly.

On top of that simple Store functionality is provided which might be usefull
for keeping global app state like auth info etc.

Puppeteer uses default loader for dynamic loading of external scripts.
It is possible to use custom loader by passing it as 'loader' property in config object.
Just make sure it is a funtion that takes file path as argument and returns a promise.

## Simple Usage

```js
import Puppeteer from '@kamilmac/puppeteer'

const config = {
  // loader: YOUR_OPTIONAL_LOADER
  dev: true,  // optional, defaults to false (logs each action if true)
  apps: {
    // Uppercase object key is used as a base for action type and hash name
    app1: {
      bundleLocation: 'app1.js',
      // document element id where app will be attached
      domHook: 'app1',
      // Mounting function accesible of window object
      // should return unmount function
      mountFuncName: 'mountApp1'
    },
    app2: {
      bundleLocation: 'app2.js',
      domHook: 'app2',
      mountFuncName: 'mountApp2'
    },
  },
}

// optional store
let store = {}

const puppeteer = Puppeteer(config)
  .generateAppEvents() // generates actions ie. 'APP1:ACTION', 'APP2:ACTION'
  .initiateAppRouter() // (optional) attaches router and creates routes for `#/(app1|app2)`
  .attachStore(store) // (optional)

// Runs App1 with payload object
// If bundle is not loaded, Puppeteer uses SystemJS to load it dynamically.
// When done, mountFunc is run with (puppeteer, domHook) arguments.
// Look below for mountFunc example
puppeteer.publish('APP1:ACTION', { data })

setTimeout(() => {
  // Unmounts App1 and runs App2
  puppeteer.publish('APP2:ACTION', { data })
}, 3000)

// Write to store
puppeteer.store('SET', { token: 'token' })
// Read from store
puppeteer.store('GET', 'token')
// Subscribes to change in store
puppeteer.store('CHANGE', data => {
  console.log('Modified data', data)
})

```

**Children app - app1.js (React example)**

```js

// Puppeteer sets puppeteerActive flag to true when initialised.
// Simple check like below allows to run the app in isolation.
if (!window.puppeteerActive) {
  ReactDOM.render(
    <App/>,
    document.getElementById('root')
  )
} else {
  // Mount function for App1. This is the glue between App1 and Puppeteer
  window.mountApp1 = (puppeteer, domHook) => {
    ReactDOM.render(
      <App puppeteer={puppeteer}/>,
      document.getElementById(domHook)
    )
    return () => {
      ReactDOM.unmountComponentAtNode(document.getElementById(domHook))
    }
  }
}

class App extends React.component {
  componentDidMount() {
    this.unsub = this.props.puppeteer.subscribe('APP1:ACTION', payload => {
      // DO YOUR THING
    })
  }

  componentWillUnmount() {
    // unsubscribe when component unmounts
    this.unsub()
  }

  runApp2(payload) {
    // Opens App2 and unmounts App1
    this.props.puppeteer.publish('APP2:ACTION', payload)
  }

  render() {
    return <h1>APP1</h1>
  }
}
```


# API

## subscribe
`subscribe(TOPIC, callback)`
Subscribes to TOPIC on event buss. Callback is executed with payload data each time 'publish' method is run. 


## publish
`publish(TOPIC, PAYLOAD)`. Sends event with PAYLOAD


## generateAppEvents
`generateAppEvents()` creates default actions/events for children apps in config object.
It uses subscribe/publish methods.
Route names are based on app keys in config object
For each app TOPICs are created:

${APP}:ACTION, ${APP}:MOUNT, ${APP}:UNMOUNT

Apps should communicate by using ${APP}:ACTION topic. MOUNT/UNMOUNT actions are resolved automatically.


## inititateAppRouter
`inititateAppRouter()` subscribes to ROUTER:CUSTOM_HASH_CHANGE event which is run each time url location changes. It publishes ROUTER:NONE_EXISTING_ROUTE event when apps dont match url. It also uses ${APP}:ACTION events for dynamic app mounting.
App route names are based on app keys in config object.



## attachStore
`attachStore(INITIAL_STORE_OBJECT)` creates simple key-value store which also uses publish/subscribe for communication. Instead of calling publish/subscribe, Puppeteer provides store helper (below) for dealing with it.

## store
- `store('GET', key).then(value => { DO YOUR THING WITH value})`
- `store('SET', { key: value })`
- `store('CHANGE', changed_object => { REACT TO CHANGES })`


## getActiveApp
`getActiveApp()` returns current active app name.
