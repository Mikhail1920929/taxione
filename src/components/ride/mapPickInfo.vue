<template>
  <div class="map-pick">
      <q-card class="selectRide">
        <div class="selectMapHeader flex justify-center">
          <div class="selectMapHeaderTtl">{{ $t('mapPickTtl') }}</div>
        </div>
        <q-separator />
        <q-item class="mapSelectMap">
          <div class="steps_item steps_item_active q-mr-md"></div>
          <q-item-section>
            <q-item-label>{{address}}</q-item-label>
          </q-item-section>
        </q-item>
        <q-item>
          <button class="mainBtn" v-if="isFrom === true" @click="$emit('pickonfirmed', 'from')">{{ $t('confirm') }}</button>
          <button class="mainBtn" v-if="isTo === true" @click="$emit('pickonfirmed', 'to')">{{ $t('confirm') }}</button>
        </q-item>
      </q-card>
    </div>
</template>

<script>
export default {
  props: {
    isTo: { type: Boolean, required: true },
    isFrom: { type: Boolean, required: true },
    address: { required: true }
  }
}
</script>

<style>
.selectRide{
    position: absolute;
    width: 100%;
    background: #F8F8F8;
    box-shadow: 0 2px 2px 0 rgba(0,0,0,0.24), 0 0 2px 0 rgba(0,0,0,0.12), inset 0 0 0 0 rgba(255,255,255,0.80);
    border-radius: 12px 12px 0 0;
    bottom: 0;
    left: 0;
  }
  .selectRide_active{
    height: 90%;
  }
  .selectMapHeader{
    padding: 22px 20px 12px;
    font-weight: 600;
    font-size: 16px;
    line-height: 20px;
  }
  .selectMapBtn{
    box-shadow: 2px 2px 4px 0 rgba(0,0,0,0.05), -4px -4px 8px 0 #FDFDFD, 4px 4px 8px 0 rgba(0,0,0,0.10), inset 6px 6px 12px 0 #FDFDFD;
    text-align: center;
    border-radius: 24px;
    font-size: 14px;
    color: #688AF5;
    letter-spacing: -0.35px;
    font-weight: 600;
    background: #F8F8F8;
  }
  .step__item {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: #816FF6;
    border: 3px solid #fff;
    box-shadow: 2px 2px 4px 0 rgba(0,0,0,0.05), -4px -4px 8px 0 #FDFDFD, 4px 4px 8px 0 rgba(0,0,0,0.10), 6px 6px 12px 0 #FDFDFD;
    transition: all .2s ease-in-out;
    z-index: 2;
  }

  .step__item_active {
    background-color: #688AF5;
    width: 16px;
    height: 16px;
    border: 3px solid #fff;
  }
</style>
