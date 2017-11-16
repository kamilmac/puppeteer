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


## Config
  - `dev`: true|false(default) flag (logs out events)
  - `loader`: custom loader function (consumes file string and returns a promise)
  - `apps`: object describing children apps. App object key is a base for route & action name.
    - `appName`: this object key will resolve to '#/appname' route and APPNAME prefix for events
      - `bundleLocation`: path to external app bundle
      - `domHook`: document_id where app should be attached
      - `mountFuncName`: name of the mountung function exisiting on the window object in children app. Returns unmount `function`.

## Installation & Simple Usage

  **NPM**
```bash
npm i --save @kamilmac/puppeteer
```
  **YARN**

```bash
yarn add @kamilmac/puppeteer
```

**Main app - index.js**

```js
import Puppeteer from '@kamilmac/puppeteer'

const config = {
  // loader: YOUR_OPTIONAL_LOADER
  dev: true,
  apps: {
    app1: {
      bundleLocation: 'app1.js',
      domHook: 'app1',
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
let store = {
  greeting: 'hello!',
}

const puppeteer = Puppeteer(config)
  .generateAppEvents() // generates actions ie. 'APP1:ACTION', 'APP2:ACTION'
  .initiateAppRouter() // (optional) attaches router and creates routes for `#/(app1|app2)`
  .attachStore(store) // (optional)

// Runs App1 with payload object
// If bundle is not loaded, Puppeteer mounts it dynamically.
// When done, mountFunc is run with (puppeteer, domHook) arguments.
// Look below for mountFunc example
puppeteer.publish('APP1:ACTION', { data })

setTimeout(() => {
  // Unmounts App1 and runs App2
  puppeteer.publish('APP2:ACTION', { data })
}, 3000)


puppeteer.store('GET', 'greeting').then(value => {
  console.log(value) // prints 'hello!'
})
// Write to store
puppeteer.store('SET', { token: 'token' })
// Read from store
puppeteer.store('GET', 'token').then(value => {
  console.log(value) // prints 'token'
})
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

## Functions

<dl>
<dt><a href="#Puppeteer">Puppeteer(config)</a> ⇒ <code>Object</code></dt>
<dd><p>Consumes Config object and creates Puppeteer instance</p>
<p>{
  loader: OPTIONAL_LOADER_FUNCTION
  dev: DEV_FLAG
  apps: {
    // Uppercase object key is used as a base for action type and hash name
    app1: {
      bundleLocation: &#39;app1.js&#39;,
      // document element id where app will be attached
      domHook: &#39;app1&#39;,
      // Mounting function accesible of window object
      // should return unmount function
      mountFuncName: &#39;mountApp1&#39;
    },
    app2: {
      bundleLocation: &#39;app2.js&#39;,
      domHook: &#39;app2&#39;,
      mountFuncName: &#39;mountApp2&#39;
    },
  },
}</p>
</dd>
<dt><a href="#subscribe">subscribe(topic, listener)</a> ⇒ <code>function</code></dt>
<dd><p>Subscribes to TOPIC on event buss.
Callback is executed with payload data each time &#39;publish&#39; method is run.</p>
</dd>
<dt><a href="#publish">publish(topic, payload)</a> ⇒ <code>Promise</code></dt>
<dd><p>Publishes event with optional payload.</p>
</dd>
<dt><a href="#store">store(action, arg)</a> ⇒ <code>Promise</code> | <code>function</code></dt>
<dd><p>Wrapper for store events</p>
</dd>
<dt><a href="#generateAppEvents">generateAppEvents()</a> ⇒ <code>Object</code></dt>
<dd><p>Creates default actions/events for children apps in config object.
It uses subscribe/publish methods.
Route names are based on app keys in config object
For each app TOPICs are created:</p>
<p>${APP}:ACTION, ${APP}:MOUNT, ${APP}:UNMOUNT</p>
<p>Apps should communicate by using ${APP}:ACTION topic. MOUNT/UNMOUNT actions are resolved automatically.</p>
</dd>
<dt><a href="#initiateAppRouter">initiateAppRouter()</a> ⇒ <code>Object</code></dt>
<dd><p>Subscribes to ROUTER:CUSTOM_HASH_CHANGE event
which is run each time url location changes.
It publishes ROUTER:NONE_EXISTING_ROUTE event when apps dont match url.
It also uses ${APP}:ACTION events for dynamic app mounting.
App route names are based on app keys in config object.</p>
</dd>
<dt><a href="#attachStore">attachStore(Optional)</a> ⇒ <code>Object</code></dt>
<dd><p>Creates simple key-value store which also uses publish/subscribe for communication.
Instead of calling publish/subscribe,
Puppeteer provides store wrapper for dealing with it.</p>
</dd>
<dt><a href="#getActiveApp">getActiveApp()</a> ⇒ <code>String</code></dt>
<dd><p>Returns name of current active app.</p>
</dd>
</dl>

<a name="Puppeteer"></a>

## Puppeteer(config) ⇒ <code>Object</code>
Consumes Config object and creates Puppeteer instance

{
  loader: OPTIONAL_LOADER_FUNCTION
  dev: DEV_FLAG
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

**Kind**: global function  
**Returns**: <code>Object</code> - Puppeteer instance  

| Param | Type |
| --- | --- |
| config | <code>Object</code> | 

<a name="subscribe"></a>

## subscribe(topic, listener) ⇒ <code>function</code>
Subscribes to TOPIC on event buss.
Callback is executed with payload data each time 'publish' method is run.

**Kind**: global function  
**Returns**: <code>function</code> - Unsubscribe function.  

| Param | Type | Description |
| --- | --- | --- |
| topic | <code>String</code> | Event to subscribe to. |
| listener | <code>function</code> | Callback function run when topic event is published. |

<a name="publish"></a>

## publish(topic, payload) ⇒ <code>Promise</code>
Publishes event with optional payload.

**Kind**: global function  
**Returns**: <code>Promise</code> - Resolves when all subscribed callbacks finished.  

| Param | Type | Description |
| --- | --- | --- |
| topic | <code>String</code> | Event to publish. |
| payload | <code>Object</code> | optional payload object. |

<a name="store"></a>

## store(action, arg) ⇒ <code>Promise</code> \| <code>function</code>
Wrapper for store events

**Kind**: global function  
**Returns**: <code>Promise</code> \| <code>function</code> - Returns Promise on GET action / Unsubscribe function on CHANGE  

| Param | Type | Description |
| --- | --- | --- |
| action | <code>String</code> | Event to publish. (GET|SET|CHANGE) |
| arg | <code>String</code> \| <code>Object</code> \| <code>function</code> | Depending on action. (KEY_STRING|OBJECT|CALLBACK) |

<a name="generateAppEvents"></a>

## generateAppEvents() ⇒ <code>Object</code>
Creates default actions/events for children apps in config object.
It uses subscribe/publish methods.
Route names are based on app keys in config object
For each app TOPICs are created:

${APP}:ACTION, ${APP}:MOUNT, ${APP}:UNMOUNT

Apps should communicate by using ${APP}:ACTION topic. MOUNT/UNMOUNT actions are resolved automatically.

**Kind**: global function  
**Returns**: <code>Object</code> - returns this instance  
<a name="initiateAppRouter"></a>

## initiateAppRouter() ⇒ <code>Object</code>
Subscribes to ROUTER:CUSTOM_HASH_CHANGE event
which is run each time url location changes.
It publishes ROUTER:NONE_EXISTING_ROUTE event when apps dont match url.
It also uses ${APP}:ACTION events for dynamic app mounting.
App route names are based on app keys in config object.

**Kind**: global function  
**Returns**: <code>Object</code> - returns this instance  
<a name="attachStore"></a>

## attachStore(Optional) ⇒ <code>Object</code>
Creates simple key-value store which also uses publish/subscribe for communication.
Instead of calling publish/subscribe,
Puppeteer provides store wrapper for dealing with it.

**Kind**: global function  
**Returns**: <code>Object</code> - returns this instance.  

| Param | Type | Description |
| --- | --- | --- |
| Optional | <code>Object</code> | initial store. |

<a name="getActiveApp"></a>

## getActiveApp() ⇒ <code>String</code>
Returns name of current active app.

**Kind**: global function  

