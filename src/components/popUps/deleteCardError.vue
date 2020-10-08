<template>
  <div class="popUpBg flex items-center justify-center">
    <div class="popUpBox">
      <div class="popUpTtl">
        {{ $t('deleteCardError') }}
      </div>
      <div class="popUpBtn flex justify-center" @click="$emit('close')">
        {{ $t('ok') }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'deleteCardError'
}
</script>

<style>
</style>
