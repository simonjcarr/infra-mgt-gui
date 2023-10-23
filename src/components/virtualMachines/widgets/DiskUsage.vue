<template lang="">
  <div class="text-center">
  <div class="text-primary text-h5">Disk Used</div>
  <q-circular-progress
      show-value
      class="text-white q-ma-md"
      :value=diskUsedPercent
      size="90px"
      :thickness="0.2"
      color="orange"
      center-color="grey-8"
      track-color="transparent"
    >
    {{diskUsedPercent}}%
    </q-circular-progress>
    <div>Total: {{activeProject.maxDisk}} GB | Used: {{ usedDisk }} GB</div>
  </div>
</template>
<script>
import { useProjectStore} from '../../../stores/projectStore'
import { storeToRefs } from 'pinia'
export default {
  setup() {
    const store = useProjectStore()
    const { activeProjectId, getActiveProject, maxCpu, maxRam, maxDisk, usedCpu, usedRam, usedDisk } = storeToRefs(store)
    const activeProject = getActiveProject.value
    let diskUsedPercent = Math.round(usedDisk.value / activeProject.maxDisk * 100)
    return {
      activeProjectId,
      getActiveProject,
      maxCpu,
      maxRam,
      maxDisk,
      usedCpu,
      usedRam,
      usedDisk,
      value: 0,
      diskUsedPercent,
      activeProject
    }
  }
}
</script>
<style lang="">

</style>
