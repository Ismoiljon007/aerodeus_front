<template>
  <div class="menu">
    <div class="menu_header">
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
      <UiButton
        variant="secondary"
        icon="rounded"
        @click="emit('close')"
      >
        <svg
          height="24"
          width="24"
        >
          <use xlink:href="/sprite.svg#i-close" />
        </svg>
      </UiButton>
    </div>
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
    <UiButton
      variant="secondary"
      class="menu_button"
    >
      Biz bilan aloqa
    </UiButton>
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits<{
  (e: 'close'): void
}>();
const localePath = useLocalePath();
</script>

<style scoped lang="scss">
.menu {
    z-index: 20;
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
    background: $color-dark2;
    padding: 1rem 2rem 2rem;
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 480px;
    &_header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 4rem;
        button {
            width: 3.5rem;
            height: 3.5rem;
            svg {
                width: 2.6rem;
                height: 2.6rem;
                flex-shrink: 0;
            }
        }
    }
    .site-logo {
        display: flex;
        svg {
         width: 12rem;
         height: auto;
        }
    }
    .sitenav {
        ul {
            display: flex;
            flex-direction: column;
            list-style: none;
            gap: 3.5rem;
            a {
                text-decoration: none;
                font-family: 1.8rem;
            }
        }
        margin-bottom: auto;
    }
}
</style>
