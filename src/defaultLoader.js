const Loader = file => new Promise((resolve, reject) => {
  let el = null

  if (
    document.querySelectorAll(`[src="${file}"]`).length ||
    document.querySelectorAll(`[href="${file}"]`).length
  ) {
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
  
  async function loadFiles(_files) {
    for(const file of _files) {
      await Loader(file)
    }
  }

  return loadFiles(files)
}


export default multiLoader
