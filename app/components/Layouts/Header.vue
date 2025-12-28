<template>
  <header class="site-header">
    <div class="container">
      <div class="lang">
        <button class="lang_button">
          <svg
            height="24"
            width="24"
          >
            <use xlink:href="/sprite.svg#i-globe" />
          </svg>
          <span>{{ locale }}</span>
        </button>
        <div
          v-if="openLang"
          class="lang_list"
        >
          <NuxtLink
            v-for="locale in availableLocales"
            :key="locale.code"
            :to="switchLocalePath(locale.code)"
          >
            {{ locale.name }}
          </NuxtLink>
        </div>
      </div>
      <div class="site-header_center">
        <nav class="sitenav">
          <ul>
            <li>
              <NuxtLink :to="localePath('/')">
                Bizning xizmatlar
              </NuxtLink>
            </li>
            <li>
              <NuxtLink :to="localePath('/')">
                Bizning Afzalliklar
              </NuxtLink>
            </li>
          </ul>
        </nav>
        <NuxtLink
          class="site-logo"
          to="/"
        >
          <svg
            height="80"
            width="133"
          >
            <use xlink:href="/sprite.svg#i-logo" />
          </svg>
        </NuxtLink>
        <nav class="sitenav">
          <ul>
            <li>
              <NuxtLink :to="localePath('/')">
                Flot
              </NuxtLink>
            </li>
            <li>
              <NuxtLink :to="localePath('/')">
                Biz qanday ishlaymiz?
              </NuxtLink>
            </li>
          </ul>
        </nav>
      </div>
      <UiButton
        variant="secondary"
        class="site-header_button"
      >
        Biz bilan aloqa
      </UiButton>
      <button
        class="site-header_menu"
        @click="emit('toggle-menu')"
      >
        <svg
          height="24"
          width="24"
        >
          <use xlink:href="/sprite.svg#i-menu" />
        </svg>
      </button>
    </div>
  </header>
</template>

<script setup lang="ts">
const emit = defineEmits<{
  (e: 'toggle-menu'): void
}>();
const { locale, locales } = useI18n();
const localePath = useLocalePath();
const switchLocalePath = useSwitchLocalePath();
const availableLocales = computed(() => {
  return locales.value.filter(i => i.code !== locale.value);
});
const openLang = ref<boolean>(false);
</script>

<style scoped lang="scss">
.site-header {
  padding: 2rem 0 0;
  background: $color-bg;
  @include respond(540px) {
    padding-top: 0;
  }
  .container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 4rem;
  }
  &_menu {
    display: none;
    background: none;
    cursor: pointer;
    border: none;
    color: $color-white;
    svg {
      width: 24px;
      height: 24px;
    }
    @include respond(1220px) {
      display: flex;
    }
  }
  &_center {
    display: flex;
    align-items: center;
    gap: 7rem;
  }
  .site-logo {
    display: flex;
    svg {
      width: 14rem;
      height: 8rem;
    }
  }
  .sitenav {
    ul {
      display: flex;
      align-items: center;
      list-style: none;
      gap: 7rem;
      a {
        text-decoration: none;
        position: relative;

        &::after {
            content: '';
            position: absolute;
            left: 0;
            bottom: -0.5rem;
            width: 100%;
            height: 2px;
            background: $color-white;
            transform: scaleX(0);
            transform-origin: right;
            transition: transform 0.3s ease;
        }
        &:hover::after {
            transform: scaleX(1);
            transform-origin: left;
        }
      }
    }
    @include respond(1220px) {
      display: none;
    }
  }
  &_button {
    @include respond(1220px) {
      display: none;
    }
  }
}
.lang {
  position: relative;
  &_button {
    display: flex;
    align-items: center;
    gap: 1rem;
    background: none;
    cursor: pointer;
    border: none;
    color: $color-white;
    font-size: 1.8rem;
  }
}
</style>
