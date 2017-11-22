const Loader = file => new Promise((resolve, reject) => {
  let el = null

  const js = document.querySelectorAll(`[src="${file}"]`)
  if (js.length) {
    return resolve(null)
  }

  const css = document.querySelectorAll(`[href="${file}"]`)
  if (css.length) {
    css[0].disabled = false
    return resolve(null)    
  }

  switch (true) {
    case !!file.match(/\.js$/g):
      el = document.createElement('script')
      el.type = 'text/javascript'
      el.src = file
      el.onload = () => resolve(null)
      document.body.appendChild(el)
      break
    case !!file.match(/\.css$/g):
      el = document.createElement('link')
      el.rel = 'stylesheet'
      el.type = 'text/css'
      el.setAttribute('custom_loaded_stylesheet', 'true')
      el.href = file
      el.onload = () => resolve(null)
      document.head.appendChild(el)
      break
    default: resolve(null)
  }
})


const multiLoader = files => {
  if (typeof files === 'string') {
    return Loader(files)
  }
  if (!Array.isArray(files)) {
    return console.error('Loader expects string or array')
  }
  
  const allCustomLoadedStylesheets = document.querySelectorAll(`[custom_loaded_stylesheet="true"]`)
  allCustomLoadedStylesheets.forEach(el => {
    el.disabled = true
  })

  async function loadFiles(_files) {
    for(const file of _files) {
      await Loader(file)
    }
  }

  return loadFiles(files)
}


export default multiLoader
