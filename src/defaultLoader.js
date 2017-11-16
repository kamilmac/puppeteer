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

export default Loader
