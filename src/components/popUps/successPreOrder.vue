<template>
  <div class="popUpBg flex items-center justify-center">
    <div class="popUpBox">
      <div class="popUpTtl">
        {{ $t('preOrderInfo') }}
      </div>
      <div class="popUpBtn flex justify-center" @click="$emit('closePreOrder')">
        {{ $t('notForget') }}
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
  }
}
</script>

<style>
</style>
