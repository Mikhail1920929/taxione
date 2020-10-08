<template>

    <q-scroll-area class="tips" :class="{tips_active: isActive}">
        <q-list bordered separator v-if="fromTips.length > 0">
            <q-item
                v-for="tip in fromTips"
                :key="tip.id"
                clickable
                @click="$emit('clickOnTip', tip, 'from', 'input', tip.structured_formatting.main_text)"
                v-ripple>

              <div class="tips_pointer"></div>
              <q-item-section>
                <q-item-label>{{tip.structured_formatting.main_text}}</q-item-label>
                <q-item-label caption>{{tip.structured_formatting.secondary_text}}</q-item-label>
              </q-item-section>
            </q-item>

          </q-list>
          <q-list bordered separator v-if="toTips.length > 0">
            <q-item
                v-for="tip in toTips"
                :key="tip.id"
                clickable
                @click="$emit('clickOnTip', tip, 'to', 'input', tip.structured_formatting.main_text)"
                v-ripple>

              <div class="tips_pointer"></div>
              <q-item-section>
                <q-item-label>{{tip.structured_formatting.main_text}}</q-item-label>
                <q-item-label caption>{{tip.structured_formatting.secondary_text}}</q-item-label>
              </q-item-section>
            </q-item>

        </q-list>
    </q-scroll-area>

</template>

<script>
export default {
  props: {
    isActive: { type: Boolean, required: true },
    toTips: { type: Array, required: true },
    fromTips: { type: Array, required: true }
  }
}
</script>

<style>
  .tips{
    width: 100%;
    height: 0px;
    overflow: hidden;
  }
  .tips_active{
    height: 60%;
  }
  .tips_pointer{
    content: '';
    display: flex;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    border: 3px solid #F8F8F8;
    background-color: #9B9B9B;
    box-shadow: 2px 2px 4px 0 rgba(0,0,0,0.05), -4px -4px 8px 0 #FDFDFD, 4px 4px 8px 0 rgba(0,0,0,0.10), 6px 6px 12px 0 #FDFDFD;
    margin-right: 15px;
    position: relative;
    top: 3px;
  }
</style>
