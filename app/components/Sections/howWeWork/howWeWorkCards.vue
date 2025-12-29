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
        ref="pathRef"
        :d="pathD"
      />
    </svg>

    <div class="how-we-work-card">
      <div
        :ref="(el) => setIconRef(el as HTMLElement, 0)"
        class="hww-icon"
      >
        <svg
          height="28"
          width="28"
        >
          <use xlink:href="/sprite.svg#i-calendar" />
        </svg>
      </div>
      <h3>Parvozni bron qiling</h3>
      <p>Veb-sayt, telefon yoki messenjer orqali biz bilan bog'laning.</p>
    </div>

    <div class="how-we-work-card">
      <div
        :ref="(el) => setIconRef(el as HTMLElement, 1)"
        class="hww-icon"
      >
        <svg
          height="28"
          width="28"
        >
          <use xlink:href="/sprite.svg#i-pilot" />
        </svg>
      </div>
      <h3>Parvozni bron qiling</h3>
      <p>Veb-sayt, telefon yoki messenjer orqali biz bilan bog'laning.</p>
    </div>

    <div class="how-we-work-card">
      <div
        :ref="(el) => setIconRef(el as HTMLElement, 2)"
        class="hww-icon"
      >
        <svg
          height="28"
          width="28"
        >
          <use xlink:href="/sprite.svg#i-check" />
        </svg>
      </div>
      <h3>Parvozni bron qiling</h3>
      <p>Veb-sayt, telefon yoki messenjer orqali biz bilan bog'laning.</p>
    </div>

    <div class="how-we-work-card">
      <div
        :ref="(el) => setIconRef(el as HTMLElement, 3)"
        class="hww-icon"
      >
        <svg
          height="28"
          width="28"
        >
          <use xlink:href="/sprite.svg#i-samalet" />
        </svg>
      </div>
      <h3>Parvozni bron qiling</h3>
      <p>Veb-sayt, telefon yoki messenjer orqali biz bilan bog'laning.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { nextTick, onBeforeUnmount, onMounted, ref } from 'vue';

interface Pt {
  x: number
  y: number
}

const wrapperRef = ref<HTMLElement | null>(null);
const svgRef = ref<SVGSVGElement | null>(null);
const pathRef = ref<SVGPathElement | null>(null);

const iconEls = ref<HTMLElement[]>([]);
const pathD = ref('');

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

  updateScroll(); // initial state
}

function clamp(n: number, a: number, b: number) {
  return Math.max(a, Math.min(b, n));
}

function updateScroll() {
  const wrap = wrapperRef.value;
  const path = pathRef.value;
  if (!wrap || !path || !totalLen)
    return;
  if (!pathD.value)
    return;

  const rect = wrap.getBoundingClientRect();
  const vh = window.innerHeight;

  // progress start/end: shu joylarni o‘zingga moslab sozla
  const startAt = vh * 0.85; // wrapper top shu joyga kelganda chizish boshlansin
  const endAt = vh * 0.25; // wrapper top shu joyga kelganda 100% bo‘lsin

  const t = (startAt - rect.top) / (startAt - endAt);
  const p = clamp(t, 0, 1);

  path.style.strokeDashoffset = `${totalLen * (1 - p)}`;
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

    path {
      fill: none;
      stroke: rgba(255, 255, 255, 0.45);
      stroke-width: 2;
      stroke-linecap: round;
      stroke-linejoin: round;
      stroke-dasharray: 8 10; // xohlasang olib tashlab solid qilasan
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
      position: relative;
      z-index: 2; // icon doirasi line ustida turadi

      svg { display: block; }
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
