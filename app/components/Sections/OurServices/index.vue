<template>
  <div
    ref="servicesRef"
    class="our-services"
  >
    <div class="container">
      <div class="our-services-wrapper">
        <h2 class="our-services-wrapper__title">
          Bizning xizmatlarimiz
        </h2>
        <p class="our-services-wrapper__sub-title">
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
        </p>

        <div class="services-list">
          <div
            v-for="(service, index) in servicesList"
            :key="service.id || index"
            class="our-services-item"
          >
            <div class="images-and-texts-wrp">
              <OurServicesPhotos
                :service="service"
                :two-images="(index + 1) % 2 === 0"
              />
              <OurServicestexts :service="service" />
            </div>
            <div
              v-if="index < servicesList.length - 1"
              class="our-services-divider"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import OurServicesPhotos from './ourServicesPhotos.vue';
import OurServicestexts from './ourServicestexts.vue';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const props = defineProps<{ services?: any }>();

const servicesRef = ref<HTMLElement | null>(null);
let servicesContext: gsap.Context | null = null;
const servicesList = computed(() => {
  const items = props.services?.data;
  if (!Array.isArray(items)) return [];
  return [...items].slice().sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
});

onMounted(() => {
  gsap.registerPlugin(ScrollTrigger);
  const sectionEl = servicesRef.value;
  if (!sectionEl) return;

  servicesContext = gsap.context(() => {
    const q = gsap.utils.selector(sectionEl);
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionEl,
        start: 'top 80%',
        toggleActions: 'play none none reverse',
      },
    });

    tl.from(q('.our-services-wrapper__title'), {
      autoAlpha: 0,
      y: 20,
      duration: 0.6,
      ease: 'power2.out',
      clearProps: 'opacity,transform,visibility',
    }).from(
      q('.our-services-wrapper__sub-title'),
      {
        autoAlpha: 0,
        y: 16,
        duration: 0.5,
        ease: 'power2.out',
        clearProps: 'opacity,transform,visibility',
      },
      '-=0.3',
    ).from(
      q('.images-and-texts-wrp'),
      {
        autoAlpha: 0,
        y: 16,
        duration: 0.35,
        ease: 'power2.out',
        stagger: 0.08,
        clearProps: 'opacity,transform,visibility',
      },
      '-=0.2',
    );
  }, sectionEl);
});

onBeforeUnmount(() => {
  servicesContext?.revert();
  servicesContext = null;
});
</script>

<style scoped lang="scss">
.our-services {
    padding-bottom: 40px;
    .our-services-wrapper {
        @include respond(1200px) {
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: 20px 0;
        }

        &__title {
            @include heading-1;
           margin-bottom: 1.8rem;

        }

        &__sub-title {
            font-weight: 400;
            font-size: 18px;
            opacity: 0.7;

            @include respond(1200px) {
                text-align: center;
            }

            @include respond(750px) {
                font-size: 16px;
            }
        }

        .images-and-texts-wrp {
            display: flex;
            gap: 9rem;
            padding: 50px 0;
            @include respond(1270px) {
              gap: 50px;
            }

            @include respond(1270px) {
                padding: 20px;
            }

            @include respond(1200px) {
                flex-direction: column;
            }
        }

        .our-services-item:nth-child(even) .images-and-texts-wrp {
          flex-direction: row-reverse;
          @include respond(1200px) {
            flex-direction: column;
          }
        }

        .our-services-divider {
          border: 1px solid;
          border-image-source: linear-gradient(90deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.5) 48.08%, rgba(255, 255, 255, 0) 100%);
          border-image-slice: 1;
          width: 100%;
          height: 0;
        }
    }
}
</style>
