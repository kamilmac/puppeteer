window.mountApp1 = (director, hookID) => {
  console.log('Mounting App1 with hookID', hookID)
  return () => {
    console.log('Unmounting App1')
  }
}