<template>
  <q-page class="flex justify-center items-center">
    <div class="success flex column justify-center items-center">
      <div class="crossBlock">
        <div class="cross"></div>
      </div>
      <div class="checkTtl">{{ $t('failPay') }}</div>
    </div>
  </q-page>
</template>

<script>
export default {
  name: 'failPay',
  beforeMount () {
    this.showBackBtn()
    setTimeout(() => {
      this.$router.replace({ name: 'payment' })
    }, 2000)
  },
  methods: {
    showBackBtn () {
      this.$root.$emit('hideMenu')
    },
    back () {
      this.$emit('closeCheck')
    }
  }
}
</script>

<style>
  .success{
    width: 100%;
    padding: 0 16px;
  }
  .checkTtl{
    font-weight: 600;
    font-size: 24px;
    line-height: 24px;
    text-align: center;
    color: #4A4A4A;
    margin-bottom: 30px;
  }
  .crossBlock{
    width: 100px;
    height: 100px;
    margin-bottom: 40px;
  }
  .cross {
    background: #688AF5;
    height: 100px;
    width: 14px;
    position: relative;
    left: 40px;
    transform: rotate(45deg);
  }
  .cross:after {
    content: "";
    height: 14px;
    width: 100px;
    background: #688AF5;
    position: absolute;
    left: -43px;
    top: 43px;
  }
</style>
