<template>
  <section class="booking">
    <div class="container">
      <UiCard class="booking_card">
        <div class="booking_card-header">
          <p class="booking_title">
            Yo'nalishni tanlang
          </p>
          <div class="booking_card-btns">
            <UiButton
              variant="secondary"
              :class="{ active: tripType === 'one_way' }"
              @click="tripType = 'one_way'"
            >
              Faqat borish
            </UiButton>
            <UiButton
              variant="secondary"
              :class="{ active: tripType === 'round_trip' }"
              @click="tripType = 'round_trip'"
            >
              Borish-Kelish
            </UiButton>
          </div>
        </div>
        <div class="booking_card-fields">
          <div class="booking_field">
            <button
              class="booking_field-text"
              @click="toggleFromSelect"
            >
              <span class="booking_field-label">Borish manzili</span>
              <div
                class="booking_select-trigger"
                :class="{ open: isFromOpen }"
              >
                <span class="booking_select-value">
                  {{ fromLocation || 'Tanlang' }}
                </span>
              </div>
            </button>
            <span
              class="booking_field-icon"
              aria-hidden="true"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3 11.5L20.5 4L13 21.5L11 13L3 11.5Z"
                  stroke="currentColor"
                  stroke-width="1.5"
                  stroke-linejoin="round"
                />
                <path
                  d="M20.5 4L11 13"
                  stroke="currentColor"
                  stroke-width="1.5"
                  stroke-linecap="round"
                />
              </svg>
            </span>
            <transition name="booking_select-fade">
              <ul
                v-if="isFromOpen"
                class="booking_select-options glass-dark"
              >
                <li
                  v-for="location in locations"
                  :key="`from-${location}`"
                >
                  <button
                    type="button"
                    class="booking_select-option"
                    @click="selectFromLocation(location)"
                  >
                    {{ location }}
                  </button>
                </li>
              </ul>
            </transition>
          </div>
          <div class="booking_field">
            <button
              class="booking_field-text"
              @click="toggleToSelect"
            >
              <span class="booking_field-label">Kelish manzili</span>
              <div
                type="button"
                class="booking_select-trigger"
                :class="{ open: isToOpen }"
              >
                <span class="booking_select-value">
                  {{ toLocation || 'Tanlang' }}
                </span>
              </div>
            </button>
            <span
              class="booking_field-icon"
              aria-hidden="true"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3 11.5L20.5 4L13 21.5L11 13L3 11.5Z"
                  stroke="currentColor"
                  stroke-width="1.5"
                  stroke-linejoin="round"
                />
                <path
                  d="M20.5 4L11 13"
                  stroke="currentColor"
                  stroke-width="1.5"
                  stroke-linecap="round"
                />
              </svg>
            </span>
            <transition name="booking_select-fade">
              <ul
                v-if="isToOpen"
                class="booking_select-options glass-dark"
              >
                <li
                  v-for="location in locations"
                  :key="`to-${location}`"
                >
                  <button
                    type="button"
                    class="booking_select-option"
                    @click="selectToLocation(location)"
                  >
                    {{ location }}
                  </button>
                </li>
              </ul>
            </transition>
          </div>
          <label
            class="booking_field"
            type="button"
          >
            <span class="booking_field-text">
              <span class="booking_field-label">Uchish kun va soati</span>
              <input type="date">
            </span>
          </label>

          <!-- Counter qilingan Odam soni maydoni -->
          <div class="booking_field booking_field-counter">
            <span class="booking_field-text">
              <span class="booking_field-label">Odam soni</span>
              <span class="booking_field-value">{{ passengerCount }} kishi</span>
            </span>
            <div class="booking_counter">
              <button
                type="button"
                class="booking_counter-btn"
                :disabled="passengerCount <= 1"
                @click="decrementPassengers"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5 12H19"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                  />
                </svg>
              </button>
              <span class="booking_counter-value">{{ passengerCount }}</span>
              <button
                type="button"
                class="booking_counter-btn"
                :disabled="passengerCount >= 10"
                @click="incrementPassengers"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 5V19M5 12H19"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </UiCard>
    </div>
  </section>
</template>

<script setup lang="ts">
type TripType = 'one_way' | 'round_trip'

const tripType = ref<TripType>('one_way');
const passengerCount = ref<number>(1);
const locations = [
  'Toshkent',
  'Samarqand',
  'Buxoro',
  'Farg\'ona',
  'Andijon',
  'Navoiy',
  'Urganch',
  'Nukus',
];
const fromLocation = ref<string>('');
const toLocation = ref<string>('');

const isFromOpen = ref<boolean>(false);
const isToOpen = ref<boolean>(false);

function toggleFromSelect() {
  isFromOpen.value = !isFromOpen.value;
  if (isFromOpen.value) {
    isToOpen.value = false;
  }
}

function toggleToSelect() {
  isToOpen.value = !isToOpen.value;
  if (isToOpen.value) {
    isFromOpen.value = false;
  }
}

function selectFromLocation(location: string) {
  fromLocation.value = location;
  isFromOpen.value = false;
}

function selectToLocation(location: string) {
  toLocation.value = location;
  isToOpen.value = false;
}

function incrementPassengers() {
  if (passengerCount.value < 10) {
    passengerCount.value++;
  }
}

function decrementPassengers() {
  if (passengerCount.value > 1) {
    passengerCount.value--;
  }
}
</script>

<style scoped lang="scss">
.booking {
    transform: translateY(-50%);
    @include respond(1470px) {
      transform: translateY(0);
      padding: 10rem 0;
    }
    @include respond(540px) {
      padding: 5rem 0;
    }
    &_title {
        font-size: 2.4rem;
        line-height: 1;
        margin-right: 3rem;
    }
    &_card {
        &-header {
          display: flex;
          align-items: center;
          margin-bottom: 2.4rem;
          @include respond(540px) {
           flex-direction: column;
           align-items: flex-start;
           gap: 2.5rem;
          }
        }
        &-btns {
          display: flex;
          gap: 1.8rem;
          @include respond(540px) {
            width: 100%;
            button {
              width: 100%;
            }
          }
        }
        &-fields {
          display: flex;
          gap: 2.4rem;
          @include respond(1120px) {
            display: grid;
            grid-template-columns: 1fr 1fr;
          }
          @include respond(540px) {
            display: grid;
            grid-template-columns: 1fr;
          }
        }
    }
    &_field {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 0.2;
      padding: 1.2rem 1.6rem;
      border-radius: 1rem;
      border: 1px solid rgba($color: $color-white, $alpha: 0.2);
      background: $color-dark;
      color: inherit;
      cursor: pointer;
      text-align: left;

      &-counter {
        cursor: default;
      }

      position: relative;
    }
    &_field-text {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 0.4rem;
      width: 100%;
      background: none;
      border: none;
      input {
        background: none;
        border: none;
        width: 100%;
        color: $color-white;
        color-scheme: dark;
        font-size: 1.6rem;
        line-height: 1;
        padding: 0;
      }
    }
    &_select-trigger {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 0.8rem;
      background: transparent;
      border: none;
      color: $color-white;
      padding: 0;
      text-align: left;
      cursor: pointer;
      font-size: 1.6rem;
      line-height: 1;
    }
    &_select-value {
      font-size: 1.6rem;
      line-height: 1;
    }
    &_select-options {
      position: absolute;
      left: 0;
      right: 0;
      top: calc(100% + 0.8rem);
      z-index: 5;
      list-style: none;
      margin: 0;
      padding: 0.8rem;
      display: grid;
      gap: 0.4rem;
      max-height: 22rem;
      overflow-y: auto;
    }
    &_select-option {
      width: 100%;
      background: transparent;
      border: none;
      color: $color-white;
      padding: 0.8rem 1rem;
      border-radius: 0.8rem;
      text-align: left;
      cursor: pointer;
      transition: background 0.2s ease, transform 0.2s ease;

      &:hover {
        background: rgba(255, 255, 255, 0.08);
      }

      &:active {
        transform: scale(0.98);
      }
    }
    &_select-fade-enter-active,
    &_select-fade-leave-active {
      transition: opacity 0.15s ease, transform 0.15s ease;
    }
    &_select-fade-enter-from,
    &_select-fade-leave-to {
      opacity: 0;
      transform: translateY(-6px);
    }

    &_field-label {
      font-size: 1.4rem;
      color: rgba($color: $color-white, $alpha: 0.5);
      line-height: 1;
    }
    &_field-value {
      font-size: 1.6rem;
      line-height: 1;
    }
    &_field-icon {
      width: 2.4rem;
      height: 2.4rem;
      display: flex;
      align-items: center;
      justify-content: center;
      color: $color-white;
    }
    &_field-icon svg {
      width: 100%;
      height: 100%;
    }

    // Counter stillar
    &_counter {
      display: flex;
      align-items: center;
      gap: 1.2rem;

      &-btn {
        width: 3.2rem;
        height: 3.2rem;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 0.6rem;
        border: 1px solid rgba($color: $color-white, $alpha: 0.2);
        background: rgba($color: $color-white, $alpha: 0.05);
        color: $color-white;
        cursor: pointer;
        transition: all 0.2s ease;

        &:hover:not(:disabled) {
          background: rgba($color: $color-white, $alpha: 0.1);
          border-color: rgba($color: $color-white, $alpha: 0.3);
        }

        &:active:not(:disabled) {
          transform: scale(0.95);
        }

        &:disabled {
          opacity: 0.3;
          cursor: not-allowed;
        }

        svg {
          width: 1.6rem;
          height: 1.6rem;
        }
      }

      &-value {
        font-size: 1.6rem;
        font-weight: 600;
        min-width: 2.4rem;
        text-align: center;
      }
    }
}
</style>
