<template>
  <div class="our-services-photos-wrapper">
    <div class="first-images">
      <NuxtImg
        src="/images/png/o-services-img-1.png"
        alt="Our Service Main"
        format="webp"
        quality="80"
        loading="lazy"
      />
    </div>

    <div class="duble-img">
      <NuxtImg
        src="/images/png/o-services-img-2.png"
        alt="Our Service Detail 1"
        format="webp"
        quality="80"
        loading="lazy"
      />
      <NuxtImg
        src="/images/png/o-services-img-3.png"
        alt="Our Service Detail 2"
        format="webp"
        quality="80"
        loading="lazy"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
.our-services-photos-wrapper {
    display: flex;
    align-items: stretch;
    gap: 30px;
    width: 50%;

    @include respond(1200px) {
      width: 100%;
    }

    .first-images {
        flex: 1.5;

        img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            border-radius: 8px;
        }
    }

    .duble-img {
        flex: 1.5;
        display: flex;
        flex-direction: column;
        gap: 30px;

        @include respond(630px) {
            gap: 10px;
        }

        img {
            width: 100%;
            height: calc(50% - 15px);
            object-fit: cover;
            border-radius: 8px;

            @include respond(630px) {
                height: calc(50% - 5px);
            }
        }
    }
}
</style>
