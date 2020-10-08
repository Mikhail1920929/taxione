<template>
  <q-page class="flex column justify-between">
    <div class="settingsHeader">
      <div class="pageTtl">{{ $t('settings') }}</div>
      <div class="settingsList">
        <div class="settingsItem flex justify-between items-center" v-if="user">
          <div class="settingsTtl">{{ $t('number') }}</div>
          <div class="settingsInfo flex justify-end items-center">
            <div class="settingsInfoText">
              <q-input class="phoneInput" readonly v-model="user.phone" :mask="realLang.phone_code + ' ' +realLang.phone_mask" />
            </div>
          </div>
        </div>
        <div class="settingsItem flex justify-between items-center" @click="edit('editName')" v-if="user">
          <div class="settingsTtl">{{ $t('name') }}</div>
          <div class="settingsInfo flex justify-end items-center">
            <div class="settingsInfoText" v-if="user.first_name">{{user.first_name}} {{user.last_name}}</div>
            <div class="editArrow">
              <img src="../../statics/settings_icons/arrow.svg" alt="">
            </div>
          </div>
        </div>
        <div class="settingsItem flex justify-between items-center" @click="edit('editEmail')" v-if="user">
          <div class="settingsTtl">{{ $t('email') }}</div>
          <div class="settingsInfo flex justify-end items-center">
            <div class="settingsInfoText">{{user.email}}</div>
            <div class="settingsInfoText" v-if="!user.email">{{ $t('absent') }}</div>
            <div class="editArrow">
              <img src="../../statics/settings_icons/arrow.svg" alt="">
            </div>
          </div>
        </div>
        <div class="settingsItem flex justify-between items-center" @click="edit('editLang')" v-if="user">
          <div class="settingsTtl">{{ $t('language') }}</div>
          <div class="settingsInfo flex justify-end items-center">
            <div class="settingsInfoText" v-if="user.lang === 'ru'">{{ $t('langRu') }}</div>
            <div class="settingsInfoText" v-if="user.lang === 'en'">{{ $t('langEn') }}</div>
            <div class="editArrow">
              <img src="../../statics/settings_icons/arrow.svg" alt="">
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="settingsFooter flex column">
      <router-link :to="{ name: 'terms'}">{{ $t('license') }}</router-link>
      <router-link :to="{ name: 'policy'}">{{ $t('responsibility') }}</router-link>
      <div class="settingsFooterBtns flex justify-between">
        <button @click="exitPopUp = true" class="settingsBtns">{{ $t('exit') }}</button>
        <button @click="deletePopUp = true" v-if="deletePopUp === true" class="settingsBtns">{{ $t('delete') }}</button>
      </div>
    </div>
    <exit @close="exitPopUp = false" v-if="exitPopUp === true"/>
    <deleteAcc @close="deletePopUp = false" v-if="deletePopUp === true" />
  </q-page>
</template>

<script>
import { mapGetters } from 'vuex'
import exit from '../../components/popUps/exit'
import deleteAcc from '../../components/popUps/delete'
export default {
  name: 'userSettings',
  data () {
    return {
      exitPopUp: false,
      deletePopUp: false,
      userRealLang: null
    }
  },
  methods: {
    edit (type) {
      this.$emit(type)
    }
  },
  computed: {
    ...mapGetters({
      user: 'user/user/user',
      countries: 'user/auth/countries'
    }),
    realLang () {
      if (this.countries) {
        return this.countries.find(country => country.code === this.user.country.code)
      } else {
        return false
      }
    }
  },
  components: {
    exit,
    deleteAcc
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
  .settingsTtl{
    color: #4A4A4A;
    font-weight: 500;
    font-size: 17px;
    line-height: 21px;
    letter-spacing: -0.354167px;
    width: 25%;
  }
  .settingsInfo{
    width: 75%;
  }
  .settingsInfoText{
    font-weight: 500;
    font-size: 13px;
    line-height: 16px;
    color: #4A4A4A;
    opacity: 0.8;
    text-align: right;
    word-break: break-word;
    width: calc(100% - 31px);
  }
  .editArrow{
    margin-left: 24px;
    line-height: 0;
    font-size: 0;
  }
  .settingsFooter{
    width: 100%;
    padding: 0 16px 16px 16px;
    background: linear-gradient(180deg, rgba(239, 239, 239, 0.0001) 0%, rgba(187, 187, 187, 0.25) 100%);
  }
  .settingsFooter a{
    font-weight: 500;
    font-size: 12px;
    line-height: 16px;
    text-decoration-line: underline;
    color: #688AF5;
    margin-bottom: 10px;
  }
  .settingsBtns{
    margin-top: 22px;
    width: 45%;
    background: #F8F8F8;
    box-shadow: 2px 2px 4px 0 rgba(0,0,0,0.05), -4px -4px 10px 0 #FDFDFD, 4px 4px 8px 0 rgba(0,0,0,0.10), inset 6px 6px 12px 0 #FDFDFD;
    border-radius: 8px;
    color: #688AF5;
    letter-spacing: -0.35px;
    text-align: center;
    border: 0px;
    font-weight: 500;
    font-size: 17px;
    line-height: 21px;
    padding: 14px 0;
  }
  .phoneInput .q-field__control {
    height: auto;
  }
  .phoneInput .q-field__control:before{
    border: 0px;
  }
  .phoneInput .q-field__native{
    padding: 0;
  }
  .phoneInput input{
    font-weight: 500;
    font-size: 13px;
    line-height: 16px;
    color: #4A4A4A;
    opacity: 0.8;
    text-align: right;
  }
</style>
