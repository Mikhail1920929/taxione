<template>
  <q-layout view="hHh Lpr lFf">
    <q-btn
      dense
      @click="leftDrawerOpen = !leftDrawerOpen"
      v-if="showMenu"
      icon="img:../statics/menu_icons/menu_btn.svg"
      aria-label="Menu"
      class="menuBtn"
    />

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      no-swipe-open
    >
      <q-list>
        <q-item class="menuHeader">
          <q-item-section>
            <q-item-label class="menuPhone" v-if="!user">
              <div class="phoneMaskStyle">Загрузка</div>
            </q-item-label>
            <q-item-label class="menuPhone" v-if="user">
              <q-input v-if="phoneMask" readonly :mask="phoneMask.phone_code + ' ' + phoneMask.phone_mask" v-model="user.phone" class="phoneMaskStyle"></q-input>
            </q-item-label>
            <userCard v-if="user && card" />
            <q-item-label v-if="user && !card && !default_company">
              <q-icon class="q-mr-sm" name="img:../statics/menu_icons/credit_card.svg"></q-icon>
              <span>{{ $t('cardNotAttached') }}</span>
            </q-item-label>
            <q-item-label v-if="user && !card && default_company">
              {{ $t('corporate') }}
            </q-item-label>
          </q-item-section>
        </q-item>
        <!-- <q-item class="menuItem" :to="{name: 'preorder'}">
          <q-item-section>
            <q-item-label class="flex items-center">
              {{ $t('preOrder') }}
              <div class="preordersCount flex justify-center items-center" v-if="preorders">
                {{preorders.length}}
              </div>
            </q-item-label>
          </q-item-section>
          <q-item-section avatar>
            <q-icon class="menuIcon" name="img:../statics/menu_icons/preorder.svg" />
          </q-item-section>
        </q-item> -->
        <q-item class="menuItem" :to="{name: 'history'}">
          <q-item-section>
            <q-item-label>{{ $t('history') }}</q-item-label>
          </q-item-section>
          <q-item-section avatar>
            <q-icon class="menuIcon" name="img:../statics/menu_icons/history.svg" />
          </q-item-section>
        </q-item>
        <q-item class="menuItem" :to="{name: 'payment'}">
          <q-item-section>
            <q-item-label>{{ $t('paymentMethods') }}</q-item-label>
          </q-item-section>
          <q-item-section avatar>
            <q-icon class="menuIcon" name="img:../statics/menu_icons/pay.svg" />
          </q-item-section>
        </q-item>
        <q-item class="menuItem" :to="{name: 'settings'}">
          <q-item-section >
            <q-item-label>{{ $t('settings') }}</q-item-label>
          </q-item-section>
          <q-item-section avatar>
            <q-icon class="menuIcon" name="img:../statics/menu_icons/settings.svg" />
          </q-item-section>
        </q-item>
      </q-list>
      <q-list style="position:absolute; bottom: 20px;" class="flex">
        <a href="https://wa.me/79111096769" target="_blank" class="menuLink">
          <q-item class="menuSupport">
              <div class="supportIcon flex justify-center items-center">
                <img src="../statics/menu_icons/support.svg" alt="">
              </div>
            <q-item-section>
              <q-item-label>{{ $t('support') }}</q-item-label>
            </q-item-section>
          </q-item>
        </a>
      </q-list>
    </q-drawer>

    <q-page-container v-if="this.user">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import userCard from '../components/payment/userCard'
export default {
  name: 'MyLayout',

  data () {
    return {
      showMenu: true,
      leftDrawerOpen: false,
      select: null
    }
  },
  created () {
    this.$root.$on('hideMenu', this.hideMenuBtn)
    this.$root.$on('showMenu', this.showMenuBtn)
  },
  beforeDestroy () {
    this.$root.$off('hideMenu', this.hideMenuBtn)
    this.$root.$off('showMenu', this.showMenuBtn)
  },
  beforeMount () {
    this.getCountries()
    this.check()
  },
  computed: {
    ...mapGetters({
      user: 'user/user/user',
      countries: 'user/auth/countries',
      card: 'user/user/card',
      preorders: 'user/preorder/preorders',
      default_company: 'user/user/default_company'
    }),
    phoneMask () {
      if (this.countries && this.countries !== null) {
        return this.countries.find(country => country.code === this.user.country.code)
      } else {
        return false
      }
    }
  },
  methods: {
    ...mapActions({
      getUser: 'user/user/getUser',
      getCountries: 'user/auth/getCountries',
      getCards: 'user/payment/getCards',
      loadPreorders: 'user/preorder/loadPreorders',
      editCard: 'user/user/editCard'
    }),
    check () {
      this.getUser()
        .then(response => {
          this.$i18n.locale = response.data.data.lang
          this.getCards()
            .then(response => {
              if (this.card && this.default_company) {
                this.editCard({ id: this.card.id })
              }
            })
          this.loadPreorders()
        })
    },
    hideMenuBtn () {
      this.showMenu = false
    },
    showMenuBtn () {
      this.showMenu = true
    }
  },
  components: {
    userCard
  }
}
</script>

<style>
  .q-drawer{
    border-radius: 0px 12px 12px 0px;
    background-color: #F8F8F8;
  }
  .menuHeader{
    background: linear-gradient(180deg, rgba(239, 239, 239, 0.0001) 0%, rgba(187, 187, 187, 0.25) 100%);
    padding: 18px 20px;
  }
  .menuHeaderImage{
    width: 40px;
    height: 40px;
    overflow: hidden;
    background: #F8F8F8;
    box-shadow: 4px 4px 8px rgba(0, 0, 0, 0.1), -4px -4px 10px #FDFDFD, 2px 2px 4px rgba(0, 0, 0, 0.05), inset 6px 6px 12px #FDFDFD;
    border-radius: 50%;
  }
  .menuHeaderImage img{
    width: 90%;
    height: auto;
    border-radius: 50%;
  }
  .phoneMaskStyle .q-field__control {
    height: auto;
  }
  .phoneMaskStyle .q-field__control:before{
    border: 0px;
  }
  .phoneMaskStyle .q-field__native{
    padding: 0;
  }
  .phoneMaskStyle input{
    font-weight: 500;
    font-size: 15px;
    line-height: 18px;
  }
  .menuItem{
    margin-left: 20px;
    padding: 20px 0;
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);
    font-weight: 500;
    font-size: 17px;
    line-height: 21px;
  }
  .menuIcon{
    margin-right: 20px;
  }
  .menuSupport{
    font-weight: 500;
    font-size: 17px;
    line-height: 21px;
  }
  .supportIcon{
    width: 36px;
    height: 36px;
    background: #F8F8F8;
    box-shadow: 4px 4px 8px rgba(0, 0, 0, 0.1), -4px -4px 10px #FDFDFD, 2px 2px 4px rgba(0, 0, 0, 0.05), inset 6px 6px 12px #FDFDFD;
    border-radius: 18px;
    margin-right: 20px;
  }
  .menuBtn{
    width: 36px;
    height: 36px ;
    position: fixed;
    top: 16px;
    left: 16px;
    z-index: 50;
    background-color: #FDFDFD;
    box-shadow: 2px 4px 10px 0 rgba(0,0,0,0.1);
    border-radius: 8px;
    color: #688AF5;
  }
  .menuBtn img{
    width: 22px;
    height: 16px;
  }
  .preordersCount{
    width: 24px;
    height: 24px;
    border-radius: 50%;
    background-color: #688AF5;
    color: #fff;
    margin-left: 10px;
    font-weight: 500;
    font-size: 13px;
  }
  .menuLink{
    color: #4A4A4A;
  }
  @media (min-width: 320px) and (max-width: 374px) {
    .menuBtn{
      top: 10px;
      left: 10px;
    }
  }

</style>
