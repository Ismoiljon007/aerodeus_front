<template>
  <div class="our-service-txt">
    <div class="our-services-texts">
      <h2>{{ serviceTitle }}</h2>

      <p v-if="serviceDescription">
        {{ serviceDescription }}
      </p>

      <NuxtLink
        v-if="serviceLink"
        :to="serviceLink"
      >
        <UiButton>{{ serviceButtonText }}</UiButton>
      </NuxtLink>
      <UiButton v-else>
        {{ serviceButtonText }}
      </UiButton>

      <div
        v-if="features.length"
        class="our-services-texts-bottom"
      >
        <div
          v-for="feature in features"
          :key="feature.id || feature.text"
          class="our-services-bottom-item"
        >
          <svg
            height="25"
            width="25"
          >

            <use xlink:href="/sprite.svg#i-check" />

          </svg>
          <span>{{ feature.text }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  service: {
    type: Object,
    default: () => ({}),
  },
});

const serviceTitle = computed(() => props.service?.title || '');
const serviceDescription = computed(() => props.service?.description || '');
const serviceButtonText = computed(() => props.service?.button_text || 'Band qilish');
const serviceLink = computed(() => props.service?.button_link || '');
const features = computed(() => {
  const items = props.service?.features;
  if (!Array.isArray(items))
    return [];
  return [...items].slice().sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
});
</script>

<style scoped lang="scss">
  .our-service-txt {
    height: 100%;
    width: 50%;
    @media (max-width: 1200px) {
      width: 100%;
    }
  }

  .our-services-texts {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    position: relative;
    height: 100%;

    h2 {
      font-weight: 500;
      font-size: 3.2rem;
    }

    p {
      font-weight: 400;
      width: 100%;
      max-width: 543px;
      opacity: 0.7;
      margin-bottom: 2rem;
    }
    button {
      @media (max-width: 1200px) {
        order: 4;
      }
    }
    .our-services-texts-bottom {
      display: flex;
      flex-direction: column;
      gap: 15px;
      margin-top: auto;

      .our-services-bottom-item {
        display: flex;
        align-items: center;
        gap: 13px;
        span {
        opacity: 0.7;

        }
        svg {
          color: $color-yellow;
        }
      }
      @media (max-width: 1200px) {
        order: 3;
      }
    }
  }
</style>
