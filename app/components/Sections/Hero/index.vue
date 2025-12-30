<template>
  <section class="hero">
    <NuxtPicture
      src="/images/jpg/hero.jpg"
      format="webp"
      quality="100"
      preload
      loading="eager"
      width="100%"
      height="890"
      :picture-attrs="{ class: 'hero__picture' }"
      :img-attrs="{ class: 'hero__img', alt: '' }"
    />
    <div class="container">
      <div class="hero_content">
        <h2
          ref="titleRef"
          class="hero_title"
        >
          {{ hero?.data?.title || 'Oliy darajadagi xizmat' }}
        </h2>
        <p
          ref="descRef"
          class="hero_desc"
        >
          {{ hero?.data?.subtitle || 'Premium xususiy samolyotlar bilan mutlaq qulaylik va nufuz' }}
        </p>
        <UiButton class="hero_button">
          {{ $t('navbar.services') }}
        </UiButton>
      </div>
      <NuxtImg
        ref="planeRef"
        width="1105"
        height="467"
        src="/images/png/plane.png"
        class="hero_img"
        alt="Samolyot"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

defineProps<{ hero: any }>();

const planeRef = ref<HTMLElement | null>(null);
const titleRef = ref<HTMLElement | null>(null);
const descRef = ref<HTMLElement | null>(null);
let gsapContext: gsap.Context | null = null;
let introTween: gsap.core.Tween | null = null;

onMounted(() => {
  gsap.registerPlugin(ScrollTrigger);

  const planeRoot = planeRef.value as any;
  const planeEl = planeRoot?.$el || planeRoot;
  const target = planeEl?.querySelector?.('img') || planeEl;

  if (!target) {
    console.warn('Plane element topilmadi');
    return;
  }

  gsapContext = gsap.context(() => {
    gsap.set(target, { transformOrigin: '50% 50%' });
    introTween = gsap.fromTo(
      target,
      { y: 20, scale: 0.7 },
      {
        y: 0,
        scale: 1,
        duration: 1.2,
        ease: 'power3.out',
        onComplete: () => {
          gsap.to(target, {
            yPercent: -200,
            scale: 3,
            ease: 'none',
            overwrite: 'auto',
            scrollTrigger: {
              trigger: '.hero',
              start: 'top top',
              end: 'bottom top',
              scrub: true,
              markers: false,
            },
          });
          ScrollTrigger.refresh();
        },
      },
    );

    const textTargets = [titleRef.value, descRef.value].filter(Boolean);
    if (textTargets.length) {
      gsap.from(textTargets, {
        opacity: 0,
        y: 20,
        duration: 0.8,
        ease: 'power3.out',
        stagger: 0.15,
      });
    }
  }, target);
});

onBeforeUnmount(() => {
  introTween?.kill();
  introTween = null;
  gsapContext?.revert();
  gsapContext = null;
});
</script>

<style scoped lang="scss">
:deep(picture) {
  width: 100%;
  z-index: 0;
}

:deep(.hero__img) {
  width: 100%;
  height: 97rem;
  object-position: bottom;
  object-fit: cover;
  display: block;
  @include respond(1470px) {
    height: 80rem;
  }
  @include respond(780px) {
    height: 60rem;
  }
  @include respond(520px) {
    height: 50rem;
  }
}

.hero {
  position: relative;

  &::after {
    content: "";
    width: 100%;
    height: 49rem;
    display: block;
    background: linear-gradient(180deg, #0E1530 0%, rgba(14, 21, 48, 0) 100%);
    position: absolute;
    top: 0;
    left: 0;
    pointer-events: none; // Click eventlarni o'tkazish
  }

  .container {
    position: absolute;
    top: 5.5rem;
    left: 50%;
    transform: translateX(-50%);
    z-index: 1;
    display: flex;
    justify-content: center;
    overflow-x: hidden;
    flex-direction: column;
    align-items: center;
    @include respond(520px) {
      top: 4rem;
    }
  }

  &_content {
    max-width: 81.2rem;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 2rem;
  }

  &_title {
    font-weight: 500;
    font-size: 7.5rem;
    margin-bottom: 2.5rem;
    line-height: 1;
    @include respond(1470px) {
      font-size: 6rem;
    }
    @include respond(520px) {
      font-size: 4rem;
    }
  }

  &_button {
    @include respond(520px) {
      width: 100%;
    }
  }

  &_desc {
    font-weight: 400;
    font-size: 2.6rem;
    margin-bottom: 6rem;
    line-height: 1;
    @include respond(1470px) {
      font-size: 1.8rem;
      margin-bottom: 4rem;
    }
  }

  &_img {
    width: 110.5rem;
    height: auto;
    will-change: transform;
    object-fit: contain;
    @include respond(1470px) {
      width: 90rem;
    }
  }
}
</style>
