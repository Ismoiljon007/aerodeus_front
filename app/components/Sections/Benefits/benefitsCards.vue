<template>
  <div class="benefits-cards-wrapper">
    <UiCard
      v-for="item in benifitsCards"
      :key="item"
      class="benefits-card"
    >
      <svg
        class="bef-card-icon"
        height="40"
        width="40"
      >

        <use :xlink:href="'/sprite.svg#' + `${item.iconId}`" />

      </svg>

      <h2>{{ item.title }}</h2>

      <p>
        {{ item.subtitle }}
      </p>
    </UiCard>
  </div>
</template>

<script setup>
const benifitsCards = [
  {
    title: 'Oliy darajadagi farovonlik',
    subtitle: 'Parvoz — bu zavq. Biz siz uchun charter parvozni yuqori darajadagi qulaylikni taqdim etamiz',
    iconId: 'i-geme',
  },
  {
    title: 'Ishonch, maxfiylik va himoya',
    subtitle: 'Aerodeus sizning maxfiyligingizni kafolatlaydi va barcha jihatlar bo‘yicha siz bilan hamkorlik qiladi',
    iconId: 'i-shield',
  },
  {
    title: 'Premium klassdagi yirik jetlar',
    subtitle: 'Bizning modellar 7–14 yo‘lovchi uchun qulaylikni ta’minlaydi',
    iconId: 'i-samalet',
  },
  {
    title: 'Dunyoning barcha nuqtalarida',
    subtitle: 'Qayerdan va qayerga uchishingiz muhim emas, biz sizni butun dunyo bo‘ylab mahalliy bilim ta’minlaymiz',
    iconId: 'i-globus',
  },
  {
    title: 'Yuqori malakali ekipaj',
    subtitle: 'Bizning ekipaj a’zolarimiz biznes-aviasiya sohasida ko‘p yillik tajribaga ega',
    iconId: 'i-pilot',
  },
  {
    title: 'Tezkor parvozlar, adolatli narxlar',
    subtitle: 'Aerodeus bilan xususiy jet terminaliga kirish, bojxona va immigratsiya formalitilaridan imkon qadar tez o‘tish',
    iconId: 'i-fast-flight',
  },

];
</script>

<style scoped lang="scss">
.benefits-cards-wrapper {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;

    @include respond(1100px) {
        grid-template-columns: repeat(2, 1fr);
        gap: 17px;
    }

    @include respond(650px) {
        grid-template-columns: 1fr;
    }

    .benefits-card {
        display: flex;
        flex-direction: column;
        gap: 13px;

        h2 {
            font-weight: 500;
            font-size: 24px;
        }

        p {
            font-weight: 400;
            font-size: 16px;
            color: $color-white;
            opacity: 0.7;
        }
    }
}
</style>
