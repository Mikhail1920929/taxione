<template>
  <div class="checkPayBg flex column items-center justify-center">
    <div class="checkTtl">{{ $t('cardCheck') }}</div>
    <q-spinner
      size="64px"
      :thickness="2"
      class="checkSpinner"
    />
  </div>
</template>

<script>
export default {
  name: 'orderError',
  data () {
    return {
    }
  },
  props: ['error']
}
</script>

<style>
  .checkPayBg{
    width: 100%;
    height: 100%;
    position: absolute;
    background-color: #f8f8f8;
    z-index: 200;
  }
  .checkTtl{
    font-weight: 600;
    font-size: 24px;
    line-height: 24px;
  }
  .checkInfo{
    font-weight: 500;
    font-size: 13px;
    line-height: 16px;
    text-align: center;
    color: #9B9B9B;
    margin: 36px 0;
  }
  .checkSpinner > circle{
    stroke: #688AF5;
  }
</style>
