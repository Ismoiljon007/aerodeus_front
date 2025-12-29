<template>
  <main>
    <SectionsHero :hero="hero" />
    <SectionsBooking />
    <SectionsPartners />
    <SectionsBenefits />
    <SectionsOurServices />
    <SectionsHowWeWork />
    <SectionsAboutUs />
  </main>
</template>

<script setup lang="ts">
const { data: hero } = await useAsyncData('hero', async () => apiFetch('/hero/'));
</script>

<style scoped>

</style>
