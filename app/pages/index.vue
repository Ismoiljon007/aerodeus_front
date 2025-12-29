<template>
  <main>
    <SectionsHero :hero="hero" />
    <SectionsBooking />
    <SectionsPartners :partners="partners" />
    <SectionsBenefits :advantages="advantages" />
    <SectionsOurServices :services="services" />
    <SectionsHowWeWork />
    <SectionsAboutUs
      :about="about"
      :statistics="statistics"
    />
  </main>
</template>

<script setup lang="ts">
const { locale } = useI18n();
const { data: hero } = await useAsyncData('hero', async () => apiFetch('/hero/', { params: { lang: locale.value } }));
const { data: advantages } = await useAsyncData('advantages', async () => apiFetch('/advantages/', { params: { lang: locale.value } }));
const { data: services } = await useAsyncData('services', async () => apiFetch('/services/with-features/', { params: { lang: locale.value } }));
const { data: statistics } = await useAsyncData('statistics', async () => apiFetch('/statistics/', { params: { lang: locale.value } }));
const { data: about } = await useAsyncData('about', async () => apiFetch('/about/', { params: { lang: locale.value } }));
const { data: partners } = await useAsyncData('partners', async () => apiFetch('/partners/', { params: { lang: locale.value } }));
</script>

<style scoped>

</style>
