const Loader = file => new Promise((resolve, reject) => {
  if (document.querySelectorAll(`[src="${file}"]`).length) {
    return resolve(null)
  }
  const script = document.createElement("script")
  script.type = "text/javascript"
  script.src = file
  script.onload = () => resolve(null)
  document.body.appendChild(script)
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
