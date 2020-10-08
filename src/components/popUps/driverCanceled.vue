<template>
  <div class="popUpBg flex items-center justify-center">
    <div class="popUpBox">
      <div class="popUpTtl">
        {{ $t('driverCancelRide') }}
      </div>
      <div class="popUpBtn flex justify-center" @click="noDriver()">
        {{ $t('continue') }}
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'cancelRide',
  data () {
    return {
    }
  },
  methods: {
    ...mapActions({
      clearStatus: 'ride/noDriver',
      clearRideStatus: 'user/user/clearRideStatus'
    }),
    noDriver () {
      this.clearRideStatus()
      this.clearStatus()
      this.$emit('driverCanceled')
    }
  }
}
</script>

<style>
</style>
