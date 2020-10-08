<template>
  <div>
    <q-card class="carAssigned">
      <div class="headAssignedCar">
        <div class="statusTtl">{{ $t('driverExpect') }}</div>
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
        <div class="carStatusBtn flex column items-center">
<!--          <div class="carStatusBtnIcon flex justify-center items-center">-->
<!--            <svg width="10" height="20" viewBox="0 0 10 20" fill="none" xmlns="http://www.w3.org/2000/svg">-->
<!--              <path fill-rule="evenodd" clip-rule="evenodd" d="M5 2.00049C4.449 2.00049 4 2.44949 4 3.00049C4 3.55149 4.449 4.00049 5 4.00049C5.551 4.00049 6 3.55149 6 3.00049C6 2.44949 5.551 2.00049 5 2.00049ZM5 6.00049C3.346 6.00049 2 4.65449 2 3.00049C2 1.34649 3.346 0.000488281 5 0.000488281C6.654 0.000488281 8 1.34649 8 3.00049C8 4.65449 6.654 6.00049 5 6.00049ZM4 18.0005H6V14.0005C6 13.4485 6.448 13.0005 7 13.0005H8V11.0005C8 9.34649 6.654 8.00049 5 8.00049C3.346 8.00049 2 9.34649 2 11.0005V13.0005H3C3.552 13.0005 4 13.4485 4 14.0005V18.0005ZM7 20.0005H3C2.448 20.0005 2 19.5525 2 19.0005V15.0005H1C0.448 15.0005 0 14.5525 0 14.0005V11.0005C0 8.24349 2.243 6.00049 5 6.00049C7.757 6.00049 10 8.24349 10 11.0005V14.0005C10 14.5525 9.552 15.0005 9 15.0005H8V19.0005C8 19.5525 7.552 20.0005 7 20.0005Z" fill="#688AF5"/>-->
<!--            </svg>-->
<!--          </div>-->
<!--          <div class="carStatusBtnInfo">{{ $t('goOut') }}</div>-->
        </div>
      </div>
    </q-card>
    <cancelRide @canceled="$emit('canceled')" @close="cancelPopUp = false" v-if="cancelPopUp === true" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import cancelRide from '../../popUps/cancelRide'
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
      } else if (this.status && this.status.ride.provider === 'yandex') {
        return this.status.ride.performer.car.split(' ').slice(0, -2).join(' ')
      } else {
        return ' '
      }
    },
    carNumber () {
      if (this.status && this.status.ride.provider === 'splyt') {
        return this.status.ride.performer.car.split(' ').pop()
      } else {
        return this.status.ride.performer.car.split(' ').pop()
      }
    },
    carColor () {
      if (this.status && this.status.ride.provider === 'splyt') {
        return ' '
      } else if (this.status && this.status.ride.provider === 'yandex') {
        return this.status.ride.performer.car.split(' ')[this.status.ride.performer.car.split(' ').length - 2]
      } else {
        return ' '
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
