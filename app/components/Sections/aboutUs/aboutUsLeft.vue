<template>
  <div class="about-us-left">
    <div
      ref="aboutLeftRef"
      class="about-us-left-img-and-cards"
    >
      <img
        class="about-us-main-img"
        :src="mainImage"
        :alt="mainImageAlt"
      >
      <div class="about-us-cards-wrapper">
        <span
          ref="lineRef"
          class="about-us-line-dec"
        >
          <svg
            ref="lineSvgRef"
            class="about-us-line-svg"
            aria-hidden="true"
          >
            <path
              class="about-us-line-base"
              :d="linePathD"
            />
            <path
              ref="linePathRef"
              class="about-us-line-progress"
              :d="linePathD"
            />
          </svg>
          <span
            ref="planeRef"
            class="samalet-line"
          ><img
            src="/images/png/line-samalet.png"
            alt=""
          ></span>
        </span>
        <UiCard
          v-for="(item, idx) in stats"
          :key="item.id || idx"
          class="about-us-card"
        >
          <h3
            :ref="(el) => setCountRef(el as HTMLElement, idx)"
            :data-count="item.value"
            data-prefix="+"
          >
            +0
          </h3>
          <span>{{ item.label }}</span>
        </UiCard>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const props = defineProps({
  about: {
    type: Object,
    default: () => ({}),
  },
  statistics: {
    type: Object,
    default: () => ({}),
  },
});

const mainImage = computed(() => props.about?.data?.logo_image || '/images/png/about-us-img.png');
const mainImageAlt = computed(() => props.about?.data?.title || 'Biz haqimizda');
const stats = computed(() => {
  const items = props.statistics?.data;
  if (!Array.isArray(items)) return [];
  return [...items]
    .slice()
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
    .map((item, index) => ({
      id: item.id ?? index,
      value: item.value ?? 0,
      label: item.label || '',
      icon: item.icon || '',
    }));
});

const aboutLeftRef = ref<HTMLElement | null>(null);
const lineRef = ref<HTMLElement | null>(null);
const lineSvgRef = ref<SVGSVGElement | null>(null);
const linePathRef = ref<SVGPathElement | null>(null);
const linePathD = ref('');
const planeRef = ref<HTMLElement | null>(null);
const countRefs = ref<HTMLElement[]>([]);

let aboutContext: gsap.Context | null = null;
let scrollTween: gsap.core.Tween | null = null;
let resizeHandler: (() => void) | null = null;
let totalLen = 0;
let planeSize = { w: 0, h: 0 };

function setCountRef(el: HTMLElement | null, idx: number) {
  if (!el)
    return;
  countRefs.value[idx] = el;
}

async function setupCountAnimations() {
  await nextTick();
  const wrapEl = aboutLeftRef.value;
  if (!wrapEl)
    return;

  countRefs.value.forEach((el) => {
    if (!el)
      return;
    const end = Number(el.dataset.count || 0);
    const prefix = el.dataset.prefix || '';
    const suffix = el.dataset.suffix || '';
    const state = { value: 0 };

    gsap.to(state, {
      value: end,
      duration: 1.6,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: wrapEl,
        start: 'top 80%',
        toggleActions: 'play none none reverse',
      },
      onUpdate: () => {
        el.textContent = `${prefix}${Math.round(state.value)}${suffix}`;
      },
    });
  });
}

function updatePlaneSize() {
  const planeEl = planeRef.value;
  if (!planeEl)
    return;
  planeSize = {
    w: planeEl.offsetWidth,
    h: planeEl.offsetHeight,
  };
}

async function buildLine() {
  await nextTick();
  const lineWrap = lineRef.value;
  const svg = lineSvgRef.value;
  if (!lineWrap || !svg)
    return;

  const rect = lineWrap.getBoundingClientRect();
  const width = rect.width || 40;
  const height = rect.height || 1;
  const x = width / 2;

  linePathD.value = `M ${x} 0 L ${x} ${height}`;
  svg.setAttribute('viewBox', `0 0 ${width} ${height}`);
  svg.style.width = `${width}px`;
  svg.style.height = `${height}px`;

  await nextTick();
  const path = linePathRef.value;
  if (!path)
    return;
  totalLen = path.getTotalLength();
  path.style.strokeDasharray = `${totalLen}`;
  path.style.strokeDashoffset = `${totalLen}`;
}

async function setupLineAnimation() {
  const lineEl = lineRef.value;
  const path = linePathRef.value;
  const planeEl = planeRef.value;
  const wrapEl = aboutLeftRef.value;
  if (!lineEl || !path || !planeEl || !wrapEl)
    return;

  scrollTween?.kill();
  scrollTween = null;

  if (window.matchMedia('(max-width: 885px)').matches) {
    linePathD.value = '';
    totalLen = 0;
    gsap.set(planeEl, { clearProps: 'transform' });
    return;
  }

  await buildLine();
  if (!totalLen)
    return;

  updatePlaneSize();
  const progress = { value: 0 };
  scrollTween = gsap.to(progress, {
    value: 1,
    ease: 'none',
    scrollTrigger: {
      trigger: wrapEl,
      start: 'top 80%',
      end: 'bottom 20%',
      scrub: true,
    },
    onUpdate: () => {
      const len = totalLen * progress.value;
      path.style.strokeDashoffset = `${totalLen - len}`;

      if (!planeSize.w || !planeSize.h)
        updatePlaneSize();
      if (!planeSize.w || !planeSize.h)
        return;

      const pt = path.getPointAtLength(len);
      gsap.set(planeEl, {
        x: pt.x - planeSize.w / 2,
        y: pt.y - planeSize.h / 2,
      });
    },
  });
}

onMounted(() => {
  gsap.registerPlugin(ScrollTrigger);
  const wrapEl = aboutLeftRef.value;
  if (!wrapEl)
    return;

  aboutContext = gsap.context(() => {
    setupCountAnimations();
    setupLineAnimation();
  }, wrapEl);

  const planeImg = planeRef.value?.querySelector('img');
  if (planeImg && !planeImg.complete) {
    planeImg.addEventListener('load', () => {
      updatePlaneSize();
      setupLineAnimation();
    }, { once: true });
  }

  resizeHandler = () => {
    updatePlaneSize();
    setupLineAnimation();
  };
  window.addEventListener('resize', resizeHandler);
});

onBeforeUnmount(() => {
  scrollTween?.kill();
  scrollTween = null;
  if (resizeHandler) {
    window.removeEventListener('resize', resizeHandler);
    resizeHandler = null;
  }
  aboutContext?.revert();
  aboutContext = null;
});
</script>

<style scoped lang="scss">
.about-us-left-img-and-cards {
    display: flex;
    gap: 20px;
    
    @include respond(885px) {
        align-items: center;
        flex-direction: column;
    }

    .about-us-main-img {
        width: 40.7rem;
        height: 54rem;
        flex-shrink: 0;
    }
}

.about-us-cards-wrapper {
    height: 54rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 3rem;
    position: relative;

    @include respond(885px) {
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: center;
    }

    .about-us-line-dec {
        height: 90%;
        position: absolute;
        right: -45px;
        top: 19px;
        display: inline-block;
        z-index: 0;
        width: 6rem;
        overflow: visible;
        pointer-events: none;

        @include respond(885px) {
            display: none;
        }
    }

    .about-us-line-svg {
        display: block;
        width: 100%;
        height: 100%;
    }

    .about-us-line-base {
        fill: none;
        stroke: rgba(255, 255, 255, 0.4);
        stroke-width: 2;
        stroke-linecap: round;
        stroke-dasharray: 6 8;
    }

    .about-us-line-progress {
        fill: none;
        stroke: $color-yellow;
        stroke-width: 2;
        stroke-linecap: round;
        stroke-dasharray: 6 8;
    }

    .samalet-line {
        position: absolute;
        left: 0;
        top: 0;
        will-change: transform;
        z-index: 1;
        pointer-events: none;

        @include respond(885px) {
            display: none;
        }
    }

    .about-us-card {
        padding: 1.8rem;
        min-width: 21rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 1.2rem;
        h3 {
            font-weight: 300;
            line-height: 1;
            font-size: 4rem;
            white-space: nowrap;
        }

        span {
            display: block;
            font-size: 14px;
            white-space: nowrap;
        }
    }
}
</style>
