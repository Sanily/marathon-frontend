import { ref } from 'vue'

export default function useLoading() {
  const loading = ref(false)
  return {
    isLoading: () => loading.value,
    setLoading: () => (loading.value = true),
    resetLoading: () => (loading.value = false),
  }
}
