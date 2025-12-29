<template>
  <div class="about-us-right">
    <h2>{{ aboutTitle }}</h2>
    <p v-if="aboutDescription">
      {{ aboutDescription }}
    </p>
  </div>
</template>

<script setup>
const props = defineProps({
  about: {
    type: Object,
    default: () => ({}),
  },
});

const aboutTitle = computed(() => props.about?.data?.title || 'Biz haqimizda');
const aboutDescription = computed(() => props.about?.data?.description || '');
</script>

<style scoped lang="scss">
.about-us-right {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 20px;

    p {
        opacity: 0.7;
    }

    @include respond(885px) {
        text-align: center;
    }
}
</style>
