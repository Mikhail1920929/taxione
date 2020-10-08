<template>
  <q-page>
    <div class="backMainPage flex justify-center items-center" @click="back()">
      <img src="../../statics/order_icons/arrow.svg" alt="">
    </div>
    <div class="pageTtl">{{ $t('email') }}</div>
    <div class="editName">
      <q-form
        @submit="save()"
      >
        <q-input
          dense
          v-model="email"
          class="emailInput"
          type="email"
          placeholder="example@email.com"
        >
          <template v-slot:append>
            <div class="clear" @click="clear()" v-if="email">
              <img src="../../statics/settings_icons/clear.svg" alt="">
            </div>
          </template>
        </q-input>
        <div class="error nameError flex justify-center q-mb-lg" style="">{{error}}</div>
        <button class="mainBtn" type="submit" :disabled="emptyEmail">{{ $t('confirm') }}</button>
      </q-form>
    </div>
  </q-page>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'EditName',
  data () {
    return {
      email: '',
      error: null
    }
  },
  computed: {
    ...mapGetters({
      user: 'user/user/user'
    }),
    emptyEmail () {
      if (this.email && this.validEmail && this.checkFirstPartEmail && this.checkSecondPartEmail) {
        return false
      } else {
        return true
      }
    },
    checkFirstPartEmail () {
      if (this.email.split('@').shift().length <= 64) {
        return true
      } else {
        return false
      }
    },
    checkSecondPartEmail () {
      let partLenght = this.email.split('@').pop().split('.').shift().length
      if (partLenght >= 2 && partLenght <= 63) {
        return true
      } else {
        return false
      }
    },
    validEmail () {
      // eslint-disable-next-line no-useless-escape
      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      return re.test(this.email)
    }
  },
  mounted () {
    this.email = this.user.email
  },
  methods: {
    ...mapActions({
      edit: 'user/user/editEmail'
    }),
    back () {
      this.$emit('backSettings')
    },
    save () {
      this.edit({ email: this.email })
        .then(response => {
          this.$emit('backSettings')
        })
        .catch(error => {
          this.error = error.response.data.errors.email[0]
        })
    },
    clear () {
      this.email = ''
    }
  }
}
</script>

<style>
  .editName{
    padding: 0 32px;
  }
  .emailInput{
    padding: 0 16px;
    margin-bottom: 40px;
  }
  .emailInput input{
    font-weight: 500;
    font-size: 18px;
    line-height: 22px;
    color: #4A4A4A;
    padding: 10px;
  }
  .emailInput .q-field__control:before{
    border-color: #9B9B9B;
  }
  .emailInput .q-field__control:hover:before{
    border-color: #9B9B9B;
  }
  .emailInput .q-field__control:after{
    background: #688AF5;
  }
  .clear{
    margin-right: 10px;
  }
  .nameError{
    color: red;
    text-align: center;
    display: block;
  }
  .nameError:first-letter{
    text-transform: uppercase;
  }
</style>
