<template>
  <div class="flights">
    <div class="flights__header">
      <h2 class="flights__title">
        {{ $t('sections.flights.title') }}
      </h2>
      <p class="flights__description">
        {{ $t('sections.flights.subtitle') }}
      </p>
    </div>

    <div class="flights__slider">
      <div
        v-if="showOverlays"
        class="flights__overlay flights__overlay--left"
      />

      <div
        v-if="showOverlays"
        class="flights__overlay flights__overlay--right"
      />

      <Swiper
        v-if="duplicatedFlights.length > 0"
        :modules="modules"
        effect="coverflow"
        :grab-cursor="true"
        :centered-slides="true"
        :loop="true"
        :coverflow-effect="{
          rotate: 0,
          stretch: 0,
          depth: 50,
          modifier: 2.5,
          slideShadows: false,
        }"
        :navigation="{
          nextEl: '.flights__nav-button--next',
          prevEl: '.flights__nav-button--prev',
        }"
        :breakpoints="{
          320: {
            slidesPerView: 1.2,
            spaceBetween: 40,
            centeredSlides: true,
          },
          480: {
            slidesPerView: 1.5,
            spaceBetween: 40,
            centeredSlides: true,
          },
          640: {
            slidesPerView: 2,
            spaceBetween: 40,
            centeredSlides: true,
          },
          768: {
            slidesPerView: 2.5,
            spaceBetween: 40,
            centeredSlides: true,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 30,
            centeredSlides: true,
          },
          1280: {
            slidesPerView: 4.5,
            spaceBetween: 40,
            centeredSlides: true,
          },
        }"
        class="flights__swiper"
        @swiper="onSwiper"
        @slide-change="onSlideChange"
      >
        <SwiperSlide
          v-for="(flight, index) in duplicatedFlights"
          :key="`flight-${index}`"
          v-slot="{ isActive }"
        >
          <article class="flight-card">
            <div class="flight-card__image-wrapper">
              <img
                :src="flight.main_image"
                :alt="flight.title"
                class="flight-card__image"
              >
            </div>

            <div class="flight-card__content">
              <h3 class="flight-card__title">
                {{ flight.title }}
              </h3>

              <ul class="flight-card__features">
                <li
                  v-for="(feature, idx) in flight.specifications"
                  :key="idx"
                  class="flight-card__feature"
                  :class="{ active: isActive }"
                >
                  <IconsCheck />
                  <p class="flight-card__feature--text">
                    {{ feature.text }}
                  </p>
                </li>
              </ul>

              <UiButton :variant="isActive ? 'primary' : 'secondary'">
                {{ $t('sections.flights.submitApplication') }}
              </UiButton>
            </div>
          </article>
        </SwiperSlide>
      </Swiper>

      <div
        v-else
        class="flights__empty"
      >
        <p>{{ $t('sections.flights.noData') }}</p>
      </div>

      <div
        v-if="duplicatedFlights.length > 1"
        class="flights__navigation"
      >
        <button class="flights__nav-button flights__nav-button--prev">
          <IconsArrowLeft />
        </button>
        <button class="flights__nav-button flights__nav-button--next">
          <IconsArrowRight />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Swiper as SwiperType } from 'swiper';
import { EffectCoverflow, Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/effect-coverflow';

const props = defineProps<{ aircrcraft?: any }>();

const modules = [Navigation, EffectCoverflow];

const swiperInstance = ref<SwiperType | null>(null);
const activeIndex = ref(0);

// Ma'lumotni duplicate qilish
const duplicatedFlights = computed(() => {
  const data = props.aircrcraft?.data || [];

  if (data.length === 0) {
    return [];
  }

  // 5 tadan kam bo'lsa - 3 marta takrorla
  if (data.length < 5) {
    return [...data, ...data, ...data];
  }

  // 7 tadan kam bo'lsa - 2 marta takrorla
  if (data.length < 7) {
    return [...data, ...data];
  }

  // 7 va undan ko'p bo'lsa - oddiy qaytarish
  return data;
});

// Overlay ko'rsatish
const showOverlays = computed(() => {
  const dataLength = props.aircrcraft?.data?.length || 0;
  return dataLength > 4;
});

function onSwiper(swiper: SwiperType) {
  swiperInstance.value = swiper;
  activeIndex.value = swiper.activeIndex;
}

function onSlideChange(swiper: SwiperType) {
  activeIndex.value = swiper.activeIndex;
}
</script>

<style lang="scss" scoped>
.flights {
  margin: 80px 0;
  overflow: hidden;

  @media (max-width: 768px) {
    margin: 40px 0;
  }

  &__header {
    text-align: center;
    margin-bottom: 40px;
  }

  &__title {
    @include heading-1;

    @media (max-width: 768px) {
      font-size: 32px;
    }
  }

  &__description {
    font-weight: 400;
    font-size: 18px;
    opacity: 0.7;
    margin-top: 18px;

    @include respond(1200px) {
      text-align: center;
    }

    @include respond(750px) {
      font-size: 16px;
      margin-top: 12px;
    }
  }

  &__slider {
    position: relative;
  }

  &__empty {
    text-align: center;
    padding: 60px 20px;
    font-size: 18px;
    opacity: 0.7;
  }

  &__overlay {
    position: absolute;
    top: 0;
    bottom: 80px;
    width: 300px;
    z-index: 10;
    pointer-events: none;

    @media (max-width: 1024px) {
      width: 200px;
    }

    @media (max-width: 768px) {
      display: none;
    }

    &--left {
      width: 150px;
      left: 0;
      background: linear-gradient(270.14deg, rgba(14, 21, 48, 0) 0.13%, #0E1530 103.86%);
    }

    &--right {
      width: 150px;
      right: 0;
      background: linear-gradient(90deg, rgba(14, 21, 48, 0) 0%, #0E1530 100%);
    }
  }

  &__navigation {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 30px;
    margin-top: 40px;

    @media (max-width: 768px) {
      gap: 18px;
    }
  }

  &__nav-button {
    width: 50px;
    height: 50px;
    background: #1e4395;
    border: none;
    border-radius: 50%;
    color: #ffffff;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.3s ease;
    z-index: 20;

    &:hover {
      opacity: 0.9;
    }

    &:active {
      transform: scale(0.95);
    }

    &.swiper-button-disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    @media (max-width: 768px) {
      width: 46px;
      height: 46px;

      svg {
        width: 20px;
        height: 20px;
      }
    }
  }

  &__swiper {
    overflow: visible !important;
  }
}

.flight-card {
  height: 100%;
  border-radius: 16px;
  border: 1px solid rgba($color: $color-white, $alpha: 0.1);
  background: rgba($color: $color-white, $alpha: 0.03);
  backdrop-filter: blur(10px);
  overflow: hidden;
  box-shadow: 0 0px 32px 0 rgba($color: $color-bg, $alpha: 0.5) inset;

  &__image-wrapper {
    position: relative;
    width: 100%;
    height: 265px;
    overflow: hidden;

    @media (max-width: 768px) {
      height: 200px;
    }
  }

  &__image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s ease;

    .flight-card:hover & {
      transform: scale(1.1);
    }
  }

  &__content {
    padding: 24px;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
  }

  &__title {
    font-size: 20px;
    font-weight: 700;
    color: #ffffff;
    margin-bottom: 20px;
    line-height: normal;

    @media (max-width: 768px) {
      font-size: 18px;
    }
  }

  &__features {
    list-style: none;
    margin-bottom: 24px;
    flex-grow: 1;
  }

  &__feature {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 12px;
  }

  &__feature--text {
    font-size: 16px !important;
    opacity: 0.8 !important;
    font-weight: normal;

    @media (max-width: 768px) {
      font-size: 14px !important;
    }
  }

  &__feature.active * {
    stroke: #def900;
    opacity: 1;
  }
}
</style>
