
export default async ({ app, router, store }) => {
  console.log('websocket boot file')
  let ws
  if (!!ws) {
    ws.close()
  }
  ws = new WebSocket('ws://localhost:3000/6534f87f0bb69dc839236fff')
  ws.addEventListener('error', (e) => {
    console.log(e)
  })
  ws.addEventListener('message', (e) => {
    const message = JSON.parse(e)
    const operation = message.operationType
    const data = message.data
    console.log(data)
  })
  ws.addEventListener('open', (e) => {
    ws.send('Hello Server!')
  })
}