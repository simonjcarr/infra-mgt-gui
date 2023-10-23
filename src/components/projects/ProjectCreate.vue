<!-- eslint-disable vue/no-v-text-v-html-on-component -->
<template lang="">
  <q-btn color="primary" icon="add" label="New Project" size="sm" @click="showFormClick" />
  <q-dialog v-model="showForm">
    <q-card style="min-width: 500px">
      <q-card-section class="row items-center q-pb-none">
        <div class="text-h6">Create Project</div>
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup />
      </q-card-section>

      <q-card-section>
        <q-form
          @submit.prevent="handleFormSubmit"
          class="q-gutter-md"
        >
          <div>
            <q-input
              v-model="form.name"
              label="Name"
              lazy-rules
              :rules="[val => !!val || 'Required']"
            />
          </div>
          <div>
            <q-input
              v-model="form.description"
              type="textarea"
              label="Description"
              lazy-rules
            />
          </div>
          <div>
            <q-input
              v-model="form.maxCpu"
              label="CPU Allocation"
              lazy-rules
              type="number"
              :rules="[val => !!val || 'Required']"
            />
          </div>
          <div>
            <q-input
              v-model="form.maxRam"
              label="RAM Allocation"
              lazy-rules
              type="number"
              :rules="[val => !!val || 'Required']"
            />
          </div>
          <div>
            <q-input
              v-model="form.maxDisk"
              label="Disk Allocation"
              lazy-rules
              type="number"

              :rules="[val => val >= 0 || 'Must be greater than 0']"
            />
          </div>
          <div>
            <q-select
              v-model="form.users"
              label="Users"
              multiple
              :options="users"
              :option-value="val => val._id"
              option-label="name"
              :rules="[val => !!val || 'Required']"
            >
            <template v-slot:option="{ itemProps, opt, selected, toggleOption }">
          <q-item v-bind="itemProps">
            <q-item-section>
              <q-item-label v-html="opt.name" />
            </q-item-section>
            <q-item-section side>
              <q-toggle :model-value="selected" @update:model-value="toggleOption(opt)" />
            </q-item-section>
          </q-item>
        </template>
            </q-select>
          </div>
          <div>
            <q-btn label="Create" type="submit" color="primary"/>
          </div>
        </q-form>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>
<script>
import { useProjectStore } from "../../stores/projectStore";
import { useUserStore } from "src/stores/userStore";
import { storeToRefs } from "pinia";
import { ref } from "vue";
export default {
  setup() {
    const userStore = useUserStore();
    const { users } = storeToRefs(userStore);
    let showForm = ref()
    let form = ref({
        name: "",
        description: "",
        maxCpu: 0,
        maxRam: 0,
        maxDisk: 0,
        users: [],
        adminUsers: []
      })
    const handleFormSubmit = () => {
      const projectStore = useProjectStore();
      projectStore.storeProject(form.value);
      showForm.value = false;
    };
    return {
      users,
      handleFormSubmit,
      showForm,
      form
    }
  },
  name: "ProjectCreate",
  data() {
    return {
      // showForm: false,
      // form: {
      //   name: "",
      //   description: "",
      //   maxCpu: 0,
      //   maxRam: 0,
      //   maxDisk: 0,
      //   users: [],
      //   adminUsers: []
      // },
    };
  },
  methods: {
    showFormClick() {
      this.showForm = true;
    },
  },
};
</script>
=
