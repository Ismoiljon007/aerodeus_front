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
const { data: hero } = await useAsyncData(
  'hero',
  async () => apiFetch('/hero/', { params: { lang: locale.value } }),
  { watch: [locale] },
);
const { data: advantages } = await useAsyncData(
  'advantages',
  async () => apiFetch('/advantages/', { params: { lang: locale.value } }),
  { watch: [locale] },
);
const { data: services } = await useAsyncData(
  'services',
  async () => apiFetch('/services/with-features/', { params: { lang: locale.value } }),
  { watch: [locale] },
);
const { data: aircrcraft } = await useAsyncData(
  'aircrcraft',
  async () => apiFetch('/aircraft/', { params: { lang: locale.value } }),
  { watch: [locale] },
);
const { data: howWeWork } = await useAsyncData(
  'howWeWork',
  async () => apiFetch('/how-we-work/section/', { params: { lang: locale.value } }),
  { watch: [locale] },
);
const { data: howWeWorkSteps } = await useAsyncData(
  'howWeWorkSteps',
  async () => apiFetch('/how-we-work/steps/', { params: { lang: locale.value } }),
  { watch: [locale] },
);
const { data: statistics } = await useAsyncData(
  'statistics',
  async () => apiFetch('/statistics/', { params: { lang: locale.value } }),
  { watch: [locale] },
);
const { data: about } = await useAsyncData(
  'about',
  async () => apiFetch('/about/', { params: { lang: locale.value } }),
  { watch: [locale] },
);
const { data: partners } = await useAsyncData(
  'partners',
  async () => apiFetch('/partners/', { params: { lang: locale.value } }),
  { watch: [locale] },
);
</script>

<style scoped>

</style>
