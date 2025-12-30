<template>
  <div
    ref="wrapperRef"
    class="how-we-work-cards-wrapper"
  >
    <!-- Dynamic curved line that goes THROUGH icon centers -->
    <svg
      ref="svgRef"
      class="hww-line"
      aria-hidden="true"
    >
      <path
        class="hww-line-base"
        :d="pathD"
      />
      <path
        ref="pathRef"
        class="hww-line-progress"
        :d="pathD"
      />
    </svg>

    <div
      v-for="(step, index) in sortedSteps"
      :key="step.id"
      class="how-we-work-card"
    >
      <div
        :ref="(el) => setIconRef(el as HTMLElement, index)"
        class="hww-icon"
      >
        <svg
          height="28"
          width="28"
        >
          <use :xlink:href="`/sprite.svg#${step.icon || defaultIcons[index] || 'i-calendar'}`" />
        </svg>
      </div>
      <h3>{{ step.title }}</h3>
      <p>{{ step.description }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref } from 'vue';

interface Pt {
  x: number
  y: number
}

const props = defineProps<{
  steps?: any
}>();

// Default icons for each step
const defaultIcons = [
  'i-calendar',
  'i-pilot',
  'i-check',
  'i-samalet',
];

const sortedSteps = computed(() => {
  const data = props.steps?.data || [];
  if (!Array.isArray(data))
    return [];
  return [...data].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
});

const wrapperRef = ref<HTMLElement | null>(null);
const svgRef = ref<SVGSVGElement | null>(null);
const pathRef = ref<SVGPathElement | null>(null);

const iconEls = ref<HTMLElement[]>([]);
const pathD = ref('');
const iconProgress = ref<number[]>([]);

let totalLen = 0;
let ro: ResizeObserver | null = null;

function setIconRef(el: HTMLElement | null, idx: number) {
  if (!el)
    return;
  iconEls.value[idx] = el;
}

// Smooth curve through points (Catmull-Rom -> Cubic Bezier)
function catmullRomPath(points: Pt[], tension = 1) {
  if (points.length < 2)
    return '';
  const t = tension;

  let d = `M ${points[0].x.toFixed(2)} ${points[0].y.toFixed(2)}`;
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[i - 1] ?? points[i];
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = points[i + 2] ?? p2;

    const c1x = p1.x + ((p2.x - p0.x) * t) / 6;
    const c1y = p1.y + ((p2.y - p0.y) * t) / 6;
    const c2x = p2.x - ((p3.x - p1.x) * t) / 6;
    const c2y = p2.y - ((p3.y - p1.y) * t) / 6;

    d += ` C ${c1x.toFixed(2)} ${c1y.toFixed(2)}, ${c2x.toFixed(2)} ${c2y.toFixed(2)}, ${p2.x.toFixed(2)} ${p2.y.toFixed(2)}`;
  }
  return d;
}

function clamp(n: number, a: number, b: number) {
  return Math.max(a, Math.min(b, n));
}

function getClosestLength(path: SVGPathElement, target: Pt) {
  const len = path.getTotalLength();
  if (!len)
    return 0;
  const steps = Math.max(12, Math.floor(len / 8));
  let closestLen = 0;
  let closestDist = Number.POSITIVE_INFINITY;

  for (let i = 0; i <= steps; i++) {
    const l = (i / steps) * len;
    const p = path.getPointAtLength(l);
    const dx = p.x - target.x;
    const dy = p.y - target.y;
    const d = (dx * dx) + (dy * dy);
    if (d < closestDist) {
      closestDist = d;
      closestLen = l;
    }
  }

  const span = len / steps;
  for (let i = -8; i <= 8; i++) {
    const l = clamp(closestLen + (i / 8) * span, 0, len);
    const p = path.getPointAtLength(l);
    const dx = p.x - target.x;
    const dy = p.y - target.y;
    const d = (dx * dx) + (dy * dy);
    if (d < closestDist) {
      closestDist = d;
      closestLen = l;
    }
  }

  return closestLen;
}

async function buildPath() {
  await nextTick();

  const wrap = wrapperRef.value;
  const svg = svgRef.value;
  const path = pathRef.value;
  if (!wrap || !svg || !path)
    return;

  // responsive: eski logikangga mos, 2 col bo‘lsa line yo‘q
  if (window.matchMedia('(max-width: 1177px)').matches) {
    pathD.value = '';
    totalLen = 0;
    iconProgress.value = [];
    iconEls.value.forEach((el) => {
      el?.classList.remove('is-active');
    });
    return;
  }

  const wRect = wrap.getBoundingClientRect();
  const pts: Pt[] = iconEls.value
    .filter(Boolean)
    .map((el) => {
      const r = el.getBoundingClientRect();
      return {
        x: r.left + r.width / 2 - wRect.left,
        y: r.top + r.height / 2 - wRect.top,
      };
    });

  if (pts.length < 2)
    return;

  // SVG o‘lcham: wrapper eni + path uchun biroz “nafas”
  const width = wRect.width;
  const minY = Math.min(...pts.map(p => p.y));
  const maxY = Math.max(...pts.map(p => p.y));
  const padTop = 30;
  const padBottom = 30;
  const height = (maxY - minY) + padTop + padBottom;

  // Y’ni svg ichiga normalize qilamiz (topdan padTop)
  const normalized = pts.map(p => ({ x: p.x, y: (p.y - minY) + padTop }));

  svg.setAttribute('viewBox', `0 0 ${width} ${height}`);
  svg.style.height = `${height}px`;

  // tension: 1 normal, 1.3 ko‘proq “qiyshiq”, 0.7 tekisroq
  pathD.value = catmullRomPath(normalized, 1.25);

  await nextTick();
  totalLen = path.getTotalLength();
  path.style.strokeDasharray = `${totalLen}`;
  path.style.strokeDashoffset = `${totalLen}`;
  iconProgress.value = normalized.map(p => getClosestLength(path, p));

  updateScroll(); // initial state
}

function updateScroll() {
  const wrap = wrapperRef.value;
  const path = pathRef.value;
  if (!wrap || !path || !totalLen)
    return;
  if (!pathD.value) {
    iconEls.value.forEach((el) => {
      el?.classList.remove('is-active');
    });
    return;
  }

  const rect = wrap.getBoundingClientRect();
  const vh = window.innerHeight;

  // progress start/end: shu joylarni o‘zingga moslab sozla
  const startAt = vh * 0.85; // wrapper top shu joyga kelganda chizish boshlansin
  const endAt = vh * 0.25; // wrapper top shu joyga kelganda 100% bo‘lsin

  const t = (startAt - rect.top) / (startAt - endAt);
  const p = clamp(t, 0, 1);

  const progressLen = totalLen * p;
  path.style.strokeDashoffset = `${totalLen - progressLen}`;

  iconEls.value.forEach((el, idx) => {
    if (!el)
      return;
    const threshold = 6;
    const iconLen = iconProgress.value[idx] ?? totalLen + 1;
    el.classList.toggle('is-active', progressLen >= iconLen - threshold);
  });
}

onMounted(async () => {
  await buildPath();

  window.addEventListener('scroll', updateScroll, { passive: true });
  window.addEventListener('resize', buildPath);

  if (wrapperRef.value) {
    ro = new ResizeObserver(() => buildPath());
    ro.observe(wrapperRef.value);
  }
});

onBeforeUnmount(() => {
  window.removeEventListener('scroll', updateScroll);
  window.removeEventListener('resize', buildPath);
  ro?.disconnect();
  ro = null;
});
</script>

<style scoped lang="scss">
.how-we-work-cards-wrapper {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 30px;
  margin-top: 40px;
  position: relative;

  @include respond(1177px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @include respond(550px) {
    grid-template-columns: repeat(1, 1fr);
  }

  .hww-line {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    z-index: 0;
    pointer-events: none;

    @include respond(1177px) {
      display: none;
    }

    .hww-line-base {
      fill: none;
      stroke: rgba(255, 255, 255, 0.45);
      stroke-width: 2;
      stroke-linecap: round;
      stroke-linejoin: round;
      stroke-dasharray: 8 10; // xohlasang olib tashlab solid qilasan
    }

    .hww-line-progress {
      fill: none;
      stroke: $color-yellow;
      stroke-width: 2;
      stroke-linecap: round;
      stroke-linejoin: round;
      // scroll bilan ketadi, lekin “silk” effekt uchun:
      transition: stroke-dashoffset 0.08s linear;
    }
  }

  .how-we-work-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    position: relative;
    z-index: 1;

    .hww-icon {
      width: 60px;
      height: 60px;
      border: 1px solid rgba(255, 255, 255, 0.25);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #0E1530;
      color: $color-white;
      position: relative;
      z-index: 2; // icon doirasi line ustida turadi

      svg { display: block; }
    }

    .hww-icon.is-active {
      border-color: $color-yellow;
      color: $color-yellow;
      box-shadow: 0 0 0 2px rgba($color-yellow, 0.2);
    }

    h3 { font-weight: 500; font-size: 20px; }
    p {
      width: 100%;
      max-width: 317px;
      font-weight: 400;
      font-size: 16px;
      text-align: center;
      opacity: 0.7;
    }
  }
}
</style>
