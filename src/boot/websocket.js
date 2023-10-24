import { useProjectStore } from "stores/projectStore";
import { useUserStore } from "stores/userStore";
import { useVmStore } from "stores/vmStore";
export default async ({ app, router, store }) => {
  const projectStore = useProjectStore();
  const userStore = useUserStore();
  const vmStore = useVmStore();

  userStore.getUsers();
  projectStore.getProjects();
  vmStore.getVms();

  console.log("websocket boot file");
  let ws;
  if (!!ws) {
    ws.close();
  }
  ws = new WebSocket("ws://localhost:3000/6534f87f0bb69dc839236fff");
  ws.addEventListener("error", (e) => {
    console.log(e);
  });
  ws.addEventListener("message", (e) => {
    const message = JSON.parse(e.data);
    const operation = message.operationType;
    console.log(operation);
    const data = message.data;
    const collection = message.collection;
    switch (collection) {
      case "project":
        switch (operation) {
          case "insert":
            projectStore.addProject(data);
            break;
          case "delete":
            projectStore.removeProject(data);
            break;
          case "update":
            projectStore.updateProject(data);
            break;
          default:
            break;
        }
      case "user":
        switch (operation) {
          case "insert":
            userStore.addUser(data);
            break;
          case "delete":
            userStore.removeUser(data);
            break;
          case "update":
            userStore.updateUser(data);
            break;
          default:
            break;
        }
      case "vm":
        switch (operation) {
          case "insert":
            console.log("insert", data)
            vmStore.addVm(data);
            break;
          case "delete":
            vmStore.removeVm(data);
            break;
          case "update":
            vmStore.updateVm(data);
            break;
          default:
            break;
        }
      default:
        break;
    }
  });
  ws.addEventListener("open", (e) => {
    ws.send("Hello Server!");
  });
};
