<template lang="">
  <div class="row text-weight-bold">
    <div class="col-7">Project Name</div>
    <div class="col-5">Date Created</div>
  </div>
  <div v-for="project in userProjects" :key="project.name" class="row">
    <div class="col-7">{{project.name}}</div>
    <div class="col-5">{{formatDate(project.createdAt)}}</div>
  </div>
</template>

<script>
import { useProjectStore } from '../../stores/projectStore'
import { storeToRefs } from 'pinia';
import moment from 'moment'
export default {
  methods: {
    formatDate(date) {
      return moment(date).format('DD/MM/YYYY HH:mm')
    }
  },
 setup() {
    const store = useProjectStore()
    const { userProjects } = storeToRefs(store)
    store.getProjects()

    

    return {
      userProjects
    }
 }
  
}
</script>
