import { defineStore } from 'pinia'

export const useProjectStore = defineStore('project', {
  state: () => ({
    userProjects: [],
    allProjects: [],
    activeProjectId: null,
    maxCpu: 20,
    maxRam: 128,
    maxDisk: 5000,
    usedCpu: 9,
    usedRam: 32,
    usedDisk: 2890,
  }),
  getters: {
    getActiveProject () {
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
