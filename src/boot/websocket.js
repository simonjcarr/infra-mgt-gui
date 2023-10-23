import { useProjectStore } from 'stores/projectStore'
import { useUserStore } from 'stores/userStore'
export default async ({ app, router, store }) => {
  const projectStore = useProjectStore()
  const userStore = useUserStore()

  userStore.getUsers()
  projectStore.getProjects()

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
    const message = JSON.parse(e.data)
    const operation = message.operationType
    console.log(operation)
    const data = message.data
    const collection = message.collection
    switch (collection) {
      case "project":
        switch (operation) {
          case "insert":
            projectStore.addProject(data)
            break;
          case "delete":
            projectStore.removeProject(data)
            break;
          case "update":
            projectStore.updateProject(data)
            break;
          default:
            break;
        }
        break;
      case "user":
        switch (operation) {
          case "insert":
            userStore.addUser(data)
            break;
          case "delete":
            userStore.removeUser(data)
            break;
          case "update":
            userStore.updateUser(data)
            break;
          default:
            break;
        }
      default:
        break;
    }

  })
  ws.addEventListener('open', (e) => {
    ws.send('Hello Server!')
  })
}
