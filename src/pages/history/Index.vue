<template>
  <q-page class="flex column justify-between">
    <div class="settingsHeader">
      <router-link class="backMainPage flex justify-center items-center" :to="{name: 'ride'}">
        <img src="../../statics/order_icons/arrow.svg" alt="">
      </router-link>
      <div class="pageTtl">{{ $t('history') }}</div>
      <div class="historyBlock" v-for="ride in history" :key="ride.id">
        <div class="historyDay flex items-center">
          <div class="historyDayImg">
            <img src="../../statics/history_icons/calendar.svg" alt="">
          </div>
          <div class="historyDayInfo">{{ ride.start_at | date }}, {{ $t('executed') }} {{ ride.start_at | time }}</div>
        </div>
        <q-expansion-item
          class="historyPlace"
          icon="img:../../statics/history_icons/location.svg"
          :label="ride.position.city + ', ' + ride.position.country"
        >
          <div class="historyPlaceInfo flex">
            <div class="stepsHistory flex column justify-between items-center">
              <div class="stepHistory"></div>
              <div class="stepHistory stepHistory_active"></div>
            </div>
            <div class="historyPlaces flex column justify-between">
              <div class="historyPlaceFromTo">{{ride.position.text}}</div>
              <div class="historyPlacesSeparator"></div>
              <div class="historyPlaceFromTo">{{ride.destination.text}}</div>
            </div>
          </div>
        </q-expansion-item>
        <div class="historyPay flex justify-between items-center" v-if="ride.payment.billing_id">
          <div class="historyPayType">
            <span v-if="ride.payment.biller_type === 'company'">{{ $t('corporate') }}</span>
            <span class="payCard flex items-center" v-if="ride.payment.billing && ride.payment.billing_id && ride.payment.biller_type === 'client'">
              <img :src="'../../statics/payment_icons/' + cardIcon( ride.payment.billing.pan )">
              <span v-if="ride.payment.billing.pan">••••</span> {{ ride.payment.billing.pan.slice(12) }}
            </span>
          </div>
          <div class="historyPayCost" v-if="ride.payment.amount">
            <span v-if="ride.payment.status === 'CONFIRMED' || ride.payment.status === 'NEW'">{{ride.payment.amount.amount}} {{priceCurrency(ride.payment.amount).value}}</span>
            <span v-else-if="!ride.payment.status && ride.ride_status_name === 'complete'">{{ $t('receive') }}</span>
            <span v-else>0 {{priceCurrency(ride.payment.amount).value}}</span>
          </div>
        </div>
      </div>
      <div class="nextBtn" v-if="history_meta">
        <button class="mainBtn" v-if="history_meta.current_page < history_meta.last_page" @click="nextPage()">{{ $t('showMore') }}</button>
      </div>
    </div>
  </q-page>
</template>

<script>
import moment from 'moment'
import { mapActions, mapGetters } from 'vuex'
import currency from '../../statics/currency'
import cardIcons from '../../statics/cards'
export default {
  name: 'PageHistory',
  data () {
    return {
      showBack: false
    }
  },
  beforeMount () {
    this.showBackBtn()
    this.getUser()
    this.historyGet()
  },
  computed: {
    ...mapGetters({
      history: 'user/user/history',
      history_meta: 'user/user/history_meta',
      user: 'user/user/user'
    })
  },
  methods: {
    ...mapActions({
      getUser: 'user/user/getUser',
      historyGet: 'user/user/getHistory',
      nextPage: 'user/user/historyNextPage'
    }),
    moment () {
      return moment()
    },
    showBackBtn () {
      this.$root.$emit('hideMenu')
      this.showBack = true
    },
    priceCurrency (rideCurrency) {
      return currency.find(currency => currency.code === rideCurrency.currency)
    },
    cardIcon (pan) {
      if (pan[0] === '4' || pan[0] === '2') {
        let card = cardIcons.find(card => card.code === pan[0])
        return card.image
      } else {
        let card = cardIcons.find(card => card.code === pan.slice(0, -14))
        return card.image
      }
    }
  },
  filters: {
    date: function (date) {
      return moment(date).format('DD.MM.YYYY')
    },
    time: function (date) {
      return moment(date, 'YYYY-MM-DD[T]HH:mm:ss').format('HH:mm')
    }
  }
}
</script>

<style>
  .historyBlock{
    background: #FDFDFD;
    box-shadow: 0px 2px 4px rgba(104, 138, 245, 0.25);
    border-radius: 12px;
    margin: 0 16px;
    font-weight: 500;
    font-size: 14px;
    line-height: 16px;
    letter-spacing: -0.4px;
    color: #4A4A4A;
    margin-bottom: 10px;
  }
  .historyDay{
    padding: 10px;
    border-bottom: 1px solid rgba(0,0,0,0.2);
  }
  .historyDayImg{
    margin-right: 16px;
  }
  .historyPlace{
    margin: 10px 0 0;
  }
  .historyPlace .q-item{
    padding: 0 10px;
    min-height: 0;
    margin-bottom: 10px;
  }
  .historyPlace .q-item__section--avatar{
    min-width: 0;
  }
  .historyPlaceInfo{
    border-top: 1px solid rgba(0,0,0,0.2);
  }
  .stepsHistory {
    width: 24px;
    position: relative;
    height: 65px;
    margin: 10px;
  }
  .stepsHistory:after {
    position: absolute;
    content: '';
    top: 35%;
    left: 49%;
    width: 2px;
    height: 22px;
    opacity: 0.5;
    background: #9B9B9B;
    border-radius: 1px;
  }
  .stepHistory {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: #816FF6;
    border: 3px solid #fff;
    box-shadow: 2px 2px 4px 0 rgba(0,0,0,0.05), -4px -4px 8px 0 #FDFDFD, 4px 4px 8px 0 rgba(0,0,0,0.10), 6px 6px 12px 0 #FDFDFD;
    transition: all .2s ease-in-out;
    z-index: 2;
  }
  .stepHistory_active {
    background-color: #688AF5;
    width: 16px;
    height: 16px;
    border: 3px solid #fff;
  }
  .historyPlaces{
    width: calc(100% - 44px);
    height: 65px;
    font-weight: 500;
    font-size: 15px;
    line-height: 18px;
    margin-top: 10px;
  }
  .historyPlacesSeparator{
    width: 100%;
    height: 1px;
    background: rgba(0,0,0,0.2);
  }
  .historyPay{
    border-top: 1px solid rgba(0,0,0,0.2);
    padding: 16px 16px;
  }
  .historyPayType{
    font-weight: 600;
    font-size: 13px;
    line-height: 14px;
    letter-spacing: -0.4px;
  }
  .historyPayCost{
    font-size: 17px;
    line-height: 17px;
    letter-spacing: -0.303571px;
    color: #688AF5;
  }
  .nextBtn{
    margin: 16px;
  }
  .payCard img{
    width: 32px;
    max-height: 24px;
    margin-right: 8px;
  }
</style>
