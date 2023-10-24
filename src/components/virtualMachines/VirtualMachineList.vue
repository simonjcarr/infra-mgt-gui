<template lang="">
  <q-list bordered class="rounded-borders" style="min-height: 200px">
      <q-item-label header>Project Virtual Machines</q-item-label>
      <q-item clickable v-ripple v-for="vm in projectVms" :key="vm._id" @click="setActiveVmClick(vm._id)">
        <q-item-section avatar>
          <q-avatar>
            <img :src="getOsImage(vm.osFamily)">
          </q-avatar>
        </q-item-section>

        <q-item-section>
          <q-item-label lines="1">{{vm.name}}</q-item-label>
          <q-item-label caption lines="2">
            <span class="text-weight-bold">{{vm.hostname}}</span>
            -- {{vm.description}}
          </q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
</template>
<script>
import { useProjectStore } from "../../stores/projectStore";
import { useVmStore } from "../../stores/vmStore";
import { storeToRefs } from "pinia";
import { ref } from "vue";
export default {
  setup() {
    const projectStore = useProjectStore();
    const { projects, getActiveProject, activeProjectId } = storeToRefs(projectStore);

    const vmStore = useVmStore();
    vmStore.getVms()
    const { activeVmId, getVmsByProjectId, getOsImage} = storeToRefs(vmStore);

    let projectVms = ref([]);
    (async () => {
      projectVms.value = await getVmsByProjectId.value(activeProjectId.value);

    })()

    const setActiveVmClick = (id) => {
      vmStore.setActiveVm(id);
    };


    return {
      getOsImage,
      activeVmId,
      projectVms,
      setActiveVmClick,
    };
  },
};
</script>
//       maxCpu: 0,
