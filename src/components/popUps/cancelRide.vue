<template>
  <div class="popUpBg flex items-center justify-center">
    <div class="popUpBox">
      <div class="popUpTtl">
        {{ $t('cancelRide') }}
      </div>
      <div class="popUpBtns flex justify-between">
        <div class="close" @click="close()">{{ $t('close') }}</div>
        <div class="cancel" @click="closeAndCancel()">{{ $t('cancel') }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'cancelRidePopUp',
  data () {
    return {
    }
  },
  methods: {
    close () {
      this.$emit('close')
    },
    closeAndCancel () {
      sessionStorage.clear()
      this.clearRideStatus()
      this.deleteRide()
      this.$emit('canceled')
      this.$emit('close')
    },
    ...mapActions({
      deleteRide: 'ride/deleteRide',
      clearRide: 'ride/noDriver',
      clearRideStatus: 'user/user/clearRideStatus'
    })
  }
}
</script>

<style scoped>
  .close {
    border-right: 1px solid rgba(0,0,0,0.2);
  }
  .cancel {
    border: none;
  }
</style>
