<template lang="">
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
export default {
  components: {
    CPUUsage,
    RAMUsage,
    DiskUsage,
    ProjectUsers
  }
}
</script>
