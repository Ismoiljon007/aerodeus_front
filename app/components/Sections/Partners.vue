<template>
  <section
    ref="partnersRef"
    class="partners"
  >
    <div class="container">
      <NuxtImg
        v-for="(partner, index) in partnerList"
        :key="partner.id || index"
        :src="partner.logo"
        :alt="partner.name || 'Partner logo'"
        width="343"
        height="75"
        class="partners_logo"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const props = defineProps<{ partners?: any }>();

const partnersRef = ref<HTMLElement | null>(null);
let partnersContext: gsap.Context | null = null;
const partnerList = computed(() => {
  const items = props.partners?.data;
  if (!Array.isArray(items))
    return [];
  return items;
});

onMounted(() => {
  gsap.registerPlugin(ScrollTrigger);
  const sectionEl = partnersRef.value;
  if (!sectionEl)
    return;

  partnersContext = gsap.context(() => {
    const q = gsap.utils.selector(sectionEl);
    const items = q('.partners_logo');
    gsap.from(items, {
      autoAlpha: 0,
      y: 16,
      duration: 0.6,
      ease: 'power2.out',
      stagger: 0.12,
      clearProps: 'opacity,transform,visibility',
      scrollTrigger: {
        trigger: sectionEl,
        start: 'top 80%',
        toggleActions: 'play none none reverse',
      },
    });
  }, sectionEl);
});

onBeforeUnmount(() => {
  partnersContext?.revert();
  partnersContext = null;
});
</script>

<style scoped lang="scss">
.partners {
  margin-bottom: 10rem;
    .container {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 5rem;
    }
    &_logo {
      will-change: transform;
      object-fit: contain ;
    }
}
</style>
