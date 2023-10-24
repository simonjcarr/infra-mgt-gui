<!-- eslint-disable vue/no-v-text-v-html-on-component -->
<template lang="">
  <q-btn
    dense
    color="primary"
    icon="add"
    label="New VM"
    size="sm"
    @click="showFormClick"
  />
  <q-dialog v-model="showForm" persistent >
    <q-card style="min-width: 500px">
      <q-card-section class="row items-center q-pb-none">
        <div class="text-h6">Create Virtual Machine</div>
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup />
      </q-card-section>
      <q-card-section>
        <q-form dense @submit.prevent="handleFormSubmit" class="q-gutter-md">
          <div>
            <q-input
              dense
              v-model="form.name"
              label="VM Name"
              lazy-rules
              :rules="[(val) => !!val || 'Required']"
            />
          </div>
          <div>
            <q-input
              dense
              v-model="form.hostname"
              label="Hostname"
              lazy-rules
              :rules="[(val) => !!val || 'Required']"
            />
          </div>
          <div>
            <q-input
              dense
              v-model="form.cpu"
              type="number"
              label="CPU"
              lazy-rules
              :rules="[(val) => !!val || 'Required']"
            />
          </div>
          <div>
            <q-input
              dense
              v-model="form.ram"
              type="number"
              label="RAM"
              lazy-rules
              :rules="[(val) => !!val || 'Required']"
            />
          </div>
          <div>
            <q-input
              dense
              v-model="form.disk"
              label="OS Disk Size"
              type="number"
              disabled
              lazy-rules
              :rules="[(val) => !!val || 'Required']"
            />
          </div>
          <div>
            <q-select
              dense
              v-model="form.os"
              :options="osOptions"
              label="Operating System"
              option-label="os"
              :rules="[(val) => !!val || 'Required']"
            >
              <template
                v-slot:option="{ itemProps, opt, selected, toggleOption }"
              >
                <q-item dense v-bind="itemProps">
                  <q-item-section>
                    <q-item-label v-html="opt.os" />
                  </q-item-section>
                  <q-item-section side>
                    <q-toggle
                      :model-value="selected"
                      @update:model-value="toggleOption(opt)"
                    />
                  </q-item-section>
                </q-item>
              </template>
            </q-select>
          </div>
          <div>
            Other Disks
            <q-list bordered>
              <q-item v-for="disk in form.otherDisks" :key="disk.name">
                <q-item-section>{{disk.name}}</q-item-section>
                <q-item-section>{{disk.size}} GB</q-item-section>
                <q-item-section>{{disk.mountPoint}}</q-item-section>
                <q-item-section side>
                  <q-btn dense icon="delete" @click="form.otherDisks.splice(form.otherDisks.indexOf(disk), 1)" />
                </q-item-section>
              </q-item>
            </q-list>

              <input type="text" style="width: 120px" placeholder="Name" v-model="otherDisk.name">
              <input type="number" style="width: 90px" class="q-ml-xs"  placeholder="Size (GB)" v-model="otherDisk.size">
              <input type="text" style="width: 120px" class="q-ml-xs" placeholder="Mount Point" v-model="otherDisk.mountPoint">
              <q-btn size="sm" label="Add" class="q-ml-xs" color="primary" @click="form.otherDisks.push(otherDisk); otherDisk = {}" />

          </div>
          <div>
            <q-btn label="Create" type="submit" color="primary" />
          </div>
        </q-form>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>
<script>
import { useVmStore } from "../../stores/vmStore";
import { useUserStore } from "src/stores/userStore";
import { useProjectStore } from "src/stores/projectStore";
import { storeToRefs } from "pinia";
import { ref, watch } from "vue";
export default {
  setup() {
    const userStore = useUserStore();
    const { users } = storeToRefs(userStore);
    const vmStore = useVmStore();
    const { osOptions } = storeToRefs(vmStore);
    const projectStore = useProjectStore();
    const { activeProjectId } = storeToRefs(projectStore);
    let showForm = ref();
    let otherDisk = ref({
      name: "",
      size: 0,
      mountPoint: ""
    })
    let form = ref({
      name: "",
      hostname: "",
      description: null,
      cpu: 0,
      ram: 0,
      disk: 0,
      otherDisks: [],
      users: [],
      os: {},
      project: activeProjectId.value,
      createStatus: "not-started",
    });

    const handleFormSubmit = () => {
      console.log(JSON.stringify(form.value))
      vmStore.storeVm(form.value);
      showForm.value = false;
    };
    return {
      users,
      handleFormSubmit,
      showForm,
      form,
      osOptions,
      otherDisk
    };
  },
  name: "ProjectCreate",
  data() {
    return {};
  },
  methods: {
    showFormClick() {
      this.showForm = true;
    },
  },
};
</script>
=
