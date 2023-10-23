<template lang="">
  <div class="text-center">
  <div class="text-primary text-h5">RAM Used</div>
  <q-circular-progress
      show-value
      class="text-white q-ma-md"
      :value=ramUsedPercent
      size="90px"
      :thickness="0.2"
      color="orange"
      center-color="grey-8"
      track-color="transparent"
    >
    {{ramUsedPercent}}%
    </q-circular-progress>
    <div>Total: {{activeProject.maxRam}} | Used: {{ usedRam }}</div>
  </div>
</template>
<script>
import { useProjectStore} from '../../../stores/projectStore'
import { storeToRefs } from 'pinia'
export default {
  setup() {
    const store = useProjectStore()
    const { activeProjectId, getActiveProject, maxDisk, usedCpu, usedRam, useDisk } = storeToRefs(store)
    const activeProject = getActiveProject.value

    let ramUsedPercent = Math.round(usedRam.value / activeProject.maxRam * 100)
    return {
      activeProjectId,
      getActiveProject,
      maxDisk,
      usedCpu,
      usedRam,
      useDisk,
      value: 0,
      ramUsedPercent,
      activeProject
    }
  }
}
</script>
<style lang="">

</style>
