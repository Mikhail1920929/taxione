<template>
  <q-page>
    <router-link class="backMainPage flex justify-center items-center" :to="{name: 'ride'}" v-if="settings">
      <img src="../../statics/order_icons/arrow.svg" alt="">
    </router-link>
    <userSettings v-if="settings"
      @editName="settings = false, userName = true"
      @editEmail="settings = false, userEmail = true"
      @editLang="settings = false, userLang = true"
    />
    <name
      v-if="userName"
      @backSettings="userName = false, settings = true"
    />
    <email v-if="userEmail" @backSettings="userEmail = false, settings = true" />
    <language v-if="userLang" @backSettings="userLang = false, settings = true" />
  </q-page>
</template>

<script>
import userSettings from '../../components/settings/userSettings'
import name from '../../components/settings/name'
import email from '../../components/settings/email'
import language from '../../components/settings/language'
import { mapActions } from 'vuex'
export default {
  name: 'PageSettings',
  data () {
    return {
      settings: true,
      userName: false,
      userEmail: false,
      userLang: false,
      showBack: false
    }
  },
  beforeMount () {
    this.showBackBtn()
  },
  methods: {
    ...mapActions({
      getUser: 'user/user/getUser'
    }),
    showBackBtn () {
      this.$root.$emit('hideMenu')
      this.showBack = true
    }
  },
  components: {
    userSettings,
    name,
    email,
    language
  }
}
</script>

<style>
</style>
