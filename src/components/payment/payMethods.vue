<template>
    <div>
      <div class="editCards" @click="$emit('myCard')" v-if="this.cards">
        <img src="../../statics/payment_icons/editCard.svg" alt="">
      </div>
      <div class="pageTtl">{{ $t('paymentMethods') }}</div>
      <selectCard />
    </div>
</template>

<script>
import selectCard from './selectCard'
import { mapGetters } from 'vuex'
export default {
  name: 'payMethods',
  computed: {
    ...mapGetters({
      cards: 'user/payment/cards'
    })
  },
  components: {
    selectCard
  }
}
</script>

<style scoped>
  .editCards{
    position: absolute;
    top: 23px;
    right: 16px;
  }
</style>
