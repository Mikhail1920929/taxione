<template>
    <div v-if="user">
      <div v-if="!user.default_card && cards === null" class="addCardBlock">
        <button @click="addCard()" class="addCard flex justify-between items-center">
          {{ $t('addCard') }}
          <img src="../../statics/settings_icons/plus.svg" alt="">
        </button>
      </div>
      <div class="greyLine" v-if="cards"></div>
      <div v-for="(card, index) in cards" :key="card.card_id" @click="selectCard(card, index)">
        <q-item class="paymentBlock" :disable="card.card_id === failCard">
          <q-item-section avatar class="paymentImg">
            <img :src="'../../statics/payment_icons/' + cardIcon(card.pan)">
          </q-item-section>
          <q-item-section class="paymentName">
            {{ cardName(card.pan) }}
          </q-item-section>
          <q-item-section side class="paymentInfo">
            •••• <span>{{card.pan.slice(12)}}</span>
          </q-item-section>
          <q-item-section side>
            <div class="paymentSelect flex items-center justify-center" v-if="card.card_id === failCard" :class="{failSelect: index === payFailCard}">
              <svg v-if="index === payFailCard"  width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M12 0.974388L11.0256 0L6 5.02561L0.974388 0L0 0.974388L5.02561 6L0 11.0256L0.974388 12L6 6.97508L11.0256 12L12 11.0256L6.97439 6L12 0.974388Z" fill="#F25D70"/>
              </svg>
            </div>
            <div class="paymentSelect flex items-center justify-center" v-else :class="{activeSelect: index === userSelectCard}">
              <svg v-if="index === userSelectCard" width="14" height="11" viewBox="0 0 14 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M5.55346 7.24218L12.0048 0.790842C12.3926 0.403053 13.0213 0.403053 13.4091 0.790842C13.7969 1.17863 13.7969 1.80736 13.4091 2.19515L5.55346 10.0508L0.990793 5.48814C0.603004 5.10035 0.603004 4.47162 0.990793 4.08383C1.37858 3.69604 2.00731 3.69604 2.3951 4.08383L5.55346 7.24218Z" fill="#688AF5"/>
              </svg>
            </div>
          </q-item-section>
        </q-item>
      </div>
      <div class="addCardWithCards" v-if="cards">
        <q-item class="paymentBlock">
          <q-item-section class="paymentName" @click="addCard()">
            {{ $t('addCard') }}
          </q-item-section>
        </q-item>
      </div>
      <div class="corporat" v-for="(company, index) in companies" :key="company.id" @click="selectCompany(company, index)">
        <button class="corporatBtn flex justify-between items-center" :disabled="company.id === failCompany">
          {{ $t('corporate') }}
          <div class="flex limit">
            <div class="balanceInfo">
              <span v-if="!company.is_unlimited">{{company.balance}}</span>
              <span v-if="!company.is_unlimited">{{priceCurrency.value}}</span>
              <span v-if="company.is_unlimited" style="font-size: 24px">∞</span>
            </div>
            <div class="paymentSelect flex items-center justify-center"  v-if="company.id === failCompany" :class="{failSelect: index === payFailCompany}">
              <svg v-if="index === payFailCompany"  width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M12 0.974388L11.0256 0L6 5.02561L0.974388 0L0 0.974388L5.02561 6L0 11.0256L0.974388 12L6 6.97508L11.0256 12L12 11.0256L6.97439 6L12 0.974388Z" fill="#F25D70"/>
              </svg>
            </div>
            <div class="paymentSelect flex items-center justify-center" v-else :class="{activeSelect: index === userSelectCompany}">
                <svg width="14" height="11" viewBox="0 0 14 11" fill="none" xmlns="http://www.w3.org/2000/svg" v-if="index === userSelectCompany">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M5.55346 7.24218L12.0048 0.790842C12.3926 0.403053 13.0213 0.403053 13.4091 0.790842C13.7969 1.17863 13.7969 1.80736 13.4091 2.19515L5.55346 10.0508L0.990793 5.48814C0.603004 5.10035 0.603004 4.47162 0.990793 4.08383C1.37858 3.69604 2.00731 3.69604 2.3951 4.08383L5.55346 7.24218Z" fill="#688AF5"/>
                </svg>
            </div>
          </div>
        </button>
      </div>
    </div>
</template>

<script>
import cardIcons from '../../statics/cards'
import { mapGetters, mapActions } from 'vuex'
import currency from '../../statics/currency'
export default {
  name: 'selectCard',
  beforeMount () {
    this.getUser()
      .then(response => {
        if (this.card && this.default_company) {
          this.editCard({ id: this.defaultCard.id })
        }
      })
    this.getCards()
  },
  computed: {
    ...mapGetters({
      cards: 'user/payment/cards',
      card: 'user/user/card',
      user: 'user/user/user',
      failCard: 'ride/failCard',
      companies: 'user/user/companies',
      default_company: 'user/user/default_company',
      failCompany: 'ride/failCompany'
    }),
    priceCurrency () {
      return currency.find(currency => currency.country_code === this.user.country.code)
    },
    defaultCard () {
      if (this.card && this.cards) {
        return this.cards.find(card => card.card_id === this.card.card_id)
      } else {
        return false
      }
    },
    userSelectCard () {
      if (this.card) {
        let index = []
        let card = this.cards.find(card => card.card_id === this.card.card_id)
        let cardId = this.cards.indexOf(card)
        while (cardId !== -1) {
          index.push(cardId)
          cardId = this.cards.indexOf(card, cardId + 1)
        }
        return parseInt(index.toString())
      } else {
        return false
      }
    },
    userSelectCompany () {
      if (this.companies && this.default_company) {
        let index = []
        let company = this.companies.find(company => company.id === this.default_company.id)
        let companyId = this.companies.indexOf(company)
        while (companyId !== -1) {
          index.push(companyId)
          companyId = this.companies.indexOf(company, companyId + 1)
        }
        return parseInt(index.toString())
      } else {
        return false
      }
    },
    payFailCard () {
      if (this.failCard) {
        let index = []
        let card = this.cards.find(card => card.card_id === this.failCard)
        let cardId = this.cards.indexOf(card)
        while (cardId !== -1) {
          index.push(cardId)
          cardId = this.cards.indexOf(card, cardId + 1)
        }
        return parseInt(index.toString())
      } else {
        return false
      }
    },
    payFailCompany () {
      if (this.failCompany) {
        let index = []
        let company = this.companies.find(company => company.id === this.failCompany)
        let companyId = this.companies.indexOf(company)
        if (companyId > 0) {
          while (companyId !== -1) {
            index.push(companyId)
            companyId = this.cards.indexOf(company, companyId + 1)
          }
          return parseInt(index.toString())
        } else {
          return 0
        }
      } else {
        return false
      }
    }
  },
  methods: {
    ...mapActions({
      getCards: 'user/payment/getCards',
      addCard: 'user/payment/addCard',
      editCard: 'user/user/editCard',
      editCompany: 'user/user/editCompany',
      getUser: 'user/user/getUser',
      clearFailCard: 'ride/clearFailCard'
    }),
    cardIcon (pan) {
      if (pan[0] === '4' || pan[0] === '2') {
        let card = cardIcons.find(card => card.code === pan[0])
        return card.image
      } else {
        let card = cardIcons.find(card => card.code === pan.slice(0, -14))
        return card.image
      }
    },
    cardName (pan) {
      if (pan[0] === '4' || pan[0] === '2') {
        let card = cardIcons.find(card => card.code === pan[0])
        return card.value
      } else {
        let card = cardIcons.find(card => card.code === pan.slice(0, -14))
        return card.value
      }
    },
    selectCard (card, index) {
      console.log(card)
      if (index === this.userSelectCard) {
      } else if (this.failCard && card.id === this.failCard) {
      } else {
        this.editCard({ id: card.id })
          .then(response => {
            this.clearFailCard()
            this.$emit('closePayMethods')
          })
      }
    },
    selectCompany (company, index) {
      if (index === this.userSelectCompany) {
      } else if (this.failCompany && company.id === this.failCompany) {
      } else {
        this.editCompany({ id: company.id })
          .then(response => {
            this.clearFailCard()
            this.$emit('closePayMethods')
          })
      }
    }
  },
  props: [ 'status' ]
}
</script>

<style scoped>
  .addCardBlock{
    padding: 0 16px;
  }
  .addCard{
    width: 100%;
    border: 0px;
    font-weight: 600;
    font-size: 17px;
    line-height: 21px;
    letter-spacing: -0.354167px;
    color: rgba(255, 255, 255, 0.9);
    padding: 14px 16px;
    background: radial-gradient(100% 100% at 100% 100%, #688AF5 0%, #816FF6 100%);
    box-shadow: 0px 4px 12px rgba(242, 93, 112, 0.2), 0px 2px 4px rgba(129, 111, 246, 0.6);
    border-radius: 8px;
  }
  .paymentBlock{
    padding: 0 32px;
    background: #F8F8F8;
    border-bottom: 1px solid rgba(0,0,0,0.2);
  }
  .paymentName{
    font-weight: 600;
    font-size: 16px;
    line-height: 21px;
    letter-spacing: -0.354167px;
    color: #688AF5;
    padding: 14px 0;
  }
  .paymentInfo{
    flex-flow: nowrap;
    justify-content: center;
    align-items: center;
    font-weight: 500;
    font-size: 15px;
    line-height: 18px;
    color: #4A4A4A;
  }
  .paymentInfo span{
    width: 40px;
    text-align: right;
  }
  .paymentSelect{
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
  .failSelect{
    border: 1px solid #F25D70;
    background-color: #FFFFFF;
  }
  .greyLine{
    border-bottom: 1px solid rgba(0,0,0,0.2);
  }
  .paymentImg img{
    width: 32px;
  }
  .corporat{
    margin-top: 20px;
  }
  .limit{
    color: #4A4A4A;
    font-weight: 500;
    font-size: 15px;
  }
  .balanceInfo{
    margin-right: 16px;
  }
  .corporatBtn{
    width: calc(100% - 32px);
    border: 0px;
    font-weight: 600;
    font-size: 17px;
    line-height: 21px;
    letter-spacing: -0.354167px;
    color: #688AF5;
    padding: 14px 16px;
    background: #F8F8F8;
    box-shadow: 4px 4px 8px rgba(0, 0, 0, 0.1), -4px -4px 10px rgba(253, 253, 253, 0.75), 2px 2px 4px rgba(0, 0, 0, 0.05), inset 6px 6px 12px #FDFDFD;
    border-radius: 8px;
    margin-left: 16px;
  }
  @media (min-width: 320px) and (max-width: 360px) {
    .corporatBtn{
      font-size: 14px;
    }
  }
</style>
