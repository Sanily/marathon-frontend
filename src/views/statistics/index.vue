<template>
  <AdminPage v-if="role === 'ADMIN'"></AdminPage>
  <VolunteerPage v-if="role === 'VOLUNTEER'"></VolunteerPage>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import AdminPage from './admin/index.vue'
import VolunteerPage from './volunteer/index.vue'

const role = ref('')
onMounted(() => {
  role.value = localStorage.getItem('global_role') || 'VOLUNTEER'
})

</script>