
export default async ({ app, router, store }) => {
  console.log('websocket boot file')
  let ws
  if (ws) {
    ws.close()
  }
  ws = new WebSocket('ws://localhost:3000/6533c5ed4746ee26e802e650')
  ws.addEventListener('error', (e) => {
    console.log(e)
  })
  ws.addEventListener('message', (e) => {
    console.log(e.data)
  })
  ws.addEventListener('open', (e) => {
    ws.send('Hello Server!')
  })
}