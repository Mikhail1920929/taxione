<template>
  <div>
    <q-card class="rideStatus">
      <div class="flex">
        <div class="statusTtl">{{ $t('searchCar') }}</div>
        <q-linear-progress indeterminate class="progress"/>
        <div class="carStatusBtns flex">
          <div class="carStatusBtn"></div>
          <div class="carStatusBtn flex column items-center">
            <div class="carStatusBtnIcon flex justify-center items-center">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M16 1.29918L14.7008 0L8 6.70082L1.29918 0L0 1.29918L6.70082 8L0 14.7008L1.29918 16L8 9.3001L14.7008 16L16 14.7008L9.29918 8L16 1.29918Z" fill="#9B9B9B"/>
              </svg>
            </div>
            <div class="carStatusBtnInfo">{{ $t('cancelOrder') }}</div>
          </div>
          <div class="carStatusBtn"></div>
        </div>
      </div>
    </q-card>
  </div>
</template>

<script>
export default {
  name: 'searchCar',
  data () {
    return {
    }
  },
  methods: {
  }
}
</script>

<style>
  .rideStatus{
    padding: 20px 16px;
    position: absolute;
    width: 100%;
    background: #F8F8F8;
    box-shadow: 0 2px 2px 0 rgba(0,0,0,0.24), 0 0 2px 0 rgba(0,0,0,0.12), inset 0 0 0 0 rgba(255,255,255,0.80);
    border-radius: 12px 12px 0 0;
    bottom: 0;
    left: 0;
  }
  .progress{
    margin: 20px 0;
  }
  .progress .q-linear-progress__model--indeterminate::before{
    background: radial-gradient(100% 100% at 100% 100%, #688AF5 0%, #816FF6 100%);
    box-shadow: 0px 4px 12px rgba(242, 93, 112, 0.2), 0px 2px 4px rgba(129, 111, 246, 0.6);
  }
  .progress .q-linear-progress__model--indeterminate::after{
    background: radial-gradient(100% 100% at 100% 100%, #688AF5 0%, #816FF6 100%);
    box-shadow: 0px 4px 12px rgba(242, 93, 112, 0.2), 0px 2px 4px rgba(129, 111, 246, 0.6);
  }
</style>
