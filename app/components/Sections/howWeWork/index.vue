<template>
  <div class="how-we-work">
    <div class="container">
      <div class="how-we-work-wrapper">
        <div class="how-we-wrok-text-wrapper">
          <h2>{{ howWeWork?.data?.title || $t('sections.howWeWork.title') }}</h2>
          <span>{{ howWeWork?.data?.subtitle || $t('sections.howWeWork.subtitle') }}</span>
        </div>

        <HowWeWorkCards :steps="howWeWorkSteps" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import HowWeWorkCards from './howWeWorkCards.vue';

defineProps<{
  howWeWork?: any
  howWeWorkSteps?: any[]
}>();
</script>

<style scoped lang="scss">
.how-we-work {
    padding: 20px 0;
}

.how-we-wrok-text-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;

    h2 {
        font-weight: 500;
        font-size: 42px;
    }

    span {
        font-weight: 400;
        font-size: 17px;
        opacity: 0.7;
    }

    @include respond(700px) {
        h2 {
            font-size: 30px;
        }
        span {
            font-size: 14px;
        }
    }
}
</style>
