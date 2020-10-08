<template>
  <q-page>
    <router-link class="backMainPage flex justify-center items-center" :to="{name: 'ride'}" v-if="methods">
      <img src="../../statics/order_icons/arrow.svg" alt="">
    </router-link>
    <payMethods v-if="methods" @cardAdd="methods = false, add = true" @myCard="methods = false, my = true" />
    <myCards v-if="my"  @backPay="methods = true, my = false"/>
  </q-page>
</template>

<script>
import payMethods from '../../components/payment/payMethods'
import myCards from '../../components/payment/myCards'
export default {
  name: 'PageSettings',
  data () {
    return {
      methods: true,
      my: false
    }
  },
  beforeMount () {
    this.showBackBtn()
  },
  methods: {
    showBackBtn () {
      this.$root.$emit('hideMenu')
    }
  },
  components: {
    payMethods,
    myCards
  }
}
</script>

<style>
</style>
