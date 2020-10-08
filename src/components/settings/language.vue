<template>
  <q-page class="flex column justify-between">
    <div class="backMainPage flex justify-center items-center" @click="back()">
      <img src="../../statics/order_icons/arrow.svg" alt="">
    </div>
    <div class="settingsHeader">
      <div class="pageTtl">{{ $t('language') }}</div>
      <div class="settingsList">
        <div class="settingsItem flex justify-between items-center" @click="selectLang('ru')">
          <div class="langTtl">{{ $t('langRu') }}</div>
          <div class="langInfo flex items-center">
            <div class="settingsSelect flex items-center justify-center" :class="{activeSelect: lang === 'ru'}">
              <svg v-if="lang === 'ru'" width="14" height="11" viewBox="0 0 14 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M5.55346 7.24218L12.0048 0.790842C12.3926 0.403053 13.0213 0.403053 13.4091 0.790842C13.7969 1.17863 13.7969 1.80736 13.4091 2.19515L5.55346 10.0508L0.990793 5.48814C0.603004 5.10035 0.603004 4.47162 0.990793 4.08383C1.37858 3.69604 2.00731 3.69604 2.3951 4.08383L5.55346 7.24218Z" fill="#688AF5"/>
              </svg>
            </div>
          </div>
        </div>
        <div class="settingsItem flex justify-between items-center" @click="selectLang('en')">
          <div class="langTtl" >{{ $t('langEn') }}</div>
          <div class="langInfo flex items-center">
            <div class="settingsSelect flex items-center justify-center" :class="{activeSelect: lang === 'en'}">
              <svg v-if="lang === 'en'" width="14" height="11" viewBox="0 0 14 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M5.55346 7.24218L12.0048 0.790842C12.3926 0.403053 13.0213 0.403053 13.4091 0.790842C13.7969 1.17863 13.7969 1.80736 13.4091 2.19515L5.55346 10.0508L0.990793 5.48814C0.603004 5.10035 0.603004 4.47162 0.990793 4.08383C1.37858 3.69604 2.00731 3.69604 2.3951 4.08383L5.55346 7.24218Z" fill="#688AF5"/>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="settingsFooter">
      <button class="mainBtn" @click="save()">{{ $t('save') }}</button>
    </div>
  </q-page>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'EditName',
  data () {
    return {
      langs: [
        { name: 'Русский', code: 'ru' },
        { name: 'Английский', code: 'en' }
      ],
      lang: ''
    }
  },
  computed: {
    ...mapGetters({
      user: 'user/user/user',
      countries: 'user/auth/countries'
    })
  },
  beforeMount () {
    this.lang = this.user.lang
  },
  methods: {
    ...mapActions({
      edit: 'user/user/editLang'
    }),
    back () {
      this.$emit('backSettings')
      this.$i18n.locale = this.user.lang
    },
    save () {
      this.edit({ lang: this.lang })
        .then(response => {
          this.$emit('backSettings')
        })
        .catch(error => {
          this.error = error.response.data.message
        })
    },
    selectLang (lang) {
      if (this.lang === lang) {
      } else {
        this.$i18n.locale = lang
        this.lang = lang
      }
    }
  }
}
</script>

<style>
  .settingsItem{
    padding: 18px 24px 18px 32px;
    border-bottom: 1px solid rgba(0,0,0,0.2);
  }
  .settingsItem:first-child{
    border-top: 1px solid rgba(0,0,0,0.2);
  }
  .langTtl{
    color: #4A4A4A;
    font-weight: 500;
    font-size: 17px;
    line-height: 21px;
    letter-spacing: -0.354167px;
  }
  .settingsSelect{
    width: 24px;
    height: 24px;
    border-radius: 50%;
    border: 1px solid #688AF5;
    margin-left: 6px;
  }
  .activeSelect{
    border: 1px solid #FFFFFF;
    background-color: #FFFFFF;
  }
</style>
