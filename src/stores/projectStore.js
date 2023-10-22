import { defineStore } from 'pinia'

export const useProjectStore = defineStore('project', {
  state: () => ({
    userProjects: [],
    allProjects: [],
    activeProjectId: null
  }),

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
