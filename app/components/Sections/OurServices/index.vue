<template>
  <div class="our-services">
    <div class="container">
      <div class="our-services-wrapper">
        <h2 class="our-services-wrapper__title">
          Bizning xizmatlarimiz
        </h2>
        <p class="our-services-wrapper__sub-title">
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
        </p>

        <div class="images-and-texts-wrp">
          <OurServicesPhotos />
          <OurServicestexts />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import OurServicesPhotos from './ourServicesPhotos.vue';
import OurServicestexts from './ourServicestexts.vue';
</script>

<style scoped lang="scss">
.our-services {
    padding-bottom: 40px;
    .our-services-wrapper {
        @include respond(1200px) {
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: 20px 0;
        }

        &__title {
            @include heading-1;
           margin-bottom: 1.8rem;

        }

        &__sub-title {
            font-weight: 400;
            font-size: 18px;
            opacity: 0.7;

            @include respond(1200px) {
                text-align: center;
            }

            @include respond(750px) {
                font-size: 16px;
            }
        }

        .images-and-texts-wrp {
            display: flex;
            gap: 9rem;
            padding: 50px 0;
            @include respond(1270px) {
              gap: 50px;
            }

            @include respond(1270px) {
                padding: 20px;
            }

            @include respond(1200px) {
                flex-direction: column;
            }
        }
    }
}
</style>
