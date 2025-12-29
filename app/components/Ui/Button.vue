<template>
  <button
    class="btn"
    :class="[variantClass, iconClass]"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  variant?: 'primary' | 'secondary'
  icon?: boolean | 'rounded'
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  icon: false,
});

const variantClass = computed(() => `btn--${props.variant}`);

const iconClass = computed(() => {
  if (props.icon === true) {
    return 'btn--icon-rounded';
  } else if (props.icon === 'rounded') {
    return 'btn--icon-rounded';
  }
  return '';
});
</script>

<style scoped lang="scss">
.btn {
  padding: 1.4rem 2.4rem;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  gap: 1rem;
  font-weight: 400;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 1.6rem;
  &--primary {
    background: $color-primary;
    color: $color-white;

    &:hover {
      opacity: 0.9;
    }
  }

  &--secondary {
    background: rgba($color: $color-white, $alpha: 0.1);
    color: $color-white;

    &:hover {
      background: rgba($color: $color-white, $alpha: 0.15);
    }
  }

  &--icon-rounded {
    padding: 1.45rem;
    border-radius: 50%;
    aspect-ratio: 1;
    width: fit-content;
    height: fit-content;
  }

  &:active {
    transform: scale(0.98);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  &.active {
    background: $color-white;
    color: #000;
  }
}
</style>
