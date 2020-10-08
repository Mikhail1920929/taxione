<template>
  <div class="popUpBg flex items-center justify-center">
    <div class="popUpBox">
      <div class="popUpTtl">
        {{ $t('deleteAccount') }}
        <div class="popUpInfo">
          {{ $t('deleteAccountInfo') }}
        </div>
      </div>
      <div class="popUpBtns flex justify-between">
        <div class="cancel" @click="deleteAcc()">{{ $t('delete') }}</div>
        <div class="close" @click="close()">{{ $t('cancel') }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'deletePopUp',
  data () {
    return {
    }
  },
  methods: {
    ...mapActions({
      deleteUser: 'user/auth/deleteUser'
    }),
    deleteAcc () {
      this.deleteUser()
    },
    close () {
      this.$emit('close')
    }
  }
}
</script>

<style>
</style>
