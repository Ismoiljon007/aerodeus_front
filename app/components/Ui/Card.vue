<template>
  <div class="card">
    <slot />
  </div>
</template>

<script setup lang="ts">

</script>

<style scoped lang="scss">
.card {
  padding: 2.4rem;
  border-radius: 2.4rem;
  border: 1px solid rgba($color: $color-white, $alpha: 0.1);

  background: rgba($color: $color-white, $alpha: 0.03);
  backdrop-filter: blur(10px);
  box-shadow: 0 0px 32px 0 rgba($color: $color-bg, $alpha: 0.5) inset;
}
</style>
