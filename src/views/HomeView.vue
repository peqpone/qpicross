<script setup lang="ts">
import TheControls from '@/components/TheControls.vue';
import TheRowHelper from '@/components/TheRowHelper.vue';
import TheColumnHelper from '@/components/TheColumnHelper.vue';
import TheBoard from '@/components/TheBoard.vue';
import TheLogo from '@/components/TheLogo.vue';
import TheModeSwitch from '@/components/TheModeSwitch.vue';
import TheWin from '@/components/TheWin.vue';
</script>

<template>
  <div class="container">
    <the-logo />
    <div class="position-relative">
      <the-column-helper />
      <the-row-helper />
      <the-board />
      <the-mode-switch />
      <the-win />
    </div>
    <the-controls />
  </div>
</template>

<style scoped lang="less">
.container {
  position: relative;
  display: flex;
  justify-content: center;
  height: 100%;
  align-items: center;
}
</style>
