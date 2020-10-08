<template>
  <q-page class="flex column justify-start">
    <deleteCard v-if="showDelete" :card='selectCard' @close="showDelete = false, selectCard = null" />
    <deleteCardError v-if="showError" @close="showError = false, selectCard = null" />
    <div class="backMainPage flex justify-center items-center" @click="back()">
      <img src="../../statics/order_icons/arrow.svg" alt="">
    </div>
    <div class="pageTtl">{{ $t('yourСards') }}</div>
    <div class="topBorder" v-if="cards"></div>
    <q-item  class="cardItem" v-for="card in cards" :key="card.card_id">
      <q-item-section avatar class="cardImage">
        <img :src="'../../statics/payment_icons/' + cardIcon(card.pan)">
      </q-item-section>
      <q-item-section class="cardName">
        {{ cardName(card.pan) }}
      </q-item-section>
      <q-item-section side class="cardInfo">
        •••• <span>{{card.pan.slice(12)}}</span>
      </q-item-section>
      <q-item-section side>
        <div class="delCard flex justify-center items-center" @click="delCard(card)">
          <img src="../../statics/settings_icons/clear.svg" alt="">
        </div>
      </q-item-section>
    </q-item>
  </q-page>
</template>

<script>
import deleteCard from '../popUps/deleteCard'
import deleteCardError from '../popUps/deleteCardError'
import { mapGetters, mapActions } from 'vuex'
import cardIcons from '../../statics/cards'
export default {
  name: 'MyCardsPage',
  data () {
    return {
      showDelete: false,
      selectCard: null,
      showError: false
    }
  },
  beforeMount () {
    this.showBackBtn()
  },
  beforeDestroy () {
    clearTimeout(this.timer)
  },
  computed: {
    ...mapGetters({
      cards: 'user/payment/cards'
    })
  },
  methods: {
    ...mapActions({
      checkCard: 'user/payment/checkCard'
    }),
    cardIcon (pan) {
      if (pan[0] === '4' || pan[0] === '2') {
        let card = cardIcons.find(card => card.code === pan[0])
        return card.image
      } else {
        let card = cardIcons.find(card => card.code === pan.slice(0, -14))
        return card.image
      }
    },
    cardName (pan) {
      if (pan[0] === '4' || pan[0] === '2') {
        let card = cardIcons.find(card => card.code === pan[0])
        return card.value
      } else {
        let card = cardIcons.find(card => card.code === pan.slice(0, -14))
        return card.value
      }
    },
    back () {
      this.$emit('backPay')
    },
    showBackBtn () {
      this.$root.$emit('hideMenu')
      this.showBack = true
    },
    delCard (selectCard) {
      this.checkCard(selectCard)
        .then(response => {
          this.selectCard = selectCard
          this.showDelete = true
        })
        .catch(error => {
          console.log(error)
          this.showDelete = true
          this.showError = true
        })
    }
  },
  components: {
    deleteCard,
    deleteCardError
  }
}
</script>

<style>
  .cardItem{
    width: 100%;
    background-color: #F8F8F8;
    border-bottom: 1px solid rgba(0,0,0,0.2);
    padding: 0 32px;
  }
  .topBorder{
    border-bottom: 1px solid rgba(0,0,0,0.2);
  }
  .cardItem .q-item{
    padding: 12px 28px 12px 34px;
  }
  .cardItem:first-child{
    background-color: #ff0000;
  }
  .cardImage img{
    width: 32px;
  }
  .cardName{
    line-height: 16px;
    color: #688AF5;
    font-weight: 600;
    font-size: 16px;
  }
  .cardInfo{
    flex-flow: nowrap;
    justify-content: center;
    align-items: center !important;
    font-weight: 500;
    line-height: 14px;
    letter-spacing: -0.4px;
    color: #4A4A4A;
    font-size: 16px;
  }
  .cardInfo span{
    width: 40px;
    text-align: right;
  }
  .delCard{
    width: 24px;
    height: 24px;
  }
  .rightSlide{
    background-color: #00ADEE;
  }
</style>
