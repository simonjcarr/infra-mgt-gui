import { defineStore } from 'pinia'

export const useWebSocketStore = defineStore('webSocket', {
  state: () => ({
    userProjects: [],
    allProjects: []
  }),

  actions: {
    async getProjects () {
      fetch('http://localhost:3000/project').then(response => {
        return response.json()
      }).then(data => {
        this.userProjects = data
      })
    }
  }
})