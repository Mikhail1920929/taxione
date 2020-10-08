<template>
    <div>
      <configuratorError v-if="showError" :error="this.orderError" @closeError="showError = false, orderError = null"/>
      <successPreOrder v-if="showPreOrder" @closePreOrder="showPreOrder = false, $router.push({name: 'preorder'})"/>
      <checkPay v-if="showCheckPay" />
      <q-btn
        dense
        icon="img:../../../statics/order_icons/arrow.svg"
        class="menuBtn"
        v-if="backSelectBtn"
        @click="back()"
      />
      <q-card class="selectRide">
        <div class="typeCarBlock flex justify-between">
          <div class="carType" v-for="car in typePrice" :key="car.ride_class_name" :class="{ carTypeActiveEconom: selectCar.ride_class_name === 'comfort' && car.ride_class_name === 'comfort', carTypeActiveBusness: selectCar.ride_class_name === 'business' && car.ride_class_name === 'business', carTypeActiveMinivan: selectCar.ride_class_name === 'minivan' && car.ride_class_name === 'minivan'}" @click="selectType(car)">
            <div class="info" v-if="car === selectCar">
              <img src="../../../statics/order_icons/info.svg" alt="">
            </div>
            <div class="carImage text-right">
              <img src="../../../statics/order_icons/business.svg" v-if="car.ride_class_name === 'business'" alt="">
              <img src="../../../statics/order_icons/comfort.svg" v-if="car.ride_class_name === 'comfort'" alt="">
              <img src="../../../statics/order_icons/miniwen.svg" v-if="car.ride_class_name === 'minivan'" alt="">
            </div>
            <div class="carInfo flex column" :class="{ carInfoActive: car === selectCar }">
              <div class="carNameConfigurator">
                <span v-if="car.ride_class_name === 'business'">{{ $t('carTypeBusness') }}</span>
                <span v-if="car.ride_class_name === 'comfort'">{{ $t('carTypeComfort') }}</span>
                <span v-if="car.ride_class_name === 'minivan'">{{ $t('carTypeMinivan') }}</span>
              </div>
              <div class="carPrice" v-if="car.converted">
                {{car.converted.amount}}
                <span v-if="car.converted.currency">{{priceCurrency.value}}</span>
              </div>
            </div>
          </div>
        </div>

        <div class="inputBlockOrder flex justify-between items-center">
          <div class="steps flex column justify-between items-center">
            <div class="step"></div>
            <div class="step step_active"></div>
          </div>
          <div class="toFromInputs">
            <q-input
              @click="editRide()"
              borderless
              v-model="textFrom"
              class="inputs"
              readonly
              ref="from"
            />
            <div class="line"></div>
            <q-input
              @click="editRide()"
              borderless
              v-model="textTo"
              class="inputs"
              readonly
            />
          </div>
        </div>
        <div class="orderInfo flex justify-between">
          <!-- <div class="orderDay flex items-center" @click="showTimeSelect = true">
            <img src="../../../statics/order_icons/clock.svg" alt="" class="q-mr-md">
            <div class="rideTime">{{timeText}}</div>
          </div> -->
          <div style="color: darkgrey; font-weight: lighter" class="orderDay flex items-center">{{ $t('getNow') }}</div>
          <div class="separator"></div>
          <div class="orderCard flex items-center justify-end" :class="{cardCenter: card}" @click="showPayMethods = true">
              <img v-if="!card && !default_company" src="../../../statics/order_icons/dollar.svg" alt="" class="q-mr-md">
              <span v-if="!card && !default_company">{{ $t('payMethod') }}</span>
              <userCard v-if="card" />
              <span style="width: 100%; text-align: center" v-if="!card && default_company">{{ $t('corporate') }}</span>
          </div>
        </div>
        <div class="orderBtn">
          <button @click="sendRide()" class="mainBtn" v-if="rideStatus === 'now'">{{ $t('order') }}</button>
          <button @click="preOrderRide()" class="mainBtn" v-if="rideStatus === 'preorder'">{{ $t('preOrderRide') }}</button>
          <button @click="preOrderEdit()" class="mainBtn" v-if="rideStatus === 'editPreorder'">{{ $t('save') }}</button>
        </div>
      </q-card>
      <transition name="popup" mode="out-in">
        <carTypeInfo v-if="showTypeInfo" :carType="selectCar" @closeType="showTypeInfo = false" />
        <selectTime v-if="showTimeSelect" @closeTime="closeTime" @closeTimeNow="showTimeSelect = false" />
        <selectPay v-if="showPayMethods" @closeSelectPay="closeChoosePay()" @backConfigurate="showPayMethods = false"/>
      </transition>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import moment from 'moment'
import carTypeInfo from './carTypeInfo'
import selectTime from './selectTime'
import configuratorError from '../../popUps/configuratorError'
import selectPay from './selectPay'
import successPreOrder from '../../popUps/successPreOrder'
import userCard from '../../payment/userCard'
import currency from '../../../statics/currency'
import checkPay from '../../popUps/checkPay'
export default {
  name: 'selectPoints',
  data () {
    return {
      selectCar: null,
      showTypeInfo: false,
      showTimeSelect: false,
      showPayMethods: false,
      showCheckPay: false,
      backSelectBtn: false,
      nameplate: null,
      day: null,
      hours: null,
      minutes: null,
      now: true,
      showPreOrder: false,
      showError: false,
      orderError: null,
      selectPrice: null
    }
  },
  beforeMount () {
    this.showBack()
    this.selectCar = this.typePrice[0]
    this.selectPrice = this.typePrice[0].converted.amount
    if (sessionStorage.getItem('car_type')) {
      this.selectCar = this.typePrice.find(car => car.ride_class_name === JSON.parse(sessionStorage.getItem('car_type')))
    }
    if (sessionStorage.getItem('editPreorder') === 'true') {
      this.now = false
      let template = JSON.parse(sessionStorage.getItem('template'))
      this.day = template.start_at.split(' ').shift().split('-').reverse().join('.')
      this.selectCar = this.typePrice.find(car => car.ride_class_name === template.ride_class_name)
    }
  },
  mounted () {
    sessionStorage.setItem('car_type', JSON.stringify(this.selectCar.ride_class_name))
  },
  computed: {
    ...mapGetters({
      user: 'user/user/user',
      price: 'ride/price',
      card: 'user/user/card',
      cards: 'user/payment/cards',
      companies: 'user/user/companies',
      default_company: 'user/user/default_company'
    }),
    priceCurrency () {
      return currency.find(currency => currency.country_code === this.user.country.code)
    },
    rideStatus () {
      if (this.day === null) {
        return 'now'
      } else if (sessionStorage.getItem('template')) {
        return 'editPreorder'
      } else {
        return 'preorder'
      }
    },
    selectCard () {
      if (this.card && this.cards) {
        return this.cards.find(card => card.card_id === this.card.card_id)
      } else {
        return false
      }
    },
    selectCompany () {
      if (this.default_company && this.companies) {
        return this.companies.find(company => company.uuid === this.default_company.uuid)
      } else {
        return false
      }
    },
    typePrice: function () {
      let econom = this.price.find(type => type.ride_class_name === 'comfort')
      let business = this.price.find(type => type.ride_class_name === 'business')
      let minivan = this.price.find(type => type.ride_class_name === 'minivan')
      if (econom === undefined) {
        econom = { ride_class_name: 'comfort', converted: { amount: '-' }, status: 'disable' }
      }
      if (business === undefined) {
        business = { ride_class_name: 'business', converted: { amount: '-' }, status: 'disable' }
      }
      if (minivan === undefined) {
        minivan = { ride_class_name: 'minivan', converted: { amount: '-' }, status: 'disable' }
      }
      let sortTypes = []
      sortTypes.push(econom)
      sortTypes.push(business)
      sortTypes.push(minivan)
      return sortTypes
    },
    timeText () {
      if (this.day === null) {
        return this.$i18n.t('giveNow', this.user.lang)
      } else if (this.day.slice(0, -9) === moment().format('DD.MM.YYYY').toString()) {
        return this.$i18n.t('todayIn', this.user.lang) + moment(this.day, 'DD.MM.YYYYTHH:mm:ss').format('HH:mm')
      } else {
        return moment(this.day, 'DD.MM.YYYYTHH:mm:ss').format('DD.MM.YYYY') + ' ' + moment(this.day, 'DD.MM.YYYYTHH:mm:ss').format('HH:mm')
      }
    },
    start_at () {
      if (this.day && this.from.utc_offset > 0) {
        return moment(this.day, 'DD.MM.YYYYTHH:mm:ss').format('YYYY-MM-DDTHH:mm:ss') + '+0' + this.from.utc_offset
      } else {
        return moment(this.day, 'DD.MM.YYYYTHH:mm:ss').format('YYYY-MM-DDTHH:mm:ss') + '-0' + this.from.utc_offset.toString().slice(1)
      }
    }
  },
  methods: {
    ...mapActions({
      sendsRideProps: 'ride/sendsRideProps',
      addPreorder: 'user/preorder/addPreorder',
      editPreorder: 'user/preorder/editPreorder',
      editCard: 'user/user/editCard',
      editCompany: 'user/user/editCompany',
      loadPreorders: 'user/preorder/loadPreorders',
      sendCoords: 'ride/sendCoords'
    }),
    moment () {
      return moment()
    },
    sendRide () {
      this.showCheckPay = true
      setTimeout(() => {
        this.sendsRideProps({ start_at: moment().format('YYYY-MM-DDTHH:mm:ssZ'), uuid: this.uuid, to: this.to, from: this.from, selectCar: this.selectCar, billing: this.selectCard.rebill_id || this.selectCompany.uuid, useCard: this.card, default_company: this.default_company, template_id: sessionStorage.getItem('id') || null })
          .then(response => {
            this.loadPreorders()
            this.showCheckPay = false
            this.$emit('ordered')
          })
          .catch(error => {
            this.showCheckPay = false
            if (error.response.status === 400) {
              this.orderError = error.response.data.message
              this.showError = true
            } else if (error.response.status === 469) {
              this.editCard({ id: null })
              this.editCompany({ id: null })
                .then(response => {
                  this.showPayMethods = true
                })
                .catch(error => {
                  this.orderError = error.response.data.message
                  this.showError = true
                })
              this.showPayMethods = true
            } else if (error.response.status === 404) {
              sessionStorage.removeItem('from')
              sessionStorage.removeItem('to')
              this.$emit('editRide')
              this.$emit('resendRide')
            } else {
              this.orderError = error.response.data.message
              this.showError = true
            }
          })
      }, 1500)
    },
    closeChoosePay () {
      sessionStorage.removeItem('from')
      sessionStorage.removeItem('to')
      this.$emit('resendEstimate')
    },
    preOrderRide () {
      this.addPreorder({ to: this.to, from: this.from, start_at: this.start_at, billing: this.selectCard.rebill_id || this.selectCompany.uuid, price: this.selectPrice, carClass: this.selectCar.ride_class_name, uuid: this.uuid })
        .then(response => {
          sessionStorage.clear()
          this.showPreOrder = true
        })
        .catch(error => {
          this.orderError = error.response.data.message
          this.showError = true
        })
    },
    editRide () {
      sessionStorage.removeItem('from')
      sessionStorage.removeItem('to')
      this.$emit('editRide')
    },
    back () {
      sessionStorage.removeItem('from')
      sessionStorage.removeItem('to')
      this.$emit('back')
    },
    selectType (car) {
      if (this.selectCar === car) {
        this.showTypeInfo = true
      } else if (car.status === 'disable') {
      } else {
        this.selectPrice = car.converted.amount
        this.selectCar = car
        sessionStorage.setItem('car_type', JSON.stringify(car.ride_class_name))
      }
    },
    closeTime (data) {
      this.showTimeSelect = false
      this.day = data.date
      this.now = data.now
    },
    showBack () {
      this.$root.$emit('hideMenu')
      this.backSelectBtn = true
    }
  },
  props: ['textFrom', 'textTo', 'to', 'from', 'uuid', 'utc_offset'],
  components: {
    carTypeInfo,
    selectTime,
    selectPay,
    configuratorError,
    successPreOrder,
    userCard,
    checkPay
  }
}
</script>

<style>
  .popup-enter-active, .popup-leave-active {
    transition: opacity 0.1s, transform 0.1s;
  }
  .popup-leave-to {
    opacity: 0;
    transform: translateY(100%);
  }
  .popup-enter{
    opacity: 0;
    transform: translateY(100%);
  }
  .info{
    position: absolute;
    width: 16px;
    height: 18px;
    margin-left: 8px;
    margin-top: 8px;
  }
  .selectRide{
    position: absolute;
    width: 100%;
    box-shadow: 0 2px 2px 0 rgba(0,0,0,0.24), 0 0 2px 0 rgba(0,0,0,0.12), inset 0 0 0 0 rgba(255,255,255,0.80);
    border-radius: 12px 12px 0 0;
    bottom: 0;
    left: 0;
  }
  .typeCarBlock{
    padding: 0 20px;
    position: relative;
    top: -52px;
    margin-bottom: -52px;
  }
  .carType{
    width: 32%;
    border: 0 solid rgba(155,155,155,0.25);
    box-shadow: 0 2px 4px 0 rgba(104,138,245,0.25);
    border-radius: 12px;
    font-size: 17px;
    overflow: hidden;
    background-color: #FDFDFD;
  }
  .carTypeActiveEconom{
    background: radial-gradient(100% 100% at 0% 0%, #A1FFCE 0%, #688AF5 100%);
  }
  .carTypeActiveBusness{
    background: radial-gradient(100% 100% at 0% 0%, #64B3F4 0%, #CF8BF3 100%);
  }
  .carTypeActiveMinivan{
    background: linear-gradient(138.22deg, #CF8BF3 0%, #8E54E9 101.5%);
  }
  .carImage{
    width: 100%;
    height: 50%;
    border: 0 solid rgba(155,155,155,0.25);
    background: linear-gradient(180deg, rgba(239,239,239,0.00) 0%, rgba(187,187,187,0.25) 100%);
  }
  .carImage img{
    height: auto;
    position: relative;
    top: 10px;
  }
  .carInfo{
    height: 100%;
    padding: 8px;
    font-size: 14px;
    color: #4A4A4A;
    letter-spacing: -0.47px;
    line-height: 16px;
    font-weight: 500;
  }
  .carNameConfigurator{
    font-weight: 500;
    font-size: 14px;
    line-height: 16px;
    letter-spacing: -0.4px;
  }
  .carInfoActive{
    color: #fff;
  }
  .carInfoActive > .carPrice{
    color: #fff;
  }
  .carPrice{
    font-weight: 500;
    font-size: 17px;
    line-height: 17px;
    letter-spacing: -0.303571px;
    color: #688AF5;
  }
  .line{
    width: calc(100% - 15px);
    height: 1px;
    background-color: rgba(0,0,0,0.2);
    margin-left: 15px;
  }
  .steps {
    width: 24px;
    position: relative;
    height: 70px;
  }

  .steps:after {
    position: absolute;
    content: '';
    top: 35%;
    left: 49%;
    width: 2px;
    height: 35%;
    opacity: 0.5;
    background: #9B9B9B;
    border-radius: 1px;
  }

  .step {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: #816FF6;
    border: 3px solid #fff;
    box-shadow: 2px 2px 4px 0 rgba(0,0,0,0.05), -4px -4px 8px 0 #FDFDFD, 4px 4px 8px 0 rgba(0,0,0,0.10), 6px 6px 12px 0 #FDFDFD;
    transition: all .2s ease-in-out;
    z-index: 2;
  }
  .step_active {
    background-color: #688AF5;
    width: 16px;
    height: 16px;
    border: 3px solid #fff;
  }
  .inputBlockOrder {
    padding: 0px 0 0px 20px;
  }
  .inputs{
    font-weight: 500;
    font-size: 15px;
    line-height: 18px;
    padding-left: 15px;
    width: calc(100% - 20px);
  }
  .orderInfo{
    padding: 20px;
    font-weight: 600;
    font-size: 13px;
    line-height: 14px;
  }
  .orderDay, .orderCard{
    width: calc(50% - 2px);
  }
  .separator{
    background: #E5E5EA;
    border-radius: 1px;
    height: 20px;
    width: 2px;
  }
  .rideTime{
    width: calc(100% - 36px);
    word-break: break-word;
  }
  .orderBtn{
    padding: 0px 20px;
    margin-bottom: 16px;
  }
  .cardCenter{
    justify-content: center;
  }
  @media (min-height: 568px) and (max-height: 666px) {
    .typeCarBlock{
      padding: 0 10px;
      position: relative;
      top: -52px;
      margin-bottom: -52px;
    }
    .orderInfo{
      font-size: 12px;
    }
  }
</style>
