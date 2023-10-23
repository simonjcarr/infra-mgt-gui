<template lang="">
  <div>
    <q-list bordered>
      <q-item-label header>Project Users</q-item-label>
      <q-item clickable v-ripple v-for="user in getActiveProject.users" :key="user._id">
        <q-item-section avatar>
          <q-img src="user.png" />
        </q-item-section>

        <q-item-section>{{user.name}}</q-item-section>
      </q-item>
    </q-list>
  </div>
</template>
<script>
import {useProjectStore} from '../../../stores/projectStore'
import { storeToRefs } from 'pinia'
export default {
  setup() {
    const store = useProjectStore()
    const { activeProjectId, getActiveProject } = storeToRefs(store)
    return {
      activeProjectId,
      getActiveProject
    }
  }
}
</script>
<style lang="">
  
</style>