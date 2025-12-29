<template>
  <div class="benefits-cards-wrapper">
    <UiCard
      v-for="item in cards"
      :key="item.id"
      class="benefits-card"
    >
      <img
        v-if="item.iconUrl"
        class="bef-card-icon"
        :src="item.iconUrl"
        :alt="item.title || 'Afzallik ikonasi'"
        width="40"
        height="40"
        loading="lazy"
      >

      <h2>{{ item.title }}</h2>

      <p>
        {{ item.subtitle }}
      </p>
    </UiCard>
  </div>
</template>

<script setup>
const props = defineProps({
  items: {
    type: Array,
    default: () => [],
  },
});

const cards = computed(() => {
  if (!props.items?.length)
    return [];

  return [...props.items]
    .slice()
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
    .map((item, index) => ({
      id: item.id ?? index,
      title: item.title || '',
      subtitle: item.description || '',
      iconUrl: item.icon || '',
    }));
});
</script>

<style scoped lang="scss">
.benefits-cards-wrapper {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;

    @include respond(1100px) {
        grid-template-columns: repeat(2, 1fr);
        gap: 17px;
    }

    @include respond(650px) {
        grid-template-columns: 1fr;
    }

    .benefits-card {
        display: flex;
        flex-direction: column;
        gap: 13px;

        h2 {
            font-weight: 500;
            font-size: 24px;
        }

        p {
            font-weight: 400;
            font-size: 16px;
            color: $color-white;
            opacity: 0.7;
        }
    }
}
</style>
