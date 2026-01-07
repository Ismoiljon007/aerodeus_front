<template>
  <div
    id="advantages"
    ref="benefitsRef"
    class="benefits"
  >
    <NuxtPicture
      src="/images/jpg/benBg.jpg"
      format="webp"
      quality="80"
      loading="lazy"
      width="100%"
      height="100%"
      :picture-attrs="{ class: 'benefits__bg-picture' }"
      :img-attrs="{ class: 'benefits__bg-img', alt: '' }"
    />
    <div class="container">
      <h2 class="benefits_title">
        {{ $t('sections.benefits.title') }}
      </h2>
      <div class="benefits-wrapper">
        <BenefitsCards :items="advantages?.data" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import BenefitsCards from './benefitsCards.vue';

defineProps<{ advantages?: any }>();

const benefitsRef = ref<HTMLElement | null>(null);
let benefitsContext: gsap.Context | null = null;

onMounted(() => {
  gsap.registerPlugin(ScrollTrigger);
  const sectionEl = benefitsRef.value;
  if (!sectionEl)
    return;

  benefitsContext = gsap.context(() => {
    const q = gsap.utils.selector(sectionEl);
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionEl,
        start: 'top 80%',
        toggleActions: 'play none none reverse',
      },
    });

    tl.from(q('.benefits_title'), {
      autoAlpha: 0,
      y: 20,
      duration: 0.6,
      ease: 'power2.out',
      clearProps: 'opacity,transform,visibility',
    }).from(
      q('.benefits-card'),
      {
        autoAlpha: 0,
        y: 20,
        duration: 0.5,
        ease: 'power2.out',
        stagger: 0.08,
        clearProps: 'opacity,transform,visibility',
      },
      '-=0.2',
    );
  }, sectionEl);
});

onBeforeUnmount(() => {
  benefitsContext?.revert();
  benefitsContext = null;
});
</script>

<style scoped lang="scss">
.benefits {
    position: relative;
    padding: 9rem 0 13rem;
    margin-bottom: 5rem;
    overflow: hidden;
    @media (max-width: 1050px) {
      padding: 6rem 0;
      margin: 0;
    }
    &::before {
        content: "";
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 14rem;
        display: block;
        background: linear-gradient(0deg, #0E1530 0%, rgba(14, 21, 48, 0) 100%);
        z-index: 1;
    }
    &::after {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 14rem;
        display: block;
        background: linear-gradient(180deg, #0E1530 0%, rgba(14, 21, 48, 0) 100%);
        z-index: 1;
    }

    .container {
        position: relative;
        z-index: 2;
    }

    .benefits-wrapper {
        display: flex;
        flex-direction: column;
        gap: 5rem;
    }

    h2 {
      @include heading-1;
      margin-bottom: 4rem;
      text-align: center;
    }
}

:deep(picture) {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    z-index: 0;
}

:deep(.benefits__bg-img) {
    width: 100%;
    height: 100%;
    object-fit: cover;
}
</style>
