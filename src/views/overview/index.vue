<template>
  <AdminPage v-if="role === 'admin'"></AdminPage>
  <VolunteerPage v-if="role === 'volunteer'"></VolunteerPage>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import AdminPage from './admin/overview/index.vue'
import VolunteerPage from './volunteer/overview/index.vue'

const role = ref('')
onMounted(() => {
  role.value = 'admin'
})

</script>