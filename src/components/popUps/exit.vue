<template>
  <div class="popUpBg flex items-center justify-center">
    <div class="popUpBox">
      <div class="popUpTtl">
        {{ $t('exitAccount') }}
      </div>
      <div class="popUpBtns flex justify-between">
        <div class="cancel" @click="exit()">{{ $t('exit') }}</div>
        <div class="close" @click="close()">{{ $t('cancel') }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'exitPopUp',
  data () {
    return {
    }
  },
  methods: {
    ...mapActions({
      logout: 'user/auth/logout'
    }),
    close () {
      this.$emit('close')
    },
    exit () {
      this.$emit('close')
      this.logout()
    }
  }
}
</script>

<style>
</style>
