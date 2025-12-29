<template>
  <LayoutsHeader @toggle-menu="toggleMenu" />
  <NuxtPage />
  <LayoutsFooter />
  <Transition name="menu">
    <LayoutsMenu
      v-if="isMenuOpen"
      @close="closeMenu"
    />
  </Transition>
</template>

<script setup lang="ts">
const isMenuOpen = ref(false);

function toggleMenu() {
  isMenuOpen.value = !isMenuOpen.value;
}

function closeMenu() {
  isMenuOpen.value = false;
}
</script>

<style scoped>
.menu-enter-active,
.menu-leave-active {
  transition: all 0.3s ease;
  transform: translateX(0);
}

.menu-enter-from,
.menu-leave-to {
  opacity: 0;
  transform: translateX(-100%);
}
</style>
