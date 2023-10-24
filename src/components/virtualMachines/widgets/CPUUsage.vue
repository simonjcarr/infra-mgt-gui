<template lang="">
  <div class="text-center">
  <div class="text-primary text-h5">CPU Used</div>
  <q-circular-progress
      show-value
      class="text-white q-ma-md"
      :value=cpuUsedPercent
      size="90px"
      :thickness="0.2"
      color="orange"
      center-color="grey-8"
      track-color="transparent"
    >
    {{cpuUsedPercent}}%
    </q-circular-progress>
    <div>Total: {{activeProject.maxCpu}} | Used: {{ usedCpu }}</div>
  </div>
</template>
<script>
import { useProjectStore} from '../../../stores/projectStore'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'
export default {
  setup() {
    const store = useProjectStore()
    const { activeProjectId, getActiveProject, maxCpu, maxRam, maxDisk, getProjectUsedResource } = storeToRefs(store)
    const activeProject = getActiveProject.value
    let usedCpu = ref(0)
    usedCpu.value = getProjectUsedResource.value(activeProjectId.value).usedCpu

    let cpuUsedPercent = Math.round(usedCpu.value / activeProject.maxCpu * 100)
    return {
      activeProjectId,
      getActiveProject,
      maxCpu,
      maxRam,
      maxDisk,
      usedCpu,
      value: 0,
      cpuUsedPercent,
      activeProject
    }
  }
}
</script>
<style lang="">

</style>
