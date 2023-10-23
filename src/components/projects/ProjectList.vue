<template lang="">
   <q-list  bordered class="rounded-borders" padding style="max-width: 450px">
    <q-item-label header>Projects</q-item-label>
    <q-scroll-area style="height: 150px">
      <q-item @click="setActiveProject(project._id)" :class="{ 'bg-secondary': activeProjectId == project._id  }"  clickable v-ripple v-for="project in userProjects" :key="project._id">
        <q-item-section>
          <q-item-label lines="1">{{project.name}}</q-item-label>
          <q-item-label class="text-black text-caption">{{formatDate(project.createdAt)}}</q-item-label>
        </q-item-section>
        <q-item-section side>
          <q-tooltip>
            No Errors Detected
          </q-tooltip>
          <q-icon name="info" color="green"/>
          
        </q-item-section>

      </q-item>
    </q-scroll-area>
   </q-list>
</template>

<script>
import { useProjectStore } from '../../stores/projectStore'
import { storeToRefs } from 'pinia';
import moment from 'moment'
export default {
  methods: {
    formatDate(date) {
      return moment(date).format('DD/MM/YYYY')
    },
    
    
  },
  setup() {
    const store = useProjectStore()
    const { userProjects, activeProjectId, getActiveProject } = storeToRefs(store)

    const setActiveProject = (projectId) => {
      store.setActiveProject(projectId)
    }

    store.getProjects()

    return {
      userProjects,
      activeProjectId,
      setActiveProject,
      getActiveProject
    }
  }

}
</script>
