<template>
  <header class="site-footer">
    <div class="container">
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
      <div class="site-footer_center">
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
        <small>{{ new Date().getFullYear() }} © Aerodeus of flights on private VIP class aircrafts</small>
      </div>
      <div class="site-footer_social">
        <a href="#">
          <svg
            height="25"
            width="25"
          >
            <use xlink:href="/sprite.svg#i-whatsapp" />
          </svg>
        </a>
        <a href="#">
          <svg
            height="25"
            width="25"
          >
            <use xlink:href="/sprite.svg#i-instagram" />
          </svg>
        </a>
        <a href="#">
          <svg
            height="25"
            width="25"
          >
            <use xlink:href="/sprite.svg#i-telegram" />
          </svg>
        </a>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
const localePath = useLocalePath();
</script>

<style scoped lang="scss">
.site-footer {
  padding: 3rem 0;
  background: rgba($color: $color-white, $alpha: 0.04);
  .container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 4rem;
    @include respond(980px) {
      flex-direction: column;
      gap: 3rem;
    }
  }

  &_center {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2.3rem;
    @include respond(980px) {
      order: 3;
    }
  }
  .site-logo {
    display: flex;
     @include respond(980px) {
      order: 1;
    }
    svg {
      width: 14rem;
      height: 8rem;
    }
  }
  .sitenav {
     @include respond(980px) {
      display: none;
    }
    ul {
      display: flex;
      align-items: center;
      list-style: none;
      gap: 6rem;
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
  }
  small {
    font-size: 14px;
    color: rgba($color: $color-white, $alpha: 0.5);
    text-align: center;
  }
  .site-footer_social {
    display: flex;
    align-items: center;
    gap: 1.8rem;
    @include respond(980px) {
      order: 2;
    }
    a {
      display: flex;
      align-items: center;
      justify-content: center;
      text-decoration: none;
      svg {
        width: 2.5rem;
        height: 2.5rem;
      }
      width: 5rem;
      height: 5rem;
      border-radius: 50%;
      background: rgba($color: $color-white, $alpha: 0.1);
    }
  }

}
</style>
