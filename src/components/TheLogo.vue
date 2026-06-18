<script setup lang="ts">
import { computed } from 'vue';
import { useTheme } from 'vuetify';

const theme = useTheme();
const isDark = computed(() => theme.global.current.value.dark);

const saved = localStorage.getItem('theme');
if (saved) theme.global.name.value = saved;

function toggleTheme() {
  const next = isDark.value ? 'light' : 'dark';
  theme.global.name.value = next;
  localStorage.setItem('theme', next);
}
</script>

<template>
  <div class="logo-container">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      x="0px"
      y="0px"
      viewBox="0 0 193.24 84.7"
      xml:space="preserve">
      <rect x="151.42" y="3.17" transform="matrix(0.7071 -0.7071 0.7071 0.7071 15.5114 125.3207)" width="15.23" height="81.52" />
      <rect x="62.89" y="3.17" width="15.23" height="81.52" />
      <rect x="41.54" y="3.17" width="15.23" height="81.52" />
      <rect x="151.42" y="3.17" transform="matrix(0.7071 0.7071 -0.7071 0.7071 77.6469 -99.5833)" width="15.23" height="81.52" />
      <circle cx="28.38" cy="31.55" r="28.38" />
      <circle cx="91.27" cy="31.55" r="28.38" />
    </svg>
    <v-btn
      class="theme-toggle"
      :icon="isDark ? 'mdi-weather-sunny' : 'mdi-weather-night'"
      variant="text"
      size="small"
      @click="toggleTheme"
    />
  </div>
</template>

<style scoped lang="less">
.logo-container {
  position: absolute;
  text-align: center;
  top: 0;
  left: 0;
  right: 0;
  svg {
    max-width: 60px;
    margin: 1em auto;
  }
  .theme-toggle {
    position: absolute;
    top: 0.5em;
    right: 1em;
  }
}
</style>
