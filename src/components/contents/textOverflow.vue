<template>
  <div class="text-tooltip">
    <a-tooltip :visible="isShowTooltip" placement="top">
      <template #title>
        {{ text }}
      </template>
      <div
        class="over-flow"
        :class="className"
        @mouseover="onMouseOver"
        @mouseout="onMouseOut"
      >
        <span ref="refName">{{ text || noText }}</span>
      </div>
    </a-tooltip>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, ref } from 'vue'

export default defineComponent({
  name: 'textOverflow',
  props: {
    text: {
      type: [Object, String, Array],
      default: '-',
    },
    className: {
      type: String,
      default: () => '',
    },
    noText: {
      type: [String, Number],
      default: '',
    },
  },
  setup() {
    const refName: any = ref(null)
    const state = reactive({
      isShowTooltip: false,
    })

    const onMouseOver = () => {
      if (refName.value) {
        const parentWidth = refName.value.parentNode.offsetWidth
        const contentWidth = refName.value.offsetWidth
        // 判断是否开启tooltip功能
        if (contentWidth > parentWidth) {
          state.isShowTooltip = true
        } else {
          state.isShowTooltip = false
        }
      }
    }

    const onMouseOut = () => {
      state.isShowTooltip = false
    }

    return {
      onMouseOver,
      onMouseOut,
      refName,
      ...toRefs(state),
    }
  },
})
</script>

<style lang="less" scoped>
.text-tooltip {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  outline: none !important;
  &:focus,
  &::foucs {
    outline: none !important;
  }
}
.over-flow {
  overflow: hidden !important;
  white-space: nowrap;
  text-overflow: ellipsis;
  outline: none !important;
  &:focus,
  &::foucs {
    outline: none !important;
  }
}
p {
  margin: 0;
}
</style>
