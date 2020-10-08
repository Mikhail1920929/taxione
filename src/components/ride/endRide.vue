<template>
  <div class="endScreen flex items-center justify-center">
    <div class="endInfo">
      <div class="endTtl">{{ $t('inPlace') }}</div>
      <div class="endQuestion">{{ $t('inPlaceInfo') }}</div>
      <div class="carStatusBtns flex">
        <div class="carStatusBtn flex column items-center">
          <div class="carStatusBtnIcon flex justify-center items-center" @click="rateDriver('1')">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M10 18C14.411 18 18 14.411 18 10C18 5.589 14.411 2 10 2C5.589 2 2 5.589 2 10C2 14.411 5.589 18 10 18ZM10 0C15.514 0 20 4.486 20 10C20 15.515 15.514 20 10 20C4.486 20 0 15.515 0 10C0 4.486 4.486 0 10 0ZM8 4.9995V7.9995H6V4.9995H8ZM14 4.9995V7.9995H12V4.9995H14ZM13.1274 10.7139L15.7074 13.2929L14.2934 14.7069L12.8724 13.2869L10.0004 15.2019L7.1274 13.2869L5.7074 14.7069L4.2934 13.2929L6.8724 10.7139L10.0004 12.7989L13.1274 10.7139Z" fill="#688AF5"/>
            </svg>
          </div>
          <div class="cancelInfo text-center">{{ $t('badly') }}</div>
        </div>
        <div class="carStatusBtn flex column items-center">
          <div class="carStatusBtnIcon flex justify-center items-center" @click="rateDriver('2')">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M10 18C14.411 18 18 14.411 18 10C18 5.589 14.411 2 10 2C5.589 2 2 5.589 2 10C2 14.411 5.589 18 10 18ZM10 0C15.514 0 20 4.486 20 10C20 15.515 15.514 20 10 20C4.486 20 0 15.515 0 10C0 4.486 4.486 0 10 0ZM6 14.9995V12.9995H14V14.9995H6ZM8 5.9995V8.9995H6V5.9995H8ZM12 8.9995V5.9995H14V8.9995H12Z" fill="#688AF5"/>
            </svg>
          </div>
          <div class="cancelInfo text-center">{{ $t('good') }}</div>
        </div>
        <div class="carStatusBtn flex column items-center">
          <div class="carStatusBtnIcon flex justify-center items-center" @click="rateDriver('3')">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M10 15C11.684 15 13.119 14.052 13.71 13H6.299C6.906 14.049 8.364 15 10 15ZM15 11C15.552 11 16 11.448 16 12C16 14.617 13.14 17 10 17C6.86 17 4 14.617 4 12C4 11.448 4.448 11 5 11H15ZM10 18C14.411 18 18 14.411 18 10C18 5.589 14.411 2 10 2C5.589 2 2 5.589 2 10C2 14.411 5.589 18 10 18ZM10 0C15.514 0 20 4.486 20 10C20 15.515 15.514 20 10 20C4.486 20 0 15.515 0 10C0 4.486 4.486 0 10 0ZM8 4.9995V8.9995H6V4.9995H8ZM14 4.9995V8.9995H12V4.9995H14Z" fill="#688AF5"/>
            </svg>
          </div>
          <div class="cancelInfo text-center">{{ $t('excellent')}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'endRide',
  data () {
    return {
    }
  },
  mounted () {
    this.$root.$emit('hideMenu')
  },
  methods: {
    ...mapActions({
      rate: 'ride/getRate'
    }),
    rateDriver (rate) {
      this.rate({ rating: rate })
      this.$emit('completeRide')
    }
  }
}
</script>

<style>
  .endScreen{
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: #F8F8F8;
    z-index: 200;
  }
  .endInfo{
    width: 100%;
  }
  .endTtl{
    font-weight: 600;
    font-size: 24px;
    line-height: 24px;
    color: #688AF5;
    text-align: center;
    margin-bottom: 80px;
  }
  .endQuestion{
    font-weight: 500;
    font-size: 17px;
    line-height: 17px;
    letter-spacing: -0.303571px;
    color: #4A4A4A;
    text-align: center;
    margin-bottom: 42px;
  }
</style>
