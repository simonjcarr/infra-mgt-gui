<template lang="">
  <q-list dense bordered v-if="getActiveVM">
    <q-item>
      <q-item-section>
        <q-item-label lines="1">Name</q-item-label>
      </q-item-section>
      <q-item-section>
        <q-item-label lines="1">{{getActiveVM.name}}</q-item-label>
      </q-item-section>
    </q-item>
    <q-item>
      <q-item-section>
        OS Family
      </q-item-section>
      <q-item-section>
        <div class="flex">
          <q-img style="width: 20px" :src="getOsImage(getActiveVM.osFamily)" class="q-mr-sm" />
          <q-item-label lines="1" class="text-uppercase">{{getActiveVM.osFamily}}</q-item-label>
        </div>
      </q-item-section>
    </q-item>
    <q-item>
      <q-item-section>
        <q-item-label lines="1">Hostname</q-item-label>
      </q-item-section>
      <q-item-section>
        <q-item-label lines="1">{{getActiveVM.hostname}}</q-item-label>
      </q-item-section>
    </q-item>
    <q-item>
      <q-item-section>
        <q-item-label lines="1">CPU</q-item-label>
      </q-item-section>
      <q-item-section>
        <q-item-label lines="1">{{getActiveVM.cpu}} Cores</q-item-label>
      </q-item-section>
    </q-item>
    <q-item>
      <q-item-section>
        <q-item-label lines="1">RAM</q-item-label>
      </q-item-section>
      <q-item-section>
        <q-item-label lines="1">{{getActiveVM.ram}} GB</q-item-label>
      </q-item-section>
    </q-item>
    <q-item>
      <q-item-section>
        <q-item-label lines="1">Disk [OS]</q-item-label>
      </q-item-section>
      <q-item-section>
        <q-item-label lines="1">{{getActiveVM.disk}} GB</q-item-label>
      </q-item-section>
    </q-item>
    <q-item v-for="disk in getActiveVM.otherDisks" :key="disk.name">
      <q-item-section>
        <q-item-label lines="1">Disk [{{disk.name}}]</q-item-label>
      </q-item-section>
      <q-item-section>
        <q-item-label lines="1">{{disk.size}} GB ({{disk.mountPoint}})</q-item-label>
      </q-item-section>
    </q-item>
  </q-list>
</template>
<script>
import { useVmStore } from 'src/stores/vmStore';
import { storeToRefs } from 'pinia';
import { ref } from 'vue';
export default {
  setup() {
    const vmStore = useVmStore();
    const { activeVmId, getVmsByProjectId, getOsImage, getActiveVM} = storeToRefs(vmStore);
    return {
      getOsImage,
      activeVmId,
      getActiveVM,
    };
  },
}
</script>
<style lang="">

</style>
