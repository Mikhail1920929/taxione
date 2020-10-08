<template>
  <q-page class="flex column justify-between">
    <div class="settingsHeader">
      <router-link class="backMainPage flex justify-center items-center" :to="{name: 'ride'}">
        <img src="../../statics/order_icons/arrow.svg" alt="">
      </router-link>
      <div class="pageTtl">{{ $t('support') }}</div>
      <div class="supportList">
        <router-link :to="{name: 'support.page', params: { id: item.id, name: item.name } }" class="supportItem flex justify-between items-center" v-for="item in items" :key="item.id">
          <div class="supportTtl">{{item.name}}</div>
          <div class="supportInfo flex items-center">
            <div class="editArrow">
              <img src="../../statics/settings_icons/arrow.svg" alt="">
            </div>
          </div>
        </router-link>
      </div>
    </div>
    <div class="supportFooter flex column">
      <a class="mainBtn text-center" href="https://wa.me/79111096769">{{ $t('goChat') }}</a>
    </div>
  </q-page>
</template>

<script>
export default {
  name: 'PageSettings',
  data () {
    return {
      showBack: false,
      items: [
        { id: 1, name: 'Забытые вещи' },
        { id: 2, name: 'Платежи и тарифы' },
        { id: 3, name: 'Происшествия' },
        { id: 4, name: 'Сложности с сервисом' }
      ]
    }
  },
  beforeMount () {
    this.showBackBtn()
  },
  methods: {
    showBackBtn () {
      this.$root.$emit('hideMenu')
      this.showBack = true
    }
  }
}
</script>

<style>
  .supportItem{
    padding: 18px 24px 18px 32px;
    border-bottom: 1px solid rgba(0,0,0,0.2);
  }
  .supportItem:first-child{
    border-top: 1px solid rgba(0,0,0,0.2);
  }
  .supportTtl{
    color: #4A4A4A;
    font-weight: 500;
    font-size: 17px;
    line-height: 21px;
    letter-spacing: -0.354167px;
  }
  .settingsInfoText{
    font-weight: 500;
    font-size: 13px;
    line-height: 16px;
    color: #4A4A4A;
    opacity: 0.8;
  }
  .editArrow{
    margin-left: 24px;
    line-height: 0;
    font-size: 0;
  }
  .supportFooter{
    width: 100%;
    padding: 0 16px 16px 16px;
    background: linear-gradient(180deg, rgba(239, 239, 239, 0.0001) 0%, rgba(187, 187, 187, 0.25) 100%);
  }
  .supportFooter a {
    color: #fff;
  }
</style>
