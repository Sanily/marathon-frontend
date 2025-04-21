import { useRouter, useRoute } from 'vue-router'

export default function router() {
  const router = useRouter()
  const route = useRoute()

  const push = (options) => {
    router.push(options)
  }
  const back = () => {
    router.back()
  }

  return {
    router,
    route,
    push,
    back,
  }
}
