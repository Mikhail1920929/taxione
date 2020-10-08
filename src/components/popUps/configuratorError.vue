<template>
  <div class="popUpBg flex items-center justify-center">
    <div class="popUpBox">
      <div class="popUpTtl">
        {{ error }}
      </div>
      <div class="popUpBtn flex justify-center" @click="closeError()">
        {{ $t('continue') }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'orderError',
  data () {
    return {
    }
  },
  methods: {
    closeError () {
      sessionStorage.clear()
      this.$emit('closeError')
    }
  },
  props: ['error']
}
</script>

<style>
</style>
