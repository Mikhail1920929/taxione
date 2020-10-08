<template>
  <q-page class="q-px-md flex column justify-evenly items-center">
    <div class="confirmHead flex column items-center">
      <div class="entryTtl">{{ $t('confirmTtl') }}</div>
      <div class="confirmInfo">{{ $t('confirmInfo') }}</div>
    </div>
    <div class="code flex justify-center">
      <q-input
        v-model="code1"
        :mask="smsMask"
        class="confirmInput firstInput"
        type="tel"
        autofocus
        ref="code1"
        @keyup="nextCode($event, 2)"
        :class="{activeCode: this.code1}"
        id="single-factor-code-text-field"
        autocomplete="one-time-code"
      />
      <q-input
        v-model="code2"
        mask="#"
        class="confirmInput"
        type="tel"
        ref="code2"
        :disable="!code1"
        @keyup="nextCode($event, 3)"
        :class="{activeCode: this.code2}"
      />
      <q-input
        v-model="code3"
        mask="#"
        class="confirmInput"
        type="tel"
        ref="code3"
        :disable="!code2"
        @keyup="nextCode($event, 4)"
        :class="{activeCode: this.code3}"
      />
      <q-input
        v-model="code4"
        mask="#"
        class="confirmInput"
        type="tel"
        ref="code4"
        :disable="!code3"
        @keyup="nextCode($event, 5)"
        :class="{activeCode: this.code4}"
      />
    </div>

    <div class="text-red text-center">{{error}}</div>
    <div class="timer" v-if="showTimer">
      00 : <span v-if="currentTime < 10">0</span>{{currentTime}}
    </div>
    <div class="confirmFooter flex column items-center">
      <div class="resendCode" @click="resend()" v-if="showResend === true">{{ $t('resendCode') }}</div>
      <div class="editPhone" @click="editPhone()">
        {{ $t('editPhone') }}
      </div>
    </div>
  </q-page>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'PageConfirm',
  data () {
    return {
      code1: '',
      code2: '',
      code3: '',
      code4: '',
      currentTime: null,
      timer: null,
      showTimer: true,
      showResend: false,
      error: null,
      smsMask: '####'
    }
  },
  computed: {
    code: function () {
      return this.code1 + this.code2 + this.code3 + this.code4
    }
  },
  methods: {
    ...mapActions({
      sendCode: 'user/auth/sendCode',
      confirmCode: 'user/auth/confirm'
    }),
    nextCode (event, index) {
      if (event.key >= 0 && event.key <= 9) {
        if (index < 5 && this.$refs['code' + index].value === '') {
          this.$refs['code' + index].focus()
        } else if (this.code.length === 4) {
          this.confirm()
        } else {
          this['code' + (index - 1)] = event.key
        }
      }
    },
    confirm () {
      if (this.code.length === 4) {
        this.confirmCode({ phone: localStorage.getItem('userPhone'), code: this.code })
          .then(response => {
            this.$router.push({ name: 'ride' })
          })
          .catch(error => {
            this.code1 = ''
            this.code2 = ''
            this.code3 = ''
            this.code4 = ''
            this.error = error.response.data.message
          })
      } else {
        this.error = 'Введите корректный код'
      }
    },
    resend () {
      this.sendCode({ phone: localStorage.getItem('userPhone'), country_code: localStorage.getItem('userCountry') })
        .then(response => {
          this.showTimer = true
          this.startTimer()
          this.code1 = ''
          this.code2 = ''
          this.code3 = ''
          this.code4 = ''
          this.error = ''
        })
        .catch(error => {
          this.error = error.response.data.message
        })
    },
    editPhone () {
      this.$emit('editPhone')
    },
    startTimer () {
      this.showResend = false
      this.showTimer = true
      this.currentTime = 59
      this.timer = setInterval(() => {
        this.currentTime--
      }, 1000)
    },
    stopTimer () {
      this.showTimer = false
      this.showResend = true
      clearTimeout(this.timer)
    }
  },
  mounted () {
    this.startTimer()
  },
  watch: {
    currentTime (time) {
      if (time === 0) {
        this.stopTimer()
      }
    },
    code1 (newValue, oldValue) {
      if (newValue.length === 4) {
        this.code1 = newValue[0]
        this.smsMask = '#'
        this.code2 = newValue[1]
        this.code3 = newValue[2]
        this.code4 = newValue[3]
        this.confirm()
      } else if (newValue.length === 1) {
      } else {
        this.code1 = this.code1[0]
      }
    }
  },
  destroyed () {
    this.stopTimer()
  }
}
</script>

<style>
  .entryTtl{
    font-size: 24px;
    color: #4A4A4A;
    line-height: 24px;
    font-weight: 600;
    text-align: center;
  }
  .timer{
    font-weight: 500;
    font-size: 15px;
    line-height: 18px;
    color: #4A4A4A;
  }
  .confirmInfo{
    margin-top: 24px;
    width: 85%;
    text-align: center;
    font-weight: 500;
    font-size: 13px;
    line-height: 16px;
    color: #4A4A4A;
  }
  .confirmFooter a{
    font-weight: 500;
    font-size: 12px;
    line-height: 16px;
    text-align: center;
    text-decoration-line: underline;
    color: #688AF5;
  }
  .resendCode{
    font-weight: 500;
    font-size: 12px;
    line-height: 16px;
    text-align: center;
    text-decoration-line: underline;
    color: #688AF5;
  }
  .confirmInput{
    width: 10%;
    margin-right: 10px;
  }
  .confirmInput input{
    font-weight: 500;
    font-size: 20px;
    line-height: 24px;
    text-align: center;
    color: #4A4A4A;
  }
  .firstInput input::first-letter{
    color: red;
  }
  .confirmInput .q-field--standard.q-field--readonly .q-field__control:before{
    border-bottom-style: solid !important;
  }
  .confirmInput .q-field__control:before{
    border-color: #4A4A4A;
  }
  .confirmInput .q-field__control:hover:before{
    border-color: #4A4A4A;
  }
  .confirmInput .q-field__control:after{
    background: #688AF5;
  }
  .activeCode .q-field__control:before{
    border-bottom: 2px solid #688AF5;
  }
  .activeCode .q-field__control:hover:before{
    border-bottom: 2px solid #688AF5;
  }
  .editPhone{
    font-weight: 500;
    font-size: 12px;
    line-height: 16px;
    text-align: center;
    text-decoration-line: underline;
    color: #688AF5;
    margin-top: 10px;
  }
</style>
