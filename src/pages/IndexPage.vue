<template>
  <q-page class="">
    <div class="q-pa-md">
      <div class="row">
        <div class="col-6">
          <ProjectList />
          <div class="flex q-mt-xs">
            <span>
              <ProjectCreate />
            </span>
            <q-btn v-if="activeProjectId" color="primary" class="q-ml-xs" size="sm" icon="dashboard" label="Project Dashboard" @click="projectDashboardClick" />
          </div>
        </div>
        <div class="col-6">
        <VirtualMachineList />
          <q-btn color="primary" class="q-mt-xs" size="sm" icon="add" label="New VM" />
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>

import { useProjectStore } from '../stores/projectStore'
import { storeToRefs } from 'pinia'
import { defineComponent } from 'vue'
import ProjectList from '../components/projects/ProjectList.vue'
import VirtualMachineList from '../components/virtualMachines/VirtualMachineList.vue'
import ProjectCreate from '../components/projects/ProjectCreate.vue'
export default defineComponent({
  name: 'IndexPage',
  components: {
    ProjectList,
    VirtualMachineList,
    ProjectCreate
  },
  setup() {
    const store = useProjectStore()
    const { activeProjectId, getActiveProject } = storeToRefs(store)

    return {
      activeProjectId,
      getActiveProject
    }
  },
  methods: {
    projectDashboardClick() {
      this.$router.push('/project')
    }
  }


})
</script>
