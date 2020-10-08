<template>
  <q-layout>
    <q-page-container>
      <transition name="page" mode="out-in">
        <router-view />
      </transition>
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  name: 'LoginLayout'
}
</script>

<style>
.page-enter-active, .page-leave-active {
  transition: opacity 0.3s, transform 0.3s;
}
.page-leave-to {
  opacity: 0;
  transform: translateX(-100%);
}
.page-enter{
  opacity: 0;
  transform: translateX(100%);
}
</style>
