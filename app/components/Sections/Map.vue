<template>
  <section class="map">
    <div class="container map__shell">
      <div class="content">
        <h2>{{ sectionTitle }}</h2>
        <p>{{ sectionSubtitle }}</p>
      </div>
      <div
        ref="wrapRef"
        class="map__wrap"
        @click="hideTooltip"
      >
        <div
          ref="mapHostRef"
          class="map__host"
          aria-label="World map"
        />

        <svg
          class="map__overlay"
          viewBox="0 0 1009.6727 665.96301"
          preserveAspectRatio="xMidYMid meet"
          aria-hidden="true"
        >
          <path
            v-for="route in routePaths"
            :key="route.key"
            :d="route.d"
            class="map__route"
          />
        </svg>

        <div
          class="map__marker-layer"
          aria-label="City markers"
        >
          <button
            v-for="marker in markers"
            :key="marker.key"
            type="button"
            class="map__marker"
            :class="{ 'is-active': marker.key === activeMarkerKey }"
            :style="markerStyle(marker)"
            :aria-label="`${marker.city.name} ${marker.city.country_code || ''}`.trim()"
            @click.stop="showTooltip(marker)"
          >
            <span
              class="map__photo"
              :class="{ 'map__photo--fallback': !cityImageUrl(marker.city) }"
              :style="markerPhotoStyle(marker.city)"
            />
            <span class="map__pin-line" />
            <span
              class="map__pin-dot"
              :style="{ background: marker.kind === 'from' ? 'var(--map-from)' : 'var(--map-to)' }"
            />
          </button>
        </div>

        <div
          v-if="activeMarker"
          ref="tipRef"
          class="map__tip"
          :style="{ left: `${tipPosition.left}px`, top: `${tipPosition.top}px` }"
        >
          <img
            :src="tipImgSrc"
            :alt="tipTitle || 'City photo'"
            @error="handleTipImageError"
          >
          <div class="map__tip-content">
            <b>{{ tipTitle }}</b>
            <span class="map__tip-country">{{ tipCountry }}</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
interface City {
  id: number
  name: string
  country_name: string
  country_code: string | null
  flag: string | null
  image: string | null
  latitude: number
  longitude: number
  airport_code?: string | null
  size?: number
  population?: number
  importance?: number
}

interface RouteRow {
  id: number
  from_city: City
  to_city: City
}

interface RoutesResponse {
  status: boolean
  message: string
  data: RouteRow[]
}

interface GeographySection {
  id: number
  title: string
  subtitle: string
  map_image: string | null
}

interface GeographySectionResponse {
  status: boolean
  message: string
  data: GeographySection
}

type MarkerKind = 'from' | 'to';

interface MarkerBase {
  key: string
  kind: MarkerKind
  rowId: number
  city: City
  x: number
  y: number
}

interface Marker extends MarkerBase {
  scale: number
}

const { locale } = useI18n();
const { data: sectionData } = await useAsyncData<GeographySectionResponse>(
  'geography-section',
  () => apiFetch('/geography/section/'),
  { watch: [locale] },
);
const { data: routesData } = await useAsyncData<RoutesResponse>(
  'geography-routes',
  () => apiFetch('/geography/routes/'),
  { watch: [locale] },
);

const wrapRef = ref<HTMLElement | null>(null);
const mapHostRef = ref<HTMLDivElement | null>(null);
const tipRef = ref<HTMLDivElement | null>(null);
const tipPosition = ref({ left: 0, top: 0 });
const tipImgSrc = ref('');
const tipImgFallback = ref('');
const activeMarkerKey = ref<string | null>(null);
const wrapSize = ref({ width: 0, height: 0 });
const svgReady = ref(false);
const highlightedCountries = new Set<SVGPathElement>();
let resizeObserver: ResizeObserver | null = null;

const routes = computed(() => routesData.value?.data ?? []);
const section = computed(() => sectionData.value?.data ?? null);
const sectionTitle = computed(() => section.value?.title ?? 'Uchishlar Geografiyasi');
const sectionSubtitle = computed(() => section.value?.subtitle ?? '');

const GEO = {
  left: -169.110266,
  top: 83.600842,
  right: 190.486279,
  bottom: -58.508473,
  width: 1009.6727,
  height: 665.96301,
};

const HIGHLIGHT = {
  fill: 'rgba(67,108,255,.45)',
  stroke: 'rgba(67,108,255,.95)',
  strokeWidth: '1.2',
};

const PIN_SCALE = {
  min: 0.85,
  max: 1.35,
  fallback: 1,
};

const activeMarker = computed(() => (
  markers.value.find(marker => marker.key === activeMarkerKey.value) ?? null
));

const tipTitle = computed(() => {
  const marker = activeMarker.value;
  if (!marker)
    return '';
  return marker.city.name;
});

const tipCountry = computed(() => {
  const marker = activeMarker.value;
  if (!marker)
    return '';
  return marker.city.country_name;
});

const routePaths = computed(() => {
  const paths: Array<{ key: string, d: string }> = [];
  for (const row of routes.value) {
    const start = cityToPoint(row.from_city);
    const end = cityToPoint(row.to_city);
    if (!start || !end)
      continue;

    const mx = (start.x + end.x) / 2;
    const my = (start.y + end.y) / 2;
    const bend = Math.max(30, Math.min(120, Math.abs(start.x - end.x) * 0.18));
    const cx = mx;
    const cy = my - bend;

    paths.push({
      key: `route-${row.id}`,
      d: `M ${start.x} ${start.y} Q ${cx} ${cy} ${end.x} ${end.y}`,
    });
  }
  return paths;
});

const markers = computed<Marker[]>(() => {
  const base = flattenMarkers(routes.value);
  const scaleForCity = buildScaleForMarkers(base);
  return base.map(marker => ({
    ...marker,
    scale: scaleForCity(marker.city),
  }));
});

function updateWrapSize() {
  const wrap = wrapRef.value;
  if (!wrap)
    return;
  const rect = wrap.getBoundingClientRect();
  wrapSize.value = { width: rect.width, height: rect.height };
}

function svgToClient(x: number, y: number) {
  const { width, height } = wrapSize.value;
  if (!width || !height) {
    return { left: 0, top: 0 };
  }
  const scaleX = width / GEO.width;
  const scaleY = height / GEO.height;
  return {
    left: x * scaleX,
    top: y * scaleY,
  };
}

function markerStyle(marker: Marker) {
  const pos = svgToClient(marker.x, marker.y);
  return {
    'left': `${pos.left}px`,
    'top': `${pos.top}px`,
    '--pin-scale': String(marker.scale),
  };
}

function markerPhotoStyle(city: City) {
  const imgUrl = cityImageUrl(city);
  if (imgUrl) {
    return { backgroundImage: `url("${imgUrl}")` };
  }
  return { backgroundColor: fallbackColorForCity(city) };
}

function showTooltip(marker: Marker) {
  activeMarkerKey.value = marker.key;
}

function hideTooltip() {
  activeMarkerKey.value = null;
}

function handleTipImageError() {
  if (tipImgFallback.value) {
    tipImgSrc.value = tipImgFallback.value;
  }
}

function updateTooltipPosition(marker: Marker) {
  const base = svgToClient(marker.x, marker.y);
  tipPosition.value = { left: base.left, top: base.top };

  nextTick(() => {
    const wrap = wrapRef.value;
    const tipEl = tipRef.value;
    if (!wrap || !tipEl)
      return;

    const wrapRect = wrap.getBoundingClientRect();
    const tipRect = tipEl.getBoundingClientRect();
    let dx = 0;
    let dy = 0;

    if (tipRect.right > wrapRect.right - 8) {
      dx = (wrapRect.right - 8) - tipRect.right;
    }
    if (tipRect.left < wrapRect.left + 8) {
      dx = (wrapRect.left + 8) - tipRect.left;
    }
    if (tipRect.top < wrapRect.top + 8) {
      dy = (wrapRect.top + 8) - tipRect.top;
    }

    tipPosition.value = {
      left: base.left + dx,
      top: base.top + dy,
    };
  });
}

function cityImageUrl(city: City) {
  if (city && typeof city.image === 'string' && city.image.trim()) {
    return city.image.trim();
  }
  return null;
}

function fallbackColorForCity(city: City) {
  const key = `${city?.name || ''}-${city?.country_code || ''}`;
  let hash = 0;
  for (let i = 0; i < key.length; i += 1) {
    hash = ((hash << 5) - hash) + key.charCodeAt(i);
    hash |= 0;
  }
  const palette = ['#3e6bff', '#00d8a4', '#ffb454', '#ff6b8a', '#8a7dff', '#39b7ff'];
  return palette[Math.abs(hash) % palette.length];
}

function solidColorDataUri(color: string) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="160" height="160"><rect width="160" height="160" rx="28" fill="${color}"/></svg>`;
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}

function getCitySizeValue(city: City) {
  const size = city?.size ?? city?.population ?? city?.importance;
  return Number.isFinite(size) ? size : null;
}

function buildScaleForMarkers(list: MarkerBase[]) {
  const values = list.map(marker => getCitySizeValue(marker.city)).filter(value => value !== null);
  if (!values.length)
    return () => PIN_SCALE.fallback;
  const min = Math.min(...values);
  const max = Math.max(...values);
  if (min === max)
    return () => PIN_SCALE.fallback;
  return (city: City) => {
    const value = getCitySizeValue(city);
    if (!Number.isFinite(value))
      return PIN_SCALE.fallback;
    const t = (value - min) / (max - min);
    return PIN_SCALE.min + t * (PIN_SCALE.max - PIN_SCALE.min);
  };
}

function flattenMarkers(rows: RouteRow[]) {
  const list: MarkerBase[] = [];
  for (const row of rows) {
    const start = cityToPoint(row.from_city);
    const end = cityToPoint(row.to_city);
    if (!start || !end)
      continue;

    list.push({
      key: `from-${row.id}-${row.from_city.id}`,
      kind: 'from',
      rowId: row.id,
      city: row.from_city,
      x: start.x,
      y: start.y,
    });

    list.push({
      key: `to-${row.id}-${row.to_city.id}`,
      kind: 'to',
      rowId: row.id,
      city: row.to_city,
      x: end.x,
      y: end.y,
    });
  }
  return list;
}

const DEG = Math.PI / 180;
function mercatorY(lat: number) {
  const clamped = Math.max(-85, Math.min(85, lat));
  const rad = clamped * DEG;
  return Math.log(Math.tan(Math.PI / 4 + rad / 2));
}

function lonLatToSvgXY(lon: number, lat: number) {
  const x = ((lon - GEO.left) / (GEO.right - GEO.left)) * GEO.width;
  const yTop = mercatorY(GEO.top);
  const yBottom = mercatorY(GEO.bottom);
  const y = ((yTop - mercatorY(lat)) / (yTop - yBottom)) * GEO.height;
  return { x, y };
}

function cityToPoint(city: City) {
  if (!Number.isFinite(city?.longitude) || !Number.isFinite(city?.latitude))
    return null;
  return lonLatToSvgXY(city.longitude, city.latitude);
}

function applyStaticCountryHighlight(el: SVGPathElement | null) {
  if (!el || highlightedCountries.has(el))
    return;
  el.style.setProperty('fill', HIGHLIGHT.fill, 'important');
  el.style.setProperty('stroke', HIGHLIGHT.stroke, 'important');
  el.style.setProperty('stroke-width', HIGHLIGHT.strokeWidth, 'important');
  el.classList.add('is-highlight');
  highlightedCountries.add(el);
}

function highlightCountriesFromData() {
  const mapSvg = mapHostRef.value?.querySelector('svg');
  if (!mapSvg)
    return;
  highlightedCountries.clear();

  for (const row of routes.value) {
    highlightCityCountry(row.from_city, mapSvg);
    highlightCityCountry(row.to_city, mapSvg);
  }
}

function highlightCityCountry(city: City, mapSvg: SVGSVGElement) {
  if (!city)
    return;

  let el: SVGPathElement | null = null;
  if (city.country_code) {
    const id = String(city.country_code).trim().toUpperCase();
    if (id) {
      el = mapSvg.querySelector(`#${cssEscape(id)}`);
    }
  }

  if (!el && Number.isFinite(city.longitude) && Number.isFinite(city.latitude)) {
    const point = lonLatToSvgXY(city.longitude, city.latitude);
    el = findCountryPathByPoint(point.x, point.y, mapSvg)
      || findCountryPathByBBox(point.x, point.y, mapSvg);
  }

  applyStaticCountryHighlight(el);
}

function findCountryPathByPoint(x: number, y: number, mapSvg: SVGSVGElement) {
  if (typeof mapSvg.createSVGPoint !== 'function')
    return null;

  const point = mapSvg.createSVGPoint();
  point.x = x;
  point.y = y;

  const paths = mapSvg.querySelectorAll('path');
  for (const path of paths) {
    const geometry = path as unknown as SVGGeometryElement;
    if (typeof geometry.isPointInFill === 'function' && geometry.isPointInFill(point)) {
      return path as SVGPathElement;
    }
  }
  return null;
}

function findCountryPathByBBox(x: number, y: number, mapSvg: SVGSVGElement) {
  const paths = mapSvg.querySelectorAll('path');
  for (const path of paths) {
    const box = path.getBBox();
    if (x >= box.x && x <= box.x + box.width && y >= box.y && y <= box.y + box.height) {
      return path as SVGPathElement;
    }
  }
  return null;
}

function cssEscape(value: string) {
  if (typeof CSS !== 'undefined' && typeof CSS.escape === 'function') {
    return CSS.escape(value);
  }
  return String(value).replace(/[^\w-]/g, '\\$&');
}

async function loadMapSvg() {
  const host = mapHostRef.value;
  if (!host)
    return;
  try {
    const res = await fetch('/world.svg');
    const svgText = await res.text();
    host.innerHTML = svgText;

    const injectedSvg = host.querySelector('svg');
    if (injectedSvg) {
      injectedSvg.setAttribute('viewBox', `0 0 ${GEO.width} ${GEO.height}`);
      injectedSvg.setAttribute('preserveAspectRatio', 'xMidYMid meet');
    }

    svgReady.value = true;
    highlightCountriesFromData();
  } catch (err) {
    console.error('Map SVG yuklanmadi', err);
  }
}

function handleResize() {
  updateWrapSize();
  if (activeMarker.value) {
    updateTooltipPosition(activeMarker.value);
  }
}

watch(activeMarker, (marker) => {
  if (!marker) {
    tipImgSrc.value = '';
    tipImgFallback.value = '';
    return;
  }
  const fallback = solidColorDataUri(fallbackColorForCity(marker.city));
  tipImgFallback.value = fallback;
  tipImgSrc.value = cityImageUrl(marker.city) || fallback;
  updateTooltipPosition(marker);
});

watch(markers, (list) => {
  if (activeMarkerKey.value && !list.find(marker => marker.key === activeMarkerKey.value)) {
    activeMarkerKey.value = null;
  }
});

watch([svgReady, routes], ([ready]) => {
  if (ready) {
    highlightCountriesFromData();
  }
}, { immediate: true });

onMounted(() => {
  updateWrapSize();
  if (wrapRef.value && typeof ResizeObserver !== 'undefined') {
    resizeObserver = new ResizeObserver(() => {
      updateWrapSize();
      if (activeMarker.value) {
        updateTooltipPosition(activeMarker.value);
      }
    });
    resizeObserver.observe(wrapRef.value);
  } else {
    window.addEventListener('resize', handleResize);
  }

  loadMapSvg();
});

onBeforeUnmount(() => {
  resizeObserver?.disconnect();
  window.removeEventListener('resize', handleResize);
});
</script>

<style scoped lang="scss">
.map {
  --map-card: rgba(255, 255, 255, 0.08);
  --map-stroke: rgba(255, 255, 255, 0.12);
  --map-text: rgba(255, 255, 255, 0.94);
  --map-muted: rgba(255, 255, 255, 0.65);
  --map-shadow: 0 20px 60px rgba(0, 0, 0, 0.45);
  --map-from: #d7ff3f;
  --map-to: #7bd5ff;
  padding: 10rem 0 12rem;
  color: var(--map-text);
}

.map__shell {
  display: grid;
  gap: 2rem;
}

.map__topbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.6rem;
  padding: 1.6rem 1.8rem;
  border-radius: 1.8rem;
  border: 1px solid var(--map-stroke);

  @include respond(900px) {
    flex-direction: column;
    align-items: flex-start;
  }
}

.map__title {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;

  b {
    font-size: 1.5rem;
    letter-spacing: 0.02rem;
  }

  span {
    font-size: 1.2rem;
    color: var(--map-muted);
  }
}

.map__actions {
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
}

.map__btn {
  border: 1px solid var(--map-stroke);
  background: rgba(255, 255, 255, 0.06);
  color: var(--map-text);
  padding: 1rem 1.4rem;
  border-radius: 1.4rem;
  cursor: pointer;
  transition: transform 0.12s ease, background 0.12s ease;
  font-weight: 600;
  font-size: 1.2rem;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }
}

.map__wrap {
  position: relative;
  width: 100%;
  height: 90rem;
  aspect-ratio: 1009.6727 / 665.96301;
  overflow: hidden;
}

.map__host {
  position: absolute;
  inset: 0;
}

.map__overlay {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.map__route {
  opacity: 0.6;
  stroke-width: 2.2;
  fill: none;
  stroke-linecap: round;
  stroke: rgba(255, 255, 255, 0.55);
  stroke-dasharray: 6 6;
  animation: mapDash 2.2s linear infinite;
}

.map__marker-layer {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.map__marker {
  --pin-scale: 1;
  position: absolute;
  left: 0;
  top: 0;
  transform: translate(-50%, -100%) scale(var(--pin-scale));
  transform-origin: center bottom;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.8rem;
  background: transparent;
  border: none;
  padding: 0;
  cursor: pointer;
  pointer-events: auto;
  filter: drop-shadow(0 10px 20px rgba(0, 0, 0, 0.45));
  animation: mapPinPulse 2.4s ease-in-out infinite;

  &:focus-visible {
    outline: 2px solid rgba(255, 255, 255, 0.65);
    outline-offset: 4px;
    border-radius: 999px;
  }

  &.is-active .map__photo {
    box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.35);
  }
}

.map__photo {
  width: 6rem;
  height: 6rem;
  border-radius: 50%;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  border: 1px solid rgba(255, 255, 255, 0.9);
  transition: transform 0.18s ease;
}

.map__photo--fallback {
  border-color: rgba(255, 255, 255, 0.8);
}

.map__marker:hover .map__photo {
  transform: scale(1.04);
}

.map__pin-line {
  width: 2px;
  height: 2.4rem;
  background: rgba(255, 255, 255, 0.9);
}

.map__pin-dot {
  width: 1rem;
  height: 1rem;
  border-radius: 50%;
  border: 2px solid rgba(255, 255, 255, 0.9);
}

.map__tip {
  position: absolute;
  z-index: 5;
  width: 28rem;
  display: flex;
  gap: 1.2rem;
  padding: 1.2rem;
  border-radius: 1.8rem;
  background: rgba(10, 15, 28, 0.92);
  border: 1px solid rgba(255, 255, 255, 0.12);
  backdrop-filter: blur(12px);
  transform: translate(1.2rem, calc(-100% - 1.2rem));
  transform-origin: left bottom;

  &::after {
    content: "";
    position: absolute;
    left: 1.4rem;
    bottom: -0.8rem;
    width: 1.4rem;
    height: 1.4rem;
    background: rgba(10, 15, 28, 0.92);
    border-right: 1px solid rgba(255, 255, 255, 0.12);
    border-bottom: 1px solid rgba(255, 255, 255, 0.12);
    transform: rotate(45deg);
  }

  img {
    width: 7.6rem;
    height: 7.6rem;
    border-radius: 1.6rem;
    object-fit: cover;
    border: 1px solid rgba(255, 255, 255, 0.12);
    background: rgba(255, 255, 255, 0.06);
    flex: 0 0 auto;
  }
}

.map__tip-content {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  min-width: 0;

  b {
    font-size: 1.4rem;
    line-height: 1.2;
    letter-spacing: 0.02rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}

.map__tip-country {
  color: var(--map-muted);
  font-size: 1.2rem;
}

.map__hint {
  padding: 1rem 1.4rem;
  border-radius: 1.6rem;
  border: 1px dashed rgba(255, 255, 255, 0.16);
  color: var(--map-muted);
  font-size: 1.2rem;
  background: rgba(255, 255, 255, 0.03);
  display: grid;
  gap: 0.4rem;

  code {
    color: rgba(255, 255, 255, 0.85);
  }
}

.map__hint-line {
  display: block;
}

:deep(.map__host svg) {
  width: 100%;
  height: 100%;
  display: block;
}

:deep(.map__host path) {
  fill: rgba(255, 255, 255, 0.08);
  stroke: rgba(255, 255, 255, 0.1);
  stroke-width: 0.7;
  transition: fill 0.15s ease, stroke 0.15s ease;
}

:deep(.map__host path:hover) {
  fill: rgba(255, 255, 255, 0.12);
  stroke: rgba(255, 255, 255, 0.18);
}

:deep(.map__host path.is-highlight) {
  fill: rgba(67, 108, 255, 0.35);
  stroke: rgba(67, 108, 255, 0.8);
}

@keyframes mapDash {
  to {
    stroke-dashoffset: -24;
  }
}

@keyframes mapPinPulse {
  0%,
  100% {
    transform: translate(-50%, -100%) scale(var(--pin-scale));
  }
  50% {
    transform: translate(-50%, -100%) scale(calc(var(--pin-scale) * 0.8));
  }
}

@media (prefers-reduced-motion: reduce) {
  .map__marker,
  .map__route {
    animation: none;
  }
}
</style>
