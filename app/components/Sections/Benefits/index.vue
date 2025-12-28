<script setup lang="ts">
import BenefitsCards from './benefitsCards.vue';

</script>

<template>
    <div class="benefits">
        <div class="container">
            <div class="benefits-wrapper">
                <h2>Aerodeus Afzalliklari</h2>
                <BenefitsCards />
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.benefits {
    background-image: url('../../../assets/images/jpg/benBg.jpg');
    padding: 90px 0;
    .benefits-wrapper {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 25px;
        h2 {
            font-weight: 500;
            font-size: 40px;
        }
    }
}
</style>