<template>
  <div
    ref="benefitsRef"
    class="benefits"
  >
    <div class="container">
      <h2 class="benefits_title">
        Aerodeus Afzalliklari
      </h2>
      <div class="benefits-wrapper">
        <BenefitsCards :items="advantages?.data" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import BenefitsCards from './benefitsCards.vue';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

defineProps<{ advantages?: any }>();

const benefitsRef = ref<HTMLElement | null>(null);
let benefitsContext: gsap.Context | null = null;

onMounted(() => {
  gsap.registerPlugin(ScrollTrigger);
  const sectionEl = benefitsRef.value;
  if (!sectionEl) return;

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
    background-image: url('/images/jpg/benBg.jpg');
    padding: 9rem 0 13rem;
    margin-bottom: 5rem;
    &::before {
        content: "";
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 14rem;
        display: block;
       background: linear-gradient(0deg, #0E1530 0%, rgba(14, 21, 48, 0) 100%);
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
</style>
