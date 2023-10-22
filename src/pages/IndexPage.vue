<template>
  <q-page class="">
    <div class="q-pa-md">
      <div class="row">
        <div class="col-6">
          <q-card class="my-card bg-secondary text-white">
            <q-card-section>
              <div class="text-h6">Projects</div>
            </q-card-section>

            <q-card-section>
              <ProjectList />
            </q-card-section>

            <q-separator dark />

            <q-card-actions>
              <q-btn flat>Create</q-btn>
              <q-btn flat>Settings</q-btn>
            </q-card-actions>
          </q-card>
          
        </div>
        <div class="col-6">
          Col 2
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>


import { defineComponent } from 'vue'
import ProjectList from '../components/projects/ProjectList.vue'
export default defineComponent({
  name: 'IndexPage',
  components: {
    ProjectList
  }
})
</script>
