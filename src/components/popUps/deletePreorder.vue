<template>
  <div class="popUpBgFix flex items-center justify-center">
    <div class="popUpBox popUpBoxFix">
      <div class="popUpTtl">
        {{ $t('deletePreorder') }}
        <div class="popUpInfo">
          {{ $t('deletePreorderInfo') }}
        </div>
      </div>
      <div class="popUpBtns flex justify-between">
        <div class="cancel" @click="deleteSelectPreorder()">{{ $t('cancelPreOrder') }}</div>
        <div class="close" @click="$emit('close')">{{ $t('cancel') }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'deletePreorderPopUp',
  methods: {
    ...mapActions({
      deletePreorder: 'user/preorder/deletePreorder',
      getPreorders: 'user/preorder/loadPreorders'
    }),
    deleteSelectPreorder () {
      this.deletePreorder({ id: this.preorder.id })
        .then(response => {
          sessionStorage.clear()
          this.getPreorders()
        })
      this.$emit('close')
    }
  },
  props: ['preorder']
}
</script>

<style>
  .popUpBgFix {
    position: fixed;
    width: calc(100% - 300px);
    height: 100%;
    background-color: rgba(25, 25, 25, 0.5);
    z-index: 200;
  }
  @media (min-width: 0px) and (max-width: 1023px) {
    .popUpBgFix {
      width: 100%;
    }
  }
</style>
