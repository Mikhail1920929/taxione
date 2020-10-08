<template>
  <q-page class="flex column justify-between">
    <div class="loginHead q-px-md flex column justify-evenly">
      <div class="flex justify-center">
        <div class="entryTtl">{{ $t('singIn') }}</div>
      </div>
      <div class="goConfirm flex column" v-if="model">
        <q-input
          :placeholder="$t('phoneNumber')"
          v-model="phone"
          class="loginPhoneInput"
          dense
          :mask="model.phone_mask"
          type="tel"
          autocomplete="off"
        >
          <template v-slot:prepend>
            <q-select
              v-model="model"
              :options="countries"
              option-value="code"
              emit-value
              borderless
              map-options
              options-selected-class="text-deep-orange"
              behavior="menu"
              @input="getMask()"
              class="selectCountry"
              dense
            >
              <template v-slot:option="scope">
                <q-item
                  v-bind="scope.itemProps"
                  v-on="scope.itemEvents"
                >
                  <q-item-section avatar>
                    <img
                      :src="'../../statics/countries_icons/' + scope.opt.code.toLowerCase() + '.svg'"
                      width="32px"
                      height="24px"
                    />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label v-html="scope.opt.name" />
                  </q-item-section>
                </q-item>
              </template>
              <template v-slot:selected>
                <img
                  :src="'../../statics/countries_icons/' + model.code.toLowerCase() + '.svg'"
                  width="32px"
                  height="24px"
                />
              </template>
            </q-select>
            <span class="selectCode">{{model.phone_code}}</span>
          </template>
        </q-input>
        <div class="flex justify-center text-red loginError" v-if="error">{{error}}</div>
        <button class="mainBtn" :disabled="emptyPhone" @click="goConfirm()">{{ $t('continue') }}</button>
        <p class="authInfo">{{ $t('privacyPolicyInfo') }} <router-link :to="{ name: 'policy' }">{{ $t('privacyPolicyLink') }}</router-link></p>
      </div>
    </div>
    <div class="entrySocial flex column items-center justify-center" style="display: none">
      <div class="socials flex">
        <div class="social flex justify-center items-center">
          <img src="../../statics/login_icons/fb.svg" alt="">
        </div>
        <div class="social flex justify-center items-center">
          <img src="../../statics/login_icons/google.svg" alt="">
        </div>
      </div>
      <div class="socialInfo">{{ $t('socialAuthInfo') }}</div>
    </div>
  </q-page>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'sendCode',
  data () {
    return {
      model: { code: 'RUS', name: 'Russia', lang: 'ru', phone_code: '+7', phone_mask: '(###)###-##-##' },
      phone: '',
      lang: this.$i18n.locale,
      error: null
    }
  },
  computed: {
    ...mapGetters({
      countries: 'user/auth/countries'
    }),
    unmaskedPhone: function () {
      return this.model.phone_code + this.phone.replace(/[\D]/g, '')
    },
    phoneLenght: function () {
      return this.phone.replace(/[\D]/g, '')
    },
    maskLenght: function () {
      return this.model.phone_mask.split('(').join('').split(')').join('').split('-').join('').split(' ').join('')
    },
    emptyPhone () {
      if (this.phoneLenght.length === this.maskLenght.length) {
        return false
      } else {
        return true
      }
    }
  },
  methods: {
    ...mapActions({
      sendCode: 'user/auth/sendCode',
      countriesGet: 'user/auth/getCountries'
    }),
    getMask () {
      this.model = this.countries.find(country => country.code === this.model)
      this.$i18n.locale = this.model.lang
    },
    goConfirm () {
      if (this.phoneLenght.length === this.maskLenght.length) {
        this.sendCode({ phone: this.unmaskedPhone, country_code: this.model.code, lang: this.model.lang })
          .then(response => {
            this.$emit('goConfirm')
          })
          .catch(error => {
            this.error = error.response.data.message
          })
      } else {
        this.error = 'Введите корректный номер'
      }
    }
  },
  beforeMount () {
    this.countriesGet()
    localStorage.clear()
  }
}
</script>

<style>
  .loginHead{
    height: 80vh;
  }
  .entryTtl{
    font-size: 24px;
    color: #4A4A4A;
    line-height: 24px;
    font-weight: 600;
    text-align: center;
  }
  .loginPhoneInput{
    margin-bottom: 30px;
    padding: 0 24px;
  }
  .loginPhoneInput input{
    font-weight: 500;
    font-size: 18px;
    line-height: 22px;
    color: #4A4A4A;
  }
  .selectCode{
    font-weight: 500;
    font-size: 18px;
    line-height: 22px;
    color: #4A4A4A;
    margin-left: 7px;
  }
  .loginError{
    margin-bottom: 30px;
    text-align: center;
  }
  .authInfo{
    font-size: 12px;
    color: #9B9B9B;
    letter-spacing: 0;
    text-align: center;
    margin-top: 20px;
  }
  .authInfo a{
    color: #688AF5;
    text-decoration: underline;
  }
  .entrySocial{
    height: 20vh;
    background: linear-gradient(rgba(187, 187, 187, 0.25), rgba(239, 239, 239, 0.01));
  }
  .socials{
    margin-bottom: 20px;
  }
  .social{
    width: 36px;
    height: 36px;
    background-color: #F8F8F8;
    box-shadow: 4px 4px 8px rgba(0, 0, 0, 0.1), -4px -4px 10px #FDFDFD, 2px 2px 4px rgba(0, 0, 0, 0.05), inset 6px 6px 12px #FDFDFD;
    border-radius: 50%;
  }
  .social:first-child{
    margin-right: 40px;
  }
  .socialInfo{
    padding: 0 30px;
    font-style: normal;
    font-weight: 500;
    font-size: 8px;
    line-height: 10px;
    text-align: center;
    color: #9B9B9B;
  }
  .loginPhoneInput .q-field__control:before{
    border-color: #4A4A4A;
  }
  .loginPhoneInput .q-field__control:hover:before{
    border-color: #4A4A4A;
  }
  .loginPhoneInput .q-field__control:after{
    background: #688AF5;
  }
  .selectCountry{
    padding-left: 5px;
  }
  .selectCountry .q-field__control:before{
    border: none;
  }
  .selectCountry .q-field__control:hover:before{
    border: none;
  }
  .selectCountry .q-field__control:after{
    height: 0px;
  }
  .selectCountry .q-field--dense .q-field__after, .q-field--dense .q-field__append{
    padding-left: 10px;
  }
  .selectCountry .q-select__dropdown-icon{
    font-size: 0;
    width: 14px;
    height: 8px;
    background-image: url("../../statics/login_icons/down.svg");
  }
  .q-field__native .q-placeholder{
    padding-left: 15px;
  }
  @media (min-width: 320px) and (max-width: 374px) {
    .loginPhoneInput{
      padding: 0;
    }
  }
</style>
