window.mountApp2 = (director, hookID) => {
  console.log('Mounting App2 with hookID', hookID)
  return () => {
    console.log('Unmounting App2')
  }
}