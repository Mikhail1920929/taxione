<template>
  <div class="selectPay">
    <div class="closeSelectPay" @click="clearStatus(), $emit('backConfigurate')">
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g filter="url(#filter0_i)">
          <rect width="36" height="36" rx="8" fill="#F8F8F8"/>
        </g>
        <path fill-rule="evenodd" clip-rule="evenodd" d="M27 10.4616L25.5384 9L18 16.5384L10.4616 9L9 10.4616L16.5384 18L9 25.5384L10.4616 27L18 19.4626L25.5384 27L27 25.5384L19.4616 18L27 10.4616Z" fill="#688AF5"/>
        <defs>
          <filter id="filter0_i" x="0" y="0" width="36" height="36" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
            <feFlood flood-opacity="0" result="BackgroundImageFix"/>
            <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
            <feOffset dy="0.5"/>
            <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
            <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.8 0"/>
            <feBlend mode="normal" in2="shape" result="effect1_innerShadow"/>
          </filter>
        </defs>
      </svg>
    </div>
    <div class="selectPayTtl">
      <div v-if="!failCard && !failCompany && payStatus === true && (card || default_company)">{{$t('paymentMethods')}}</div>
      <div v-if="payStatus === true && !card && !default_company && (!failCard || !failCompany)">{{ $t('paymentMethods') }}</div>
      <div v-if="payStatus === false && !card && !default_company && !failCard && !failCompany">{{ $t('nullPayMethod') }}</div>
      <div v-if="payStatus === false && (failCard || failCompany)">{{ $t('payStatusFail') }}</div>
      <div v-if="payStatus === false && (failCard || failCompany)" class="failPayInfo">{{ $t('payStatusFailInfo') }}</div>
    </div>
    <selectCard @closePayMethods="$emit('closeSelectPay')"/>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import selectCard from '../../payment/selectCard'
export default {
  name: 'selectPayOrder',
  computed: {
    ...mapGetters({
      payStatus: 'ride/payStatus',
      card: 'user/user/card',
      default_company: 'user/user/default_company',
      failCard: 'ride/failCard',
      failCompany: 'ride/failCompany'
    })
  },
  components: {
    selectCard
  },
  methods: {
    ...mapActions({
      clearStatus: 'ride/clearFailCard'
    })
  }
}
</script>

<style scoped>
  .selectPay{
    width: 100%;
    height: 100%;
    position: absolute;
    background-color: #F8F8F8;
    z-index: 50;
  }
  .closeSelectPay{
    position: absolute;
    top: 16px;
    right: 16px;
  }
  .selectPayTtl{
    font-weight: 600;
    font-size: 24px;
    line-height: 24px;
    letter-spacing: -0.8px;
    margin-top: 75px;
    padding: 0 32px;
    margin-bottom: 40px;
  }
  .failPayInfo{
    font-weight: 500;
    font-size: 17px;
    line-height: 17px;
    margin-top: 20px;
    width: 70%;
  }
</style>
