<template lang="">
  <div class="row">
    <div class="col">
      <h1 v-if="!showProjectNameInput" class="text-h4 text-weight-bold">{{activeProject.name}} <span class="text-h6">
        <q-icon color=accent name="edit" @click="showProjectNameInput=true" /></span>
      </h1>
      <q-form
        @submit="onProjectNameSubmit"
        @reset="onProjectNameReset"
        class="q-gutter-md"
        v-if="showProjectNameInput"
      >
        <div>
          <q-input  v-model="projectName" type="text" label="Label" />
        </div>
        <div>
          <q-btn label="Save" type="submit" color="primary"/>
          <q-btn label="Cancel" type="reset" color="primary" flat class="q-ml-sm" />
        </div>
      </q-form>

    </div>
  </div>
  <div class="row">
    <div class="col">
      <CPUUsage />
    </div>
    <div class="col">
      <RAMUsage />
    </div>
    <div class="col">
      <DiskUsage />
    </div>
  </div>
  <div class="row q-mt-md">
    <div class="col-3">
      <ProjectUsers />
    </div>
  </div>
</template>
<script>
import CPUUsage from '../components/virtualMachines/widgets/CPUUsage.vue'
import RAMUsage from '../components/virtualMachines/widgets/RAMUsage.vue'
import DiskUsage from '../components/virtualMachines/widgets/DiskUsage.vue'
import ProjectUsers from '../components/projects/users/ProjectUsers.vue'
import { ref } from 'vue'
import { useProjectStore } from 'src/stores/projectStore'
import { storeToRefs } from 'pinia'
export default {
  name: 'ProjectHome',
  setup() {
    const projectStore = useProjectStore()
    const { activeProjectId, getActiveProject, maxCpu, maxRam, maxDisk, usedCpu, usedRam, usedDisk } = storeToRefs(projectStore)
    const activeProject = getActiveProject.value
    const projectName = ref()
    const showProjectNameInput = ref(false)
    const onProjectNameReset = () => {
      projectName.value = activeProject.name
      showProjectNameInput.value = false
    }
    const onProjectNameSubmit = () => {
      projectStore.updateProjectName(projectName.value)
      showProjectNameInput.value = false
    }
    return {
      projectName,
      showProjectNameInput,
      activeProject,
      onProjectNameReset,
      onProjectNameSubmit
    }
  },
  mounted() {
    this.projectName = this.activeProject.name
  },
  components: {
    CPUUsage,
    RAMUsage,
    DiskUsage,
    ProjectUsers
  }
}
</script>
