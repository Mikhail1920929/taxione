<template>
    <div>
      <q-btn
        dense
        icon="img:../../../statics/order_icons/arrow.svg"
        class="menuBtn"
        v-if="backSelectBtn"
        @click="back()"
      />
      <q-card class="selectRide">
        <div class="typeCarBlock flex justify-between">
          <div class="carType" v-for="(car, index) in typePrice" :key="car.ride_class_name" :class="{ carTypeActiveEconom: index === selectCar && index === 0, carTypeActiveBusness: index === selectCar && index === 1, carTypeActiveMinivan: index === selectCar && index === 2}" @click="selectType(index, car)">
            <div class="info" v-if="index === selectCar">
              <img src="../../../statics/order_icons/info.svg" alt="">
            </div>
            <div class="carImage text-right">
              <img src="../../../statics/order_icons/business.svg" v-if="car.ride_class_name === 'business'" alt="">
              <img src="../../../statics/order_icons/comfort.svg" v-if="car.ride_class_name === 'comfort'" alt="">
              <img src="../../../statics/order_icons/miniwen.svg" v-if="car.ride_class_name === 'minivan'" alt="">
            </div>
            <div class="carInfo flex column" :class="{ carInfoActive: index === selectCar }">
              <div class="carNameConfigurator">
                <span v-if="car.ride_class_name === 'business'">{{ $t('carTypeBusness') }}</span>
                <span v-if="car.ride_class_name === 'comfort'">{{ $t('carTypeComfort') }}</span>
                <span v-if="car.ride_class_name === 'minivan'">{{ $t('carTypeMinivan') }}</span>
              </div>
              <div class="carPrice" v-if="car.converted">
                <q-spinner
                  size="16px"
                  :thickness="2"
                  class="loadingSpinner"
                />
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
              borderless
              v-model="textFrom"
              class="inputs"
              readonly
              ref="from"
              placeholder="Выберите место отправления"/>
            <div class="line"></div>
            <q-input
              borderless
              v-model="textTo"
              class="inputs"
              readonly

              placeholder="Выберите место назначения"/>
          </div>
        </div>
        <div class="orderInfo flex justify-between">
          <!-- <div class="orderDay flex items-center">
            <img src="../../../statics/order_icons/clock.svg" alt="" class="q-mr-md">
            {{ $t('giveNow') }}
          </div> -->
          <div style="color: darkgrey; font-weight: lighter" class="orderDay flex items-center">{{ $t('getNow') }}</div>
          <div class="separator"></div>
          <div class="orderCard flex items-center justify-end" :class="{cardCenter: card}">
            <img v-if="!card && !default_company" src="../../../statics/order_icons/dollar.svg" alt="" class="q-mr-md">
            <span v-if="!card && !default_company">{{ $t('payMethod') }}</span>
            <userCard v-if="card" />
            <span style="width: 100%; text-align: center" v-if="!card && default_company">{{ $t('corporate') }}</span>
          </div>
        </div>
        <div class="orderBtn">
            <button disabled class="mainBtn">{{ $t('order') }}</button>
        </div>
      </q-card>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import userCard from '../../payment/userCard'
export default {
  name: 'selectPoints',
  data () {
    return {
      selectCar: null,
      selectTypeInfo: null,
      showTypeInfo: false,
      showTimeSelect: false,
      backSelectBtn: false,
      nameplate: null,
      day: null,
      hours: null,
      minutes: null,
      now: true
    }
  },
  beforeMount () {
    this.showBack()
  },
  computed: {
    ...mapGetters({
      card: 'user/user/card',
      default_company: 'user/user/default_company'
    }),
    typePrice: function () {
      let econom = { ride_class_name: 'comfort', converted: { amount: '-' }, status: 'disable' }
      let business = { ride_class_name: 'business', converted: { amount: '-' }, status: 'disable' }
      let minivan = { ride_class_name: 'minivan', converted: { amount: '-' }, status: 'disable' }
      let sortTypes = []
      sortTypes.push(econom)
      sortTypes.push(business)
      sortTypes.push(minivan)
      return sortTypes
    }
  },
  methods: {
    showBack () {
      this.$root.$emit('hideMenu')
      this.backSelectBtn = true
    },
    back () {
      sessionStorage.removeItem('configurate')
      sessionStorage.removeItem('from')
      sessionStorage.removeItem('to')
      this.$emit('back')
    }
  },
  props: ['textFrom', 'textTo'],
  components: {
    userCard
  }
}
</script>

<style>
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
  .orderBtn{
    padding: 0px 20px;
    margin-bottom: 16px;
  }
  .loadingSpinner > circle{
    stroke: #816FF6;
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
