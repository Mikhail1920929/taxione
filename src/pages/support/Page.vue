<template>
  <q-page>
    <router-link class="backMainPage flex justify-center items-center" :to="{name: 'support'}">
      <img src="../../statics/order_icons/arrow.svg" alt="">
    </router-link>
    <div class="pageTtl">{{ this.$route.params.name }}</div>
    <p class="q-px-md">Пример страницы</p>
  </q-page>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'EditName',
  data () {
    return {
    }
  },
  beforeMount () {
    this.showBackBtn()
    this.check()
  },
  methods: {
    ...mapActions({
      checkUser: 'auth/check',
      refreshToken: 'auth/refresh'
    }),
    check () {
      this.refreshToken()
        .then(response => {
          this.checkUser()
            .then(response => {
              this.$i18n.locale = response.data.user.lang
            })
        })
    },
    showBackBtn () {
      this.$root.$emit('hideMenu')
      this.showBack = true
    },
    clear () {
      this.name = ''
    },
    saveName () {
      this.$router.replace({ name: 'settings' })
    }
  }
}
</script>

<style>
</style>
