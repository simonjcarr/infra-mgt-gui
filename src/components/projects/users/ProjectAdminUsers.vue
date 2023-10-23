<template lang="">
  <div>
    <q-scroll-area style="height: 250px;">
      <q-list bordered style="min-height: 250px">
        <q-item-label header>Project Admin Users</q-item-label>
        <q-item clickable v-ripple v-for="user in getActiveProject.adminUsers" :key="user._id">
          <q-item-section avatar>
            <q-img src="user.png" />
          </q-item-section>

          <q-item-section>{{getUserById(user._id).name}}</q-item-section>
        </q-item>
      </q-list>
    </q-scroll-area>
  </div>
</template>
<script>
import { useProjectStore } from '../../../stores/projectStore'
import { useUserStore } from '../../../stores/userStore'
import { storeToRefs } from 'pinia'
export default {
  setup() {
    const projectStore = useProjectStore()
    const userStore = useUserStore()
    const { activeProjectId, getActiveProject } = storeToRefs(projectStore)
    const getUserById = (id) => {
      const user = userStore.getUser(id)
      return user
    }
    return {
      activeProjectId,
      getActiveProject,
      getUserById
    }
  }
}
</script>
<style lang="">

</style>
