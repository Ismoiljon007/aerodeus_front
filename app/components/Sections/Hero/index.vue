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
        <h2 class="hero_title">
          Oliy darajadagi xizmat
        </h2>
        <p class="hero_desc">
          Premium xususiy samolyotlar bilan mutlaq qulaylik va nufuz
        </p>
        <UiButton class="hero_button">
          Bizning servislar
        </UiButton>
      </div>
      <NuxtImg
        width="1105"
        height="467"
        src="/images/png/plane.png"
        class="hero_img"
      />
    </div>
  </section>
</template>

<script setup lang="ts">

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
@keyframes plane {
  0% {
    transform: scale(0.7) translateY(20px);
  }
  100% {
    transform: scale(1) translateY(0);
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
  }
  .container {
    position: absolute;
    top: 5.5rem;
    left: 50%;
    transform: translateX(-50%);
    z-index: 1;
    display: flex;
    justify-content: center;
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
    animation: plane 3s ease forwards;
    object-fit: contain;
    @include respond(1470px) {
      width: 90rem;
    }
  }
}
</style>
