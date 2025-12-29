<template>
  <section class="partners">
    <div class="container">
      <NuxtImg
        src="https://picsum.photos/1/343"
        width="343"
        height="75"
      />
      <NuxtImg
        src="https://picsum.photos/1/343"
        width="343"
        height="75"
      />
      <NuxtImg
        src="https://picsum.photos/1/343"
        width="343"
        height="75"
      />
    </div>
  </section>
</template>

<script setup lang="ts">

</script>

<style scoped lang="scss">
.partners {
    .container {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 5rem;
    }
}
</style>
