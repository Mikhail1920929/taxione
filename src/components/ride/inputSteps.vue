<template>

    <div class="steps flex column justify-between items-center">
        <div class="steps__item" :class="{ steps__item_active: isFrom }"></div>
        <div class="steps__item" :class="{ steps__item_active: isTo }"></div>
    </div>

</template>

<script>
export default {
  props: {
    isTo: { type: Boolean, required: true },
    isFrom: { type: Boolean, required: true }
  }
}
</script>

<style>
  .steps {
    width: 24px;
    position: relative;
    height: 70px;
  }

  .steps:after {
    position: absolute;
    content: '';
    top: 35%;
    left: 49%;
    width: 2px;
    height: 35%;
    opacity: 0.5;
    background: #9B9B9B;
    border-radius: 1px;
  }

  .steps__item {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: #816FF6;
    border: 3px solid #fff;
    box-shadow: 2px 2px 4px 0 rgba(0,0,0,0.05), -4px -4px 8px 0 #FDFDFD, 4px 4px 8px 0 rgba(0,0,0,0.10), 6px 6px 12px 0 #FDFDFD;
    transition: all .2s ease-in-out;
    z-index: 2;
  }

  .steps__item_active {
    background-color: #688AF5;
    width: 16px;
    height: 16px;
    border: 3px solid #fff;
  }
</style>
