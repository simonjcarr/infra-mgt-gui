import { defineStore } from 'pinia'

export const useProjectStore = defineStore('project', {
  state: () => ({
    userProjects: [],
    allProjects: [],
    activeProjectId: null,

    maxRam: 128,
    maxDisk: 5000,
    usedCpu: 9,
    usedRam: 32,
    usedDisk: 2890,
  }),
  getters: {
    getActiveProject () {
      console.log(this.activeProjectId)
      return this.userProjects.find(p => p._id === this.activeProjectId)
    }
  },
  actions: {
    async getProjects () {
      fetch('http://localhost:3000/project').then(response => {
        return response.json()
      }).then(data => {
        this.userProjects = data
      })
    },
    async storeProject(project) {
      fetch('http://localhost:3000/project', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(project)
      }).then(response => {
        return response.json()
      })
    },
    setActiveProject(id) {
      this.activeProjectId = id
    },
    addProject (project) {
      this.userProjects.push(project)
    },
    removeProject (id) {
      this.userProjects = this.userProjects.filter(p => p._id !== id)
    },
    updateProject (project) {
      // loop through each project update the proejct with a matching _id field
      this.userProjects.forEach((p, i) => {
        if (p._id === project._id) {
          this.userProjects[i] = project
        }
      })
    }
  }
})
