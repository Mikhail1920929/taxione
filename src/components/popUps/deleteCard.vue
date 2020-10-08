<template>
  <div class="popUpBg flex items-center justify-center">
    <div class="popUpBox">
      <div class="popUpTtl">
        {{ $t('deleteCard') }} •••• {{card.pan.slice(12)}}?
        <div class="popUpInfo">
          {{ $t('deleteCardInfo') }}
        </div>
      </div>
      <div class="popUpBtns flex justify-between">
        <div class="cancel" @click="deleteSelectCard()">{{ $t('delete') }}</div>
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
      deleteCard: 'user/payment/deleteCard',
      getCards: 'user/payment/getCards',
      getUser: 'user/user/getUser'
    }),
    deleteSelectCard () {
      this.deleteCard({ id: this.card.id })
        .then(response => {
          this.getUser()
          this.getCards()
        })
      this.$emit('close')
    },
    close () {
      this.$emit('close')
    }
  },
  props: ['card']
}
</script>

<style>
</style>
