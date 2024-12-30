<script setup lang="ts">
import TheControls from '@/components/TheControls.vue';
import TheRowHelper from '@/components/TheRowHelper.vue';
import TheColumnHelper from '@/components/TheColumnHelper.vue';
import TheBoard from '@/components/TheBoard.vue';
import TheLogo from '@/components/TheLogo.vue';

</script>

<template>
  <div class="container">
    <div class="title-container">
      <the-logo />
    </div>
    <div class="position-relative">
      <the-column-helper />
      <the-row-helper />
      <the-board />
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
  .title-container {
    font-size: 2rem;
    margin-bottom: 1em;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    text-align: center;
  }
}
</style>
