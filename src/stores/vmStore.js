import { defineStore } from 'pinia'

export const useVmStore = defineStore('vm', {
  state: () => ({
    allVms: [],
    activeVmId: null,
  }),
  getters: {
    getActiveVM () {
      return this.allVms.find(p => p._id === this.activeVmId)
    }
  },
  actions: {
    async getVms () {
      fetch('http://localhost:3000/vm').then(response => {
        return response.json()
      }).then(data => {
        this.allVms = data
      })
    },
    setActiveVm(id) {
      this.activeVmId = id
    },
    addVm (vm) {
      this.allVms.push(vm)
    },
    removeVm (id) {
      this.allVms = this.allVms.filter(p => p._id !== id)
    },
    updateVm (vm) {
      // loop through each project update the proejct with a matching _id field
      this.allVms.forEach((p, i) => {
        if (p._id === vm._id) {
          this.allVms[i] = vm
        }
      })
    },
    createVm (vm) {
      fetch('http://localhost:3000/vm', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(vm)
      }).then(response => {
        return response.json()
      }).catch(err => {
        console.log(err)
      })
    }
  }
})