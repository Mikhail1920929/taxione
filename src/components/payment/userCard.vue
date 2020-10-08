<template>
  <div class="userCard flex items-center" v-if="userCard">
    <img :src="'../../statics/payment_icons/' + cardIcon( userCard.pan )">
    •••• {{userCard.pan.slice(12)}}
  </div>
</template>

<script>
import cardIcons from '../../statics/cards'
import { mapGetters } from 'vuex'
export default {
  name: 'userCard',
  computed: {
    ...mapGetters({
      cards: 'user/payment/cards',
      card: 'user/user/card'
    }),
    userCard () {
      if (this.cards && this.card !== null) {
        return this.cards.find(card => card.card_id === this.card.card_id)
      } else {
        return false
      }
    }
  },
  methods: {
    cardIcon (pan) {
      if (pan[0] === '4' || pan[0] === '2') {
        let card = cardIcons.find(card => card.code === pan[0])
        return card.image
      } else {
        let card = cardIcons.find(card => card.code === pan.slice(0, -14))
        return card.image
      }
    }
  }
}
</script>

<style>
  .userCard img{
    width: 32px;
    max-height: 24px;
    margin-right: 8px;
  }
</style>
