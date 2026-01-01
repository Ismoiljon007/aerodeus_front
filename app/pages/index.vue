<template>
  <main>
    <SectionsHero :hero="hero" />
    <SectionsBooking />
    <SectionsPartners :partners="partners" />
    <SectionsBenefits :advantages="advantages" />
    <SectionsOurServices :services="services" />
    <SectionsFlights :aircrcraft="aircrcraft" />
    <LazySectionsMap />
    <SectionsHowWeWork
      :how-we-work="howWeWork"
      :how-we-work-steps="howWeWorkSteps"
    />
    <SectionsAboutUs
      :about="about"
      :statistics="statistics"
    />
    <SectionsContact />
  </main>
</template>

<script setup lang="ts">
const { locale } = useI18n();

const { data: hero } = await useAsyncData('hero', () => apiFetch('/hero/', { params: { lang: locale.value } }), { watch: [locale] });
const { data: partners } = await useAsyncData('partners', () => apiFetch('/partners/', { params: { lang: locale.value } }), { watch: [locale] });
const { data: advantages } = await useAsyncData('advantages', () => apiFetch('/advantages/', { params: { lang: locale.value } }), { watch: [locale] });
const { data: services } = await useAsyncData('services', () => apiFetch('/services/with-features/', { params: { lang: locale.value } }), { watch: [locale] });
const { data: aircrcraft } = await useAsyncData('aircrcraft', () => apiFetch('/aircraft/', { params: { lang: locale.value } }), { watch: [locale] });
const { data: howWeWork } = await useAsyncData('howWeWork', () => apiFetch('/how-we-work/section/', { params: { lang: locale.value } }), { watch: [locale] });
const { data: howWeWorkSteps } = await useAsyncData('howWeWorkSteps', () => apiFetch('/how-we-work/steps/', { params: { lang: locale.value } }), { watch: [locale] });
const { data: statistics } = await useAsyncData('statistics', () => apiFetch('/statistics/', { params: { lang: locale.value } }), { watch: [locale] });
const { data: about } = await useAsyncData('about', () => apiFetch('/about/', { params: { lang: locale.value } }), { watch: [locale] });
</script>

<style scoped>

</style>
