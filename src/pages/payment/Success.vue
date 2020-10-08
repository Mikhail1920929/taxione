<template>
  <q-page class="flex justify-center items-center">
    <div class="success flex column justify-center items-center">
      <div class="success-image">
        <div class="checkBlock">
          <div class="check"></div>
        </div>
      </div>
      <div class="checkTtl">{{ $t('successPay') }}</div>
    </div>
  </q-page>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'successPay',
  beforeMount () {
    this.showBackBtn()
    this.getUser()
    this.getCards()
      .then(response => {
        setTimeout(() => {
          this.$router.replace({ name: 'payment' })
        }, 2000)
      })
  },
  methods: {
    ...mapActions({
      getUser: 'user/user/getUser',
      getCards: 'user/payment/getCards'
    }),
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
  .checkBlock{
    width: 100px;
    height: 100px;
    margin-bottom: 40px;
  }
  .check {
    background: #688AF5;
    height: 100px;
    width: 14px;
    position: relative;
    left: 60px;
    transform: rotate(-145deg);
  }
  .check:after {
    content: "";
    height: 14px;
    width: 56px;
    background: #688AF5;
    position: absolute;
    right: -42px;
    top: 0px;
  }
</style>
