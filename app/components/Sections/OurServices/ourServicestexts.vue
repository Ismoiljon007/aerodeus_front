<template>
  <div class="our-service-txt">
    <div class="our-services-texts">
      <h2>Charter Flights</h2>

      <p>
        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
        industry's when an unknown printer took a galley of type and scrambled it to make
      </p>

      <UiButton>Band qilish</UiButton>

      <div class="our-services-texts-bottom">
        <div class="our-services-bottom-item">
          <svg
            height="25"
            width="25"
          >

            <use xlink:href="/sprite.svg#i-check" />

          </svg>
          <span>Certified according to Part 135</span>
        </div>

        <div class="our-services-bottom-item">
          <svg
            height="25"
            width="25"
          >

            <use xlink:href="/sprite.svg#i-check" />

          </svg>
          <span>Certified according to Part 135</span>
        </div>

        <div class="our-services-bottom-item">
          <svg
            height="25"
            width="25"
          >

            <use xlink:href="/sprite.svg#i-check" />

          </svg>
          <span>Certified according to Part 135</span>
        </div>

        <div class="our-services-bottom-item">
          <svg
            height="25"
            width="25"
          >

            <use xlink:href="/sprite.svg#i-check" />

          </svg>
          <span>Certified according to Part 135</span>
        </div>

        <div class="our-services-bottom-item">
          <svg
            height="25"
            width="25"
          >

            <use xlink:href="/sprite.svg#i-check" />

          </svg>
          <span>Certified according to Part 135</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
  .our-service-txt {
    height: 100%;
    width: 50%;
    @media (max-width: 1200px) {
      width: 100%;
    }
  }

  .our-services-texts {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    position: relative;
    height: 100%;

    h2 {
      font-weight: 500;
      font-size: 3.2rem;
    }

    p {
      font-weight: 400;
      width: 100%;
      max-width: 543px;
      opacity: 0.7;
      margin-bottom: 2rem;
    }
    button {
      @media (max-width: 1200px) {
        order: 4;
      }
    }
    .our-services-texts-bottom {
      display: flex;
      flex-direction: column;
      gap: 15px;

      .our-services-bottom-item {
        display: flex;
        align-items: center;
        gap: 13px;
        opacity: 0.7;
      }
      @media (max-width: 1200px) {
        order: 3;
      }
    }
  }
</style>
