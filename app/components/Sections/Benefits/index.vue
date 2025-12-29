<template>
  <div class="benefits">
    <div class="container">
      <h2>Aerodeus Afzalliklari</h2>
      <div class="benefits-wrapper">
        <BenefitsCards />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import BenefitsCards from './benefitsCards.vue';
</script>

<style scoped lang="scss">
.benefits {
    position: relative;
    background-image: url('/images/jpg/benBg.jpg');
    padding: 9rem 0 13rem;
    margin-bottom: 5rem;
    &::before {
        content: "";
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 14rem;
        display: block;
       background: linear-gradient(0deg, #0E1530 0%, rgba(14, 21, 48, 0) 100%);
    }
    .benefits-wrapper {
        display: flex;
        flex-direction: column;
        gap: 5rem;
    }
    h2 {
      @include heading-1;
      margin-bottom: 4rem;
      text-align: center;
    }
}
</style>
