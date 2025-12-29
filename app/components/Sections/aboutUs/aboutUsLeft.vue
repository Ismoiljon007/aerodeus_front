<template>
  <div class="about-us-left">
    <div class="about-us-left-img-and-cards">
      <img
        class="about-us-main-img"
        src="/images/png/about-us-img.png"
        alt=""
      >
      <div class="about-us-cards-wrapper">
        <span class="about-us-line-dec"><img
          src="/images/png/about-us-line.png"
          alt=""
        ></span>
        <span class="samalet-line"><img
          src="/images/png/line-samalet.png"
          alt=""
        ></span>
        <UiCard
          v-for="item in 4"
          :key="item"
          class="about-us-card"
        >
          <h3>+3218</h3>
          <span>Mamnun mijozlar</span>
        </UiCard>
      </div>
    </div>
  </div>
</template>

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

        @include respond(885px) {
            display: none;
        }
        img {
            height: 100%;
        }
    }

    .samalet-line {
        position: absolute;
        right: -63px;
        top: 209px;

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
