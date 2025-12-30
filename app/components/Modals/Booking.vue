<template>
  <Teleport to="body">
    <Transition name="modal">
      <div
        v-if="modelValue"
        class="modal-overlay"
        @click="closeModal"
      >
        <div
          class="booking-modal"
          @click.stop
        >
          <button
            class="close-btn"
            @click="closeModal"
          >
            <IconsClose />
          </button>

          <div class="modal-header">
            <h2 class="modal-title">
              {{ $t('modal.booking.title') }}
            </h2>
            <p class="modal-subtitle">
              {{ $t('modal.booking.subtitle') }}
            </p>
          </div>

          <div class="route-info">
            <div class="route-item">
              <div class="route-icon">
                <IconsPilot1 />
                <span class="route-label">{{ $t('modal.booking.departure') }}</span>
              </div>
              <div class="route-details">
                <span class="route-location">{{ $t('modal.booking.departureLocation') }}</span>
              </div>
            </div>

            <div class="route-arrow">
              <IconsArrow />
            </div>

            <div class="route-item">
              <div class="route-icon">
                <IconsPilot2 />
                <span class="route-label">{{ $t('modal.booking.arrival') }}</span>
              </div>
              <div class="route-details">
                <span class="route-location">{{ $t('modal.booking.arrivalLocation') }}</span>
              </div>
            </div>
          </div>

          <div class="divider" />

          <form
            class="booking-form"
            @submit.prevent="handleSubmit"
          >
            <div class="form-group">
              <label
                for="name"
                class="form-label"
              >{{ $t('modal.form.name') }}</label>
              <input
                id="name"
                v-model="formData.name"
                type="text"
                class="form-input"
                :placeholder="$t('modal.form.placeholder')"
                required
              >
            </div>

            <div class="form-group">
              <label
                for="phone"
                class="form-label"
              >{{ $t('modal.form.phone') }}</label>
              <input
                id="phone"
                v-model="formData.phone"
                type="tel"
                class="form-input"
                :placeholder="$t('modal.form.placeholder')"
                required
              >
            </div>

            <div class="form-group">
              <label
                for="note"
                class="form-label"
              >{{ $t('modal.form.note') }}</label>
              <textarea
                id="note"
                v-model="formData.note"
                class="form-input form-textarea"
                :placeholder="$t('modal.form.placeholder')"
                rows="3"
              />
            </div>

            <UiButton type="submit">
              {{ $t('modal.form.submit') }}
            </UiButton>
          </form>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
interface FormData {
  name: string
  phone: string
  note: string
}

interface Props {
  modelValue: boolean
}

interface Emits {
  (e: 'update:modelValue', value: boolean): void
  (e: 'submit', data: FormData): void
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

const formData = ref<FormData>({
  name: '',
  phone: '',
  note: '',
});

function closeModal() {
  emit('update:modelValue', false);
}

async function handleSubmit() {
  emit('submit', formData.value);
  closeModal();
}
</script>

<style scoped lang="scss">
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #000000B2;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 99;
  padding: 30px;
}

.booking-modal {
  position: relative;
  background: #1D243D;
  border-radius: 12px;
  width: 100%;
  max-width: 472px;
  max-height: 90vh;
  overflow-y: auto;
  padding: 30px;
  border: 1px solid #FFFFFF1A;

  @media (max-width: 640px) {
    padding: 24px;
    max-height: 95vh;
  }
}

.close-btn {
  position: absolute;
  top: 12px;
  right: 12px;
  border: none;
  cursor: pointer;
  padding: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
  background: #FFFFFF1A;
  border-radius: 50%;
}

.modal-header {
  margin-bottom: 12px;
}

.modal-title {
  font-size: 28px;
  font-weight: 500;

  @media (max-width: 640px) {
    font-size: 20px;
  }
}

.modal-subtitle {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.7);
  max-width: 90%;
  margin: 0;
  line-height: 1.5;
}

.route-info {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
}

.route-icon {
  display: flex;
  gap: 10px;
}

.route-item {
  gap: 12px;
}

.route-details {
  display: flex;
  flex-direction: column;
  gap: 4px;
  min-width: 0;
}

.route-label {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.5);
}

.route-location {
  font-size: 16px;
  font-weight: 500;
  color: #ffffff;
}

.booking-form {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.form-label {
  font-size: 14px;
}

.form-input {
  width: 100%;
  padding: 12px 16px;
  background: #040A2480;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  color: #ffffff;
  font-size: 14px;
  transition: all 0.2s;

  &::placeholder {
    color: rgba(255, 255, 255, 0.3);
  }

  &:focus {
    outline: none;
    border-color: #3b82f6;
    background: rgba(255, 255, 255, 0.08);
  }

  &.form-textarea {
    resize: vertical;
    min-height: 80px;
    font-family: inherit;
  }
}

.submit-btn {
  width: 100%;
  padding: 14px 24px;
  background: #3b82f6;
  color: #ffffff;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;

  &:hover:not(:disabled) {
    background: #2563eb;
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(59, 130, 246, 0.4);
  }

  &:active:not(:disabled) {
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
}

.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;

  .booking-modal {
    transition: transform 0.3s ease;
  }
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;

  .booking-modal {
    transform: scale(0.9) translateY(20px);
  }
}

.divider{
  margin: 24px auto;
  border: 1px solid;
  border-image-source: linear-gradient(90deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.5) 48.08%, rgba(255, 255, 255, 0) 100%);
  border-image-slice: 1;
  width: 100%;
  height: 0;
}
</style>
