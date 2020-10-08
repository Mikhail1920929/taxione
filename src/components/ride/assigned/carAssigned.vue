<template>
  <div>
    <q-card class="carAssigned">
      <div class="headAssignedCar">
        <div class="statusTtl">{{ $t('carAssigned') }}</div>
        <div class="assignedCarImg">
          <img v-if="status.ride.ride_class_name === 'comfort'" src="../../../statics/order_icons/comfort_full.svg" alt="">
          <img v-if="status.ride.ride_class_name === 'business'" src="../../../statics/order_icons/business_full.svg" alt="">
          <img v-if="status.ride.ride_class_name === 'miniwen'" src="../../../statics/order_icons/miniwen_full.svg" alt="">
        </div>
      </div>
      <div class="assignedCarInfo flex justify-between items-center">
        <div class="carName" v-if="car">{{ car }}</div>
        <div class="carColor" v-if="carColor">{{carColor}}</div>
        <div class="carModel" v-if="carNumber">{{ carNumber }}</div>
      </div>
      <div class="carStatusBtns flex">
        <div class="carStatusBtn flex column items-center">
          <a :href="'https://wa.me/' + phone" target="_blank" class="carStatusBtnIcon flex justify-center items-center">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M1.8 1.80043V12.6004H5.4V14.4004L7.8003 12.6004H16.2V1.80043H1.8ZM3.6 18.0004V14.4004H1.8C0.8073 14.4004 0 13.5931 0 12.6004V1.80043C0 0.807727 0.8073 0.000427246 1.8 0.000427246H16.2C17.1927 0.000427246 18 0.807727 18 1.80043V12.6004C18 13.5931 17.1927 14.4004 16.2 14.4004H8.3997L3.6 18.0004Z" fill="#688AF5"/>
            </svg>
          </a>
          <div class="carStatusBtnInfo">{{ $t('driverWrite') }}</div>
        </div>
        <div class="carStatusBtn flex column items-center">
          <div class="carStatusBtnIcon flex justify-center items-center" @click="cancel()">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M16 1.29918L14.7008 0L8 6.70082L1.29918 0L0 1.29918L6.70082 8L0 14.7008L1.29918 16L8 9.3001L14.7008 16L16 14.7008L9.29918 8L16 1.29918Z" fill="#9B9B9B"/>
            </svg>
          </div>
          <div class="carStatusBtnInfo">{{ $t('cancelOrder') }}</div>
        </div>
      </div>
    </q-card>
    <cancelRide @canceled="$emit('canceled')" @close="cancelPopUp = false" v-if="cancelPopUp" />
  </div>
</template>

<script>
import cancelRide from '../../popUps/cancelRide'
import { mapGetters } from 'vuex'
export default {
  name: 'searchCar',
  data () {
    return {
      cancelPopUp: false
    }
  },
  computed: {
    ...mapGetters({
      status: 'ride/status'
    }),
    car () {
      if (this.status && this.status.ride.provider === 'splyt') {
        return this.status.ride.performer.car.split(' ').slice(0, -1).join(' ')
      } else {
        return this.status.ride.performer.car.split(' ').slice(0, -2).join(' ')
      }
    },
    carNumber () {
      return this.status.ride.performer.car.split(' ').pop()
    },
    carColor () {
      if (this.status && this.status.ride.provider === 'splyt') {
        return ' '
      } else {
        return this.status.ride.performer.car.split(' ')[this.status.ride.performer.car.split(' ').length - 2]
      }
    },
    phone () {
      return this.status.ride.performer.phone.replace(/[\W\D]/g, '')
    }
  },
  methods: {
    cancel () {
      this.cancelPopUp = true
    }
  },
  components: {
    cancelRide
  }
}
</script>

<style>
  .carAssigned{
    padding: 20px 0px;
    position: absolute;
    width: 100%;
    background: #F8F8F8;
    box-shadow: 0 2px 2px 0 rgba(0,0,0,0.24), 0 0 2px 0 rgba(0,0,0,0.12), inset 0 0 0 0 rgba(255,255,255,0.80);
    border-radius: 12px 12px 0 0;
    bottom: 0;
    left: 0;
    z-index: 20;
  }
  .headAssignedCar{
    width: 100%;
    height: 120px;
    background: linear-gradient(180deg, rgba(239, 239, 239, 0.0001) 0%, rgba(187, 187, 187, 0.4) 100%);
    margin-bottom: 30px;
  }
  .assignedCarImg{
    text-align: center;
    margin-top: 20px;
  }
  .assignedCarImg img{
    position: relative;
    top: 10px;
  }
  .assignedCarInfo{
    padding: 0px 16px;
    font-weight: 600;
    font-size: 13px;
    line-height: 14px;
    text-align: center;
    letter-spacing: -0.4px;
    margin-bottom: 20px;
  }
</style>
