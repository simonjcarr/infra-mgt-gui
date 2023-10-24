import { defineStore } from "pinia";

export const useVmStore = defineStore("vm", {
  state: () => ({
    allVms: [],
    activeVmId: null,
  }),
  getters: {
    getActiveVM() {
      return this.allVms.find((p) => p._id === this.activeVmId);
    },
    getVmById() {
      return (id) => {
        return this.allVms.find((p) => p._id === id);
      };
    },
    getVmsByProjectId() {
      return async (projectId) => {
        console.log("pid", projectId);
        console.log("vms", this.allVms);
        return this.allVms.filter((p) => p.project === projectId);
      };
    },
    getOsImage() {
      return (osFamily) => {
        if (osFamily === "redhat") {
          return "redhat.png";
        } else if (osFamily === "ubuntu") {
          return "ubuntu.png";
        } else if (osFamily === "windows") {
          return "windows.png";
        } else {
          return "linux.png";
        }
      };
    },
  },
  actions: {
    async getVms() {
      fetch("http://localhost:3000/vm")
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          this.allVms = data;
        });
    },
    setActiveVm(id) {
      this.activeVmId = id;
    },
    addVm(vm) {
      this.allVms.push(vm);
    },
    removeVm(id) {
      this.allVms = this.allVms.filter((p) => p._id !== id);
    },
    updateVm(vm) {
      // loop through each project update the proejct with a matching _id field
      this.allVms.forEach((p, i) => {
        if (p._id === vm._id) {
          this.allVms[i] = vm;
        }
      });
    },
    storeVm(vm) {
      fetch("http://localhost:3000/vm", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(vm),
      })
        .then((response) => {
          return response.json();
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
});
