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
      <UiButton
        v-else
        to="/#booking"
      >
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

    @include respond(768px) {
      gap: 1.5rem;
    }

    @include respond(540px) {
      gap: 1.2rem;
    }

    h2 {
      font-weight: 500;
      font-size: 3.2rem;

      @include respond(768px) {
        font-size: 2.6rem;
      }

      @include respond(540px) {
        font-size: 2.2rem;
      }
    }

    p {
      font-weight: 400;
      width: 100%;
      max-width: 543px;
      opacity: 0.7;
      margin-bottom: 2rem;

      @include respond(768px) {
        font-size: 1.5rem;
        margin-bottom: 1.5rem;
      }

      @include respond(540px) {
        font-size: 1.4rem;
        margin-bottom: 1rem;
      }
    }
    button , a {
      width: fit-content;
      @media (max-width: 1200px) {
        order: 4;
      }
      @media (max-width: 768px) {
        width: 100%;
      }
    }
    .our-services-texts-bottom {
      display: flex;
      flex-direction: column;
      gap: 15px;
      margin-top: auto;

      @include respond(768px) {
        gap: 12px;
      }

      @include respond(540px) {
        gap: 10px;
      }

      .our-services-bottom-item {
        display: flex;
        align-items: center;
        gap: 13px;

        @include respond(540px) {
          gap: 10px;
        }

        span {
          opacity: 0.7;

          @include respond(540px) {
            font-size: 1.4rem;
          }
        }
        svg {
          color: $color-yellow;

          @include respond(540px) {
            width: 20px;
            height: 20px;
          }
        }
      }
      @media (max-width: 1200px) {
        order: 3;
      }
    }
  }
</style>
