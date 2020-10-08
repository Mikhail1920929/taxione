<template>
  <div class="selectBg" @click="closeTimeSelect()">
    <q-card class="selectTime" @click.stop>
      <div class="selectTimeHeader flex justify-between">
        <div class="now">
          <q-btn :label="$t('now')" @click="closeNow()" no-caps class="btnStyle" />
        </div>
        <div class="done">
          <q-btn :label="$t('done')" @click="closeTimeSelect()" no-caps class="btnStyle" />
        </div>
      </div>
      <q-separator />
      <div class="select">
        <scroll-picker-group>
          <scroll-picker class="vue-scroll-picker-8" :options="days" v-model="day"></scroll-picker>
          <scroll-picker class="vue-scroll-picker-2" :options="hours" v-model="hour"></scroll-picker>
          <scroll-picker class="vue-scroll-picker-2" :options="minutes" v-model="minute"></scroll-picker>
        </scroll-picker-group>
      </div>
      <div class="nameplateInfo flex justify-between items-center">
        <div class="toggle flex items-center">
          <div class="toggleWrapper">
            <input type="checkbox" v-model="nameplate" class="mobileToggle" id="toggle">
            <label for="toggle"></label>
          </div>
          {{ $t('meetSign') }}
        </div>
        <div class="nameplateInfoImg">
          <img src="../../statics/order_icons/info.svg" alt="">
        </div>
      </div>
    </q-card>
  </div>
</template>

<script>
import { ScrollPicker, ScrollPickerGroup } from 'vue-scroll-picker'
import 'vue-scroll-picker/dist/style.css'
export default {
  name: 'selectTime',
  data () {
    return {
      day: 'today',
      hour: null,
      minute: null,
      nameplate: false,
      now: false
    }
  },
  computed: {
    minutes () {
      var min = []
      for (let i = 0; i <= 59; i++) {
        if (i < 9) {
          min[i] = { value: '0' + i, name: '0' + i }
        } else {
          min[i] = { value: i, name: i }
        }
      }
      return min
    },
    hours () {
      var hours = []
      for (let i = 0; i <= 23; i++) {
        if (i < 9) {
          hours[i] = { value: '0' + i, name: '0' + i }
        } else {
          hours[i] = { value: i, name: i }
        }
      }
      return hours
    },
    days () {
      var week = [{ value: 'today', name: 'Сегодня' }]
      var tomorrow = new Date()
      for (let i = 0; i <= 7; i++) {
        tomorrow.setDate(tomorrow.getDate() + 1)
        let name = new Date(tomorrow).toLocaleString('ru-Ru', { weekday: 'short', day: 'numeric', month: 'long' })
        let value = new Date(tomorrow).toLocaleString('ru-Ru', { day: 'numeric', month: 'numeric', year: 'numeric' })
        week.push({ value: value, name: name })
      }
      return week
    }
  },
  methods: {
    closeTimeSelect () {
      this.$emit('closeTime', { nameplate: this.nameplate, date: this.day, hours: this.hour, minutes: this.minute, now: this.now })
    },
    closeNow () {
      this.now = true
      this.closeTimeSelect()
    }
  },
  components: {
    ScrollPicker,
    ScrollPickerGroup
  }
}
</script>

<style>
  .selectBg{
    width: 100%;
    height: 100%;
    position: absolute;
    background-color: rgba(25, 25, 25, 0.5);
    z-index: 50;
  }
  .selectTime{
    width: 100%;
    position: absolute;
    box-shadow: 0 2px 2px 0 rgba(0,0,0,0.24), 0 0 2px 0 rgba(0,0,0,0.12), inset 0 0 0 0 rgba(255,255,255,0.80);
    border-radius: 12px 12px 0 0;
    bottom: 0;
    left: 0;
    background: #F8F8F8;
    overflow: hidden;
  }
  .selectTimeHeader{
    padding: 16px;
    background-color: #F8F8F8;
  }
  .btnStyle{
    background: #F8F8F8;
    box-shadow: 2px 2px 4px 0 rgba(0,0,0,0.05), -4px -4px 8px 0 #FDFDFD, 4px 4px 8px 0 rgba(0,0,0,0.10), inset 6px 6px 12px 0 #FDFDFD;
    border-radius: 16px;
    border: 0px;
    font-size: 15px;
    color: #688AF5;
    letter-spacing: -0.36px;
  }
  .select{
    width: 100%;
    font-weight: 500;
    font-size: 23px;
    color: #333333;
    letter-spacing: 0.7px;
    background: #F8F8F8;
  }
  .nameplateInfo{
    padding: 16px;
    background: #F8F8F8;
  }
  .nameplateInfoImg{
    width: 24px;
    height: 24px;
  }
  .vue-scroll-picker-layer .top {
    height: 43% !important;
  }
  .vue-scroll-picker-layer .middle{
    top: 43% !important;
    bottom: 43% !important;
  }
  .vue-scroll-picker-layer .bottom {
    height: 43% !important;
  }
  .toggleWrapper {
    width: 50px;
    height: 32px;
    margin-right: 20px;
  }
  .toggleWrapper input.mobileToggle {
    opacity: 0;
    position: absolute;
  }
  .toggleWrapper input.mobileToggle + label {
    position: relative;
    display: inline-block;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    transition: 0.4s ease;
    height: 30px;
    width: 50px;
    border: 1px solid #e4e4e4;
    border-radius: 60px;
  }
  .toggleWrapper input.mobileToggle + label:before {
    content: "";
    position: absolute;
    display: block;
    transition: 0.2s cubic-bezier(0.24, 0, 0.5, 1);
    height: 30px;
    width: 51px;
    top: 0;
    left: 0;
    border-radius: 100px;
  }
  .toggleWrapper input.mobileToggle + label:after {
    content: "";
    position: absolute;
    display: block;
    transition: 0.35s cubic-bezier(0.54, 1.6, 0.5, 1);
    height: 28px;
    width: 28px;
    top: 0px;
    left: 0px;
    background: #FFFFFF;
    border: 0 solid rgba(0,0,0,0.04);
    box-shadow: 0 3px 8px 0 rgba(0,0,0,0.15), 0 1px 1px 0 rgba(0,0,0,0.16), 0 3px 1px 0 rgba(0,0,0,0.10);
    border-radius: 100px;
  }
  .toggleWrapper input.mobileToggle:checked + label:before {
    background: #688AF5;
    transition: width 0.2s cubic-bezier(0, 0, 0, 0.1);
  }
  .toggleWrapper input.mobileToggle:checked + label:after {
    left: 22px;
  }

</style>
