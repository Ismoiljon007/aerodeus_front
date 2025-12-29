<script setup lang="ts">
import AboutUsLeft from './aboutUsLeft.vue';
import AboutUsRight from './aboutUsRight.vue';

</script>

<template>
    <div class="about-us">
        <div class="container">
            <div class="about-us-wrapper">
                <AboutUsLeft/>
                <AboutUsRight/>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
    .about-us {
        padding: 80px 0;
        .about-us-wrapper {
            display: flex;
            align-items: center;
            gap: 16.5rem;
            @include respond(1200px) {
                flex-direction: column;
                gap: 50px;
            }
        }
    }
</style>