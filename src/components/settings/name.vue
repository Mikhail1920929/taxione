<template>
  <q-page>
    <div class="backMainPage flex justify-center items-center" @click="back()">
      <img src="../../statics/order_icons/arrow.svg" alt="">
    </div>
    <div class="pageTtl">{{ $t('name') }}</div>
    <div class="editName">
      <q-input
        dense
        v-model="name"
        class="nameInput"
        placeholder="Иван Петров"
      >
        <template v-slot:append>
          <div class="clear" @click="clear()" v-if="name">
            <img src="../../statics/settings_icons/clear.svg" alt="">
          </div>
        </template>
      </q-input>
      <div class="error flex justify-center q-mb-lg text-red">{{error}}</div>
      <button class="mainBtn" :disabled="emptyName" @click="save()">{{ $t('confirm') }}</button>
    </div>
  </q-page>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'EditName',
  data () {
    return {
      name: null,
      error: null
    }
  },
  computed: {
    ...mapGetters({
      user: 'user/user/user'
    }),
    emptyName () {
      if (this.name !== '') {
        return false
      } else {
        return true
      }
    }
  },
  mounted () {
    this.name = this.user.first_name + ' ' + this.user.last_name
  },
  methods: {
    ...mapActions({
      edit: 'user/user/editName'
    }),
    back () {
      this.$emit('backSettings')
    },
    save () {
      if (this.name.split(' ')[0] && this.name.split(' ')[1] && this.name.split(' ')[0] !== this.name.split(' ')[1] && this.name.split(' ').length === 2) {
        this.edit({ first_name: this.name.split(' ')[0], last_name: this.name.split(' ')[1] })
          .then(response => {
            this.$emit('backSettings')
          })
          .catch(error => {
            this.error = error.response.data.message
          })
      } else {
        this.error = this.$i18n.t('inCorrectName')
      }
    },
    clear () {
      this.name = ''
    }
  }
}
</script>

<style>
  .editName{
    padding: 0 32px;
  }
  .nameInput{
    margin-bottom: 40px;
    padding: 0 16px;
  }
  .nameInput input{
    font-weight: 500;
    font-size: 18px;
    line-height: 22px;
    color: #4A4A4A;
    padding: 10px;
  }
  .nameInput .q-field__control:before{
    border-color: #9B9B9B;
  }
  .nameInput .q-field__control:hover:before{
    border-color: #9B9B9B;
  }
  .nameInput .q-field__control:after{
    background: #688AF5;
  }
  .unActiveBtn{
    color: #A4A4A4;
    background: #F8F8F8;
    box-shadow: 4px 4px 8px rgba(0, 0, 0, 0.1), -4px -4px 10px rgba(253, 253, 253, 0.75), 2px 2px 4px rgba(0, 0, 0, 0.05), inset 6px 6px 12px #FDFDFD;
  }
  .clear{
    margin-right: 10px;
  }
</style>
