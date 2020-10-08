<template>
  <div>
    <q-card class="rideStatus">
      <div class="statusTtl q-mb-lg">{{ $t('road') }}</div>
      <div class="carStatusBtns flex">
        <div class="carStatusBtn flex column items-center">
          <a href="https://wa.me/79111096769" target="_blank" class="carStatusBtnIcon flex justify-center items-center">
            <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M6.00975 19.0005H14.0097C14.0097 17.2625 12.3277 16.0005 10.0107 16.0005C7.69275 16.0005 6.00975 17.2625 6.00975 19.0005ZM16.0097 21.0005H4.00975V19.0005C4.00975 16.1505 6.58975 14.0005 10.0107 14.0005C13.4307 14.0005 16.0097 16.1505 16.0097 19.0005V21.0005ZM6.47705 12.6802C5.83105 12.9452 5.23805 13.2802 4.71005 13.6792C2.91405 11.1432 3.14405 7.60123 5.41305 5.33023C6.64105 4.10223 8.27305 3.42623 10.01 3.42623C11.747 3.42623 13.379 4.10223 14.606 5.33023C16.876 7.60123 17.106 11.1432 15.31 13.6792C14.782 13.2802 14.189 12.9452 13.543 12.6802C14.916 10.9152 14.812 8.36623 13.192 6.74423C12.342 5.89423 11.212 5.42623 10.01 5.42623C8.80805 5.42623 7.67805 5.89423 6.82705 6.74423C5.20705 8.36623 5.10305 10.9152 6.47705 12.6802ZM3.58055 14.7456C3.11755 15.2906 2.74555 15.9006 2.48055 16.5636C-0.942452 12.6416 -0.796452 6.66463 2.93955 2.92863C6.83755 -0.969373 13.1825 -0.969373 17.0805 2.92863C20.8175 6.66463 20.9625 12.6416 17.5385 16.5646C17.2735 15.9026 16.9035 15.2906 16.4395 14.7456C18.7505 11.6166 18.4985 7.17563 15.6665 4.34363C12.5475 1.22463 7.47255 1.22463 4.35355 4.34363C1.52155 7.17563 1.26955 11.6156 3.58055 14.7456ZM10.0097 9.00053C9.45875 9.00053 9.00975 9.44953 9.00975 10.0005C9.00975 10.5515 9.45875 11.0005 10.0097 11.0005C10.5607 11.0005 11.0097 10.5515 11.0097 10.0005C11.0097 9.44953 10.5607 9.00053 10.0097 9.00053ZM10.0097 13.0005C8.35575 13.0005 7.00975 11.6545 7.00975 10.0005C7.00975 8.34653 8.35575 7.00053 10.0097 7.00053C11.6637 7.00053 13.0097 8.34653 13.0097 10.0005C13.0097 11.6545 11.6637 13.0005 10.0097 13.0005Z" fill="#688AF5"/>
            </svg>

          </a>
          <div class="carStatusBtnInfo">{{ $t('support') }}</div>
        </div>
        <div class="carStatusBtn flex column items-center">
<!--          <div class="carStatusBtnIcon flex justify-center items-center" @click="cancel()">-->
<!--            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">-->
<!--              <path fill-rule="evenodd" clip-rule="evenodd" d="M16 1.29918L14.7008 0L8 6.70082L1.29918 0L0 1.29918L6.70082 8L0 14.7008L1.29918 16L8 9.3001L14.7008 16L16 14.7008L9.29918 8L16 1.29918Z" fill="#9B9B9B"/>-->
<!--            </svg>-->
<!--          </div>-->
<!--          <div class="carStatusBtnInfo">{{ $t('cancelOrder') }}</div>-->
        </div>
        <div class="carStatusBtn flex column items-center">
          <div class="carStatusBtnIcon flex justify-center items-center">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M17 1L10.4115 17L8.72465 10.2485C8.60434 9.76992 8.23008 9.39566 7.75155 9.27536L1 7.58847L17 1Z" stroke="#688AF5" stroke-width="2" stroke-linejoin="bevel"/>
            </svg>
          </div>
          <div class="carStatusBtnInfo">{{$t('shareRoute')}}</div>
        </div>
      </div>
    </q-card>
  </div>
</template>

<script>
export default {
  name: 'searchCar'
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
    z-index: 20;
  }
</style>
