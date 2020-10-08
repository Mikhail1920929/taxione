<template>
  <q-page class="">
    <deletePreorder v-if="showDeleteModal" :preorder="this.select" @close="showDeleteModal = false, select = null" />
    <div class="settingsHeader">
      <router-link class="backMainPage flex justify-center items-center" :to="{name: 'ride'}">
        <img src="../../statics/order_icons/arrow.svg" alt="">
      </router-link>
      <div class="pageTtl">{{ $t('preOrder') }}</div>
      <router-link :to="{name: 'ride'}" class="addPreorder flex justify-between items-center">
        {{ $t('addPreorder') }}
        <img src="../../statics/settings_icons/plus.svg" alt="">
      </router-link>
      <div class="preorderSeparator" v-if="preorders"></div>
      <div class="preorderBlock" v-for="preorder in preorders" :key="preorder.id">
        <div class="preorderDay flex items-center">
          <div class="preorderDayImg">
            <img src="../../statics/history_icons/calendar.svg" alt="">
          </div>
          <div class="preorderDayInfo">{{ preorder.start_at | date }} {{ $t('inTime')}} {{preorder.start_at | time}}</div>
          <div class="preorderMeet" v-if="preorder === true">{{ $t('meet') }}</div>
        </div>
        <q-expansion-item
          class="preorderPlace"
          icon="img:../../statics/history_icons/location.svg"
          :label="preorder.position.city + ', ' + preorder.position.country"
        >
          <div class="preorderPlaceInfo flex">
            <div class="stepsPreorder flex column justify-between items-center">
              <div class="stepPreorder"></div>
              <div class="stepPreorder stepPreorder_active"></div>
            </div>
            <div class="preorderPlaces flex column justify-between">
              <div class="preorderPlaceFromTo">{{preorder.position.text}}</div>
              <div class="preorderPlacesSeparator"></div>
              <div class="preorderPlaceFromTo">{{preorder.destination.text}}</div>
            </div>
          </div>
        </q-expansion-item>
        <div class="preorderPay flex justify-between items-center">
          <div class="preorderPayType">
            <span v-if="preorder.payment.biller_type === 'company'">{{ $t('corporate') }}</span>
            <span class="payCard flex items-center" v-if="preorder.payment.billing_id && preorder.payment.biller_type === 'client' && cards">
              <img :src="'../../statics/payment_icons/' + cardIcon( preorder.payment.billing_id )">
              •••• {{ userPayMethod(preorder.payment.billing_id) }}
            </span>
          </div>
          <div class="preorderPayCost">
            ~ {{preorder.payment.amount.amount}} {{priceCurrency.value}}
          </div>
        </div>
        <div class="preorderBtns flex justify-between items-center">
          <div class="preorderBtnsEdit flex">
            <button class="preorderBtn" @click="order(preorder)">{{ $t('order') }}</button>
          </div>
          <div class="preorderBtnsCancel">
            <div class="editBtn flex justify-center items-center" @click="deletePreorder(preorder)">
              <img src="../../statics/history_icons/cancel.svg" alt="">
            </div>
          </div>
        </div>
      </div>
      <div class="nextBtn" v-if="preorders_meta">
        <button class="mainBtn" v-if="preorders_meta.current_page < preorders_meta.last_page" @click="nextPage()">{{ $t('showMore') }}</button>
      </div>
    </div>
  </q-page>
</template>

<script>
import deletePreorder from '../../components/popUps/deletePreorder'
import moment from 'moment'
import { mapActions, mapGetters } from 'vuex'
import currency from '../../statics/currency'
import cardIcons from '../../statics/cards.json'
export default {
  name: 'PagePreorder',
  data () {
    return {
      showDeleteModal: false,
      select: null
    }
  },
  beforeMount () {
    this.loadPreorders()
    this.showBackBtn()
  },
  computed: {
    ...mapGetters({
      preorders: 'user/preorder/preorders',
      preorders_meta: 'user/preorder/preorders_meta',
      user: 'user/user/user',
      card: 'user/user/card',
      cards: 'user/payment/cards',
      companies: 'user/user/companies',
      default_company: 'user/user/default_company'
    }),
    priceCurrency () {
      return currency.find(currency => currency.country_code === this.user.country.code)
    }
  },
  methods: {
    ...mapActions({
      editCard: 'user/user/editCard',
      editCompany: 'user/user/editCompany',
      loadPreorders: 'user/preorder/loadPreorders',
      nextPage: 'user/preorder/preorderNextPage',
      selectPreorder: 'user/preorder/selectPreorder'
    }),
    order (preorder) {
      this.selectPreorder({ id: preorder.id })
        .then(response => {
          this.$router.push({ name: 'ride' })
        })
    },
    deletePreorder (preorder) {
      this.select = preorder
      this.showDeleteModal = true
    },
    showBackBtn () {
      this.$root.$emit('hideMenu')
    },
    moment () {
      return moment()
    },
    userPayMethod (billingId) {
      return this.cards.find(card => card.id === billingId).pan.slice(12)
    },
    cardIcon (billingId) {
      var pan = this.cards.find(card => card.id === billingId).pan
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
  },
  components: {
    deletePreorder
  }
}
</script>

<style>
  .addPreorder{
    margin: 0 16px;
    font-weight: 600;
    font-size: 17px;
    line-height: 21px;
    letter-spacing: -0.354167px;
    color: rgba(255, 255, 255, 0.9);
    padding: 14px 16px;
    background: radial-gradient(100% 100% at 100% 100%, #688AF5 0%, #816FF6 100%);
    box-shadow: 0px 4px 12px rgba(242, 93, 112, 0.2), 0px 2px 4px rgba(129, 111, 246, 0.6);
    border-radius: 8px;
  }
  .preorderSeparator{
    width: 100%;
    height: 1px;
    background: rgba(0,0,0,0.2);
    margin: 20px 0;
  }
  .preorderBlock{
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
  .preorderDay{
    padding: 10px;
    border-bottom: 1px solid rgba(0,0,0,0.2);
  }
  .preorderDayImg{
    margin-right: 16px;
  }
  .preorderPlace{
    margin: 10px 0 0;
  }
  .preorderPlace .q-item{
    padding: 0 10px;
    min-height: 0;
    margin-bottom: 10px;
  }
  .preorderPlace .q-item__section--avatar{
    min-width: 0;
  }
  .preorderPlaceInfo{
    border-top: 1px solid rgba(0,0,0,0.2);
  }
  .stepsPreorder {
    width: 24px;
    position: relative;
    height: 65px;
    margin: 10px;
  }
  .stepsPreorder:after {
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
  .stepPreorder {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: #816FF6;
    border: 3px solid #fff;
    box-shadow: 2px 2px 4px 0 rgba(0,0,0,0.05), -4px -4px 8px 0 #FDFDFD, 4px 4px 8px 0 rgba(0,0,0,0.10), 6px 6px 12px 0 #FDFDFD;
    transition: all .2s ease-in-out;
    z-index: 2;
  }
  .stepPreorder_active {
    background-color: #688AF5;
    width: 16px;
    height: 16px;
    border: 3px solid #fff;
  }
  .preorderPlaces{
    width: calc(100% - 44px);
    height: 65px;
    font-weight: 500;
    font-size: 15px;
    line-height: 18px;
    margin-top: 10px;
  }
  .preorderPlacesSeparator{
    width: 100%;
    height: 1px;
    background: rgba(0,0,0,0.2);
  }
  .preorderPay{
    border-top: 1px solid rgba(0,0,0,0.2);
    padding: 16px 16px;
  }
  .preorderPayType{
    font-weight: 600;
    font-size: 13px;
    line-height: 14px;
    letter-spacing: -0.4px;
  }
  .preorderPayCost{
    font-size: 17px;
    line-height: 17px;
    letter-spacing: -0.303571px;
    color: #688AF5;
  }
  .preorderBtns{
    border-top: 1px solid rgba(0,0,0,0.2);
    padding: 16px 10px;
  }
  .preorderBtn{
    font-weight: 600;
    font-size: 15px;
    line-height: 18px;
    letter-spacing: -0.361765px;
    color: #688AF5;
    border: 0px;
    background: #F8F8F8;
    box-shadow: 4px 4px 8px rgba(0, 0, 0, 0.1), -4px -4px 10px rgba(253, 253, 253, 0.75), 2px 2px 4px rgba(0, 0, 0, 0.05), inset 6px 6px 12px #FDFDFD;
    border-radius: 16px;
    padding: 8px 16px;
  }
  .editBtn{
    width: 36px;
    height: 36px;
    background: #F8F8F8;
    box-shadow: 4px 4px 8px rgba(0, 0, 0, 0.1), -4px -4px 10px rgba(253, 253, 253, 0.75), 2px 2px 4px rgba(0, 0, 0, 0.05), inset 6px 6px 12px #FDFDFD;
    border-radius: 50%;
    margin-left: 10px;
  }
  .preorderMeet{
    background: #688AF5;
    border-radius: 12px;
    font-weight: 500;
    font-size: 13px;
    line-height: 16px;
    letter-spacing: -0.4px;
    color: #FFFFFF;
    padding: 3px 12px;
    position: absolute;
    right: 26px;
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
