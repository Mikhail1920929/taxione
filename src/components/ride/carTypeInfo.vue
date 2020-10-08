<template>
  <div class="infoBg" @click="closeType">
    <q-card class="typeInfoBlock" :class="{comfortBg: carType.ride_class_name === 'comfort', businessBg: carType.ride_class_name === 'business'}" @click.stop>
      <div class="carTypeInfoImg text-center">
        <img v-if="carType.ride_class_name === 'comfort'" src="../../statics/order_icons/econom_full.png" alt="">
        <img v-if="carType.ride_class_name === 'business'" src="../../statics/order_icons/business_full.png" alt="">
        <img v-if="carType.ride_class_name === 'minivan'" src="../../statics/order_icons/miniwen_full.png" alt="">
      </div>
      <div class="typeInfo flex justify-between items-center" style="margin-bottom: 30px;">
        <div class="typeInfoTtl" v-if="carType.ride_class_name === 'comfort'">{{ $t('carTypeComfort') }}</div>
        <div class="typeInfoTtl" v-if="carType.ride_class_name === 'business'">{{ $t('carTypeBusness') }}</div>
        <div class="typeInfoTtl" v-if="carType.ride_class_name === 'minivan'">{{ $t('carTypeMinivan') }}</div>
        <div class="typeInfoIcons flex">
          <div class="profile flex items-center q-mr-lg">
              <img src="../../statics/order_icons/profile.svg" alt="">
              <span v-if="carType.ride_class_name === 'comfort' || carType.ride_class_name === 'business'">4</span>
              <span v-if="carType.ride_class_name === 'minivan'">8</span>
          </div>
          <div class="bag flex items-center">
            <img src="../../statics/order_icons/bag.svg" alt="">
            <span v-if="carType.ride_class_name === 'comfort'">2</span>
            <span v-if="carType.ride_class_name === 'business'">3</span>
            <span v-if="carType.ride_class_name === 'minivan'">5</span>
          </div>
        </div>
      </div>
      <q-separator class="lineSeparator q-mb-lg"/>
      <div class="carsInfo">
        Audi A6, Audi A8, BMW 520, BMW 625, Mercedes CLK, Mercedes SL, Skoda Quadic
      </div>
      <q-separator class="lineSeparator q-mt-lg"/>
      <div class="advantages">
        <div class="advantagesBlock flex justify-between items-center">
          <div class="advantagesTtl">{{ $t('securePayment') }}</div>
          <div class="advantagesIcon">
            <img src="../../statics/order_icons/advantages.svg" alt="">
          </div>
        </div>
        <q-separator class="lineSeparator"/>
        <div class="advantagesBlock flex justify-between items-center">
          <div class="advantagesTtl">{{ $t('guaranteedPrice') }}</div>
          <div class="advantagesIcon">
            <img src="../../statics/order_icons/pointer_dollar.svg" alt="">
          </div>
        </div>
        <q-separator class="lineSeparator"/>
        <div class="advantagesBlock flex justify-between items-center">
          <div class="advantagesTtl">{{ $t('freeChangeDate') }}</div>
          <div class="advantagesIcon">
            <img src="../../statics/order_icons/calendar.svg" alt="">
          </div>
        </div>
        <q-separator class="lineSeparator"/>
        <div class="advantagesBlock flex justify-between items-center">
          <div class="advantagesTtl">{{ $t('freeCancellation') }}</div>
          <div class="advantagesIcon">
            <img src="../../statics/order_icons/cancellation.svg" alt="">
          </div>
        </div>
        <q-separator class="lineSeparator"/>
      </div>
    </q-card>
  </div>
</template>

<script>
export default {
  name: 'carTypeInfo',
  data () {
    return {

    }
  },
  methods: {
    closeType () {
      this.$emit('closeType')
    }
  },
  props: ['carType']
}
</script>

<style scoped>
  .infoBg{
    width: 100%;
    height: 100%;
    position: absolute;
    background-color: rgba(25, 25, 25, 0.5);
    z-index: 50;
  }
  .typeInfoBlock{
    width: 100%;
    height: 80%;
    position: absolute;
    box-shadow: 0 2px 2px 0 rgba(0,0,0,0.24), 0 0 2px 0 rgba(0,0,0,0.12), inset 0 0 0 0 rgba(255,255,255,0.80);
    border-radius: 12px 12px 0 0;
    bottom: 0;
    left: 0;
    background: linear-gradient(121.93deg, #CF8BF3 0%, #8E54E9 101.5%);
    padding-bottom: 40px;
    overflow-y: scroll;
  }
  .comfortBg{
    background: radial-gradient(100% 100% at 0% 0%, #A1FFCE 0%, #688AF5 100%);
  }
  .businessBg{
    background: radial-gradient(100% 100% at 0% 0%, #64B3F4 0%, #CF8BF3 100%);
  }
  .carTypeInfoImg{
    height: 25%;
    background: linear-gradient(180deg, rgba(239, 239, 239, 0.0001) 0%, rgba(187, 187, 187, 0.2) 100%);
    margin-bottom: 20%;
  }
  .carTypeInfoImg img{
    margin-top: 20%;
  }
  .typeInfo{
    padding: 0 20px;
  }
  .profile, .bag{
  }
  .typeInfoTtl{
    font-weight: 600;
    font-size: 32px;
    line-height: 16px;
    letter-spacing: -1.06667px;
    color: #FFFFFF;
  }
  .typeInfoIcons{
    font-weight: 500;
    font-size: 17px;
    line-height: 17px;
    color: #FFFFFF;
  }
  .typeInfoIcons img{
    margin-right: 10px;
  }
  .carsInfo{
    padding: 0 40px 0 20px;
    color: #fff;
    font-weight: 500;
    font-size: 13px;
    line-height: 14px;
  }
  .lineSeparator{
    background: rgba(255, 255, 255, 0.2);
  }
  .advantages {
    padding: 0 20px;
  }
  .advantagesBlock{
    margin: 15px 0;
  }
  .advantagesTtl{
    width: 70%;
    word-break: break-word;
    color: #FFFFFF;
    font-weight: 600;
    font-size: 13px;
    line-height: 16px;
  }
  @media (min-height: 568px) and (max-height: 666px) {
    .carTypeInfoImg{
      height: 15%;
      margin-bottom: 10%;
    }
    .carTypeInfoImg img{
      margin-top: 7%;
      width: 50%;
    }
  }
  @media (min-height: 667px) and (max-height: 736px) {
    .carTypeInfoImg{
      height: 20%;
      margin-bottom: 10%;
    }
    .carTypeInfoImg img{
      margin-top: 12%;
      width: 50%;
    }
  }
</style>
