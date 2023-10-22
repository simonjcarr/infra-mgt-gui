<template>
  <q-page class="">
    <div class="q-pa-md">
      <div class="row">
        <div class="col-6">
          <ProjectList />
        </div>
        <div class="col-6">
          <VirtualMachineList />
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>


import { defineComponent } from 'vue'
import ProjectList from '../components/projects/ProjectList.vue'
import VirtualMachineList from '../components/virtualMachines/VirtualMachineList.vue'
export default defineComponent({
  name: 'IndexPage',
  components: {
    ProjectList,
    VirtualMachineList
  }
})
</script>
