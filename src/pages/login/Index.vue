<template>
  <div>
    <sendCode v-show="showSend" @goConfirm="showSend = false, showConfirm = true" />
    <confirmUser v-if="showConfirm" @editPhone="showConfirm = false, showSend = true" />
  </div>
</template>

<script>
import sendCode from '../../components/login/sendCode'
import confirmUser from '../../components/login/confirmUser'
export default {
  name: 'PageLogin',
  data () {
    return {
      showSend: true,
      showConfirm: false
    }
  },
  components: {
    sendCode,
    confirmUser
  }
}
</script>

<style>
</style>
