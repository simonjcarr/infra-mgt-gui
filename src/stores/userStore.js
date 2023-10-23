import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    users: []
  }),
  getters: {
    getUser (state) {
      return (id) => {
        return this.users.find(u => u._id === id)
      }
    }
  },
  actions: {
    async getUsers () {
      fetch('http://localhost:3000/user').then(response => {
        return response.json()
      }).then(data => {
        this.users = data
      })
    },
    addUser (user) {
      this.users.push(user)
    },
    removeUser (id) {
      this.users = this.users.filter(u => u._id !== id)
    },
    updateUser (user) {
      // loop through each user update the user with a matching _id field
      this.users.forEach((u, i) => {
        if (u._id === user._id) {
          this.users[i] = user
        }
      })
    }
  }
})
