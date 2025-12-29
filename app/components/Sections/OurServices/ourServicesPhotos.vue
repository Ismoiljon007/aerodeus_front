<template>
  <div
    v-if="mainImage || sideImages.length"
    class="our-services-photos-wrapper"
    :class="{ 'our-services-photos-wrapper--two': twoImages }"
  >
    <div
      v-if="mainImage"
      class="first-images"
    >
      <NuxtImg
        :src="mainImage"
        :alt="`${title} main image`"
        format="webp"
        quality="80"
        loading="lazy"
      />
    </div>

    <div
      v-if="sideImages.length"
      class="duble-img"
    >
      <NuxtImg
        v-for="(image, index) in sideImages"
        :key="image || index"
        :src="image"
        :alt="`${title} detail ${index + 1}`"
        format="webp"
        quality="80"
        loading="lazy"
      />
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  service: {
    type: Object,
    default: () => ({}),
  },
  twoImages: {
    type: Boolean,
    default: false,
  },
});

const title = computed(() => props.service?.title || 'Service');

const images = computed(() => {
  const service = props.service || {};
  return [service.image, service.image_1, service.image_2, service.image_3].filter(Boolean);
});

const limitedImages = computed(() => images.value.slice(0, props.twoImages ? 2 : 3));
const mainImage = computed(() => (props.twoImages ? '' : limitedImages.value[0] || ''));
const sideImages = computed(() => (props.twoImages ? limitedImages.value : limitedImages.value.slice(1)));
</script>

<style scoped lang="scss">
.our-services-photos-wrapper {
    display: flex;
    align-items: stretch;
    gap: 30px;
    width: 50%;

    @include respond(1200px) {
      width: 100%;
    }

    .first-images {
        img {
            width: 35.8rem;
            height: 51rem;
            object-fit: cover;
            border-radius: 8px;
        }
    }

    .duble-img {
        display: flex;
        flex-direction: column;
        gap: 30px;

        @include respond(630px) {
            gap: 10px;
        }

        img {
            width: 33.6rem;
            height: 24rem;
            object-fit: cover;
            border-radius: 8px;

            @include respond(630px) {
                height: calc(50% - 5px);
            }
        }
    }

    &--two {
      .duble-img {
        flex-direction: row;
        gap: 30px;
        @include respond(630px) {
          gap: 10px;
        }

        img {
          width: calc(50% - 15px);
          height: 51rem;
          &:first-child {
            transform: translateY(-5%);
          }
          &:last-child {
            transform: translateY(5%);
          }

          @include respond(630px) {
            width: calc(50% - 5px);
          }
        }
      }
    }
}
</style>
