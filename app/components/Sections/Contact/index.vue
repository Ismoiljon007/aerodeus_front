<template>
  <section class="contact-section">
    <div class="container">
      <UiCard class="contact-section__content">
        <div class="contact-section__header">
          <h2 class="contact-section__title">
            Biz bilan aloqa
          </h2>
          <p class="contact-section__subtitle">
            Ma'lumotlarni qoldiring va biz imkon qadar tezroq siz bilan bog'lanamiz
          </p>
        </div>

        <form
          class="contact-form"
          @submit.prevent="handleSubmit"
        >
          <div class="contact-form__fields">
           <div class="contact-form__left">
             <div class="contact-form__field">
              <label
                class="contact-form__label"
                for="name"
              >Ism</label>
              <input
                id="name"
                v-model="formData.name"
                type="text"
                class="contact-form__input"
                placeholder="Yozilsin..."
                required
              >
            </div>

            <div class="contact-form__field">
              <label
                class="contact-form__label"
                for="phone"
              >Telefon raqam</label>
              <input
                id="phone"
                v-model="formData.phone"
                type="tel"
                class="contact-form__input"
                placeholder="Yozilsin..."
                required
              >
            </div>
           </div>

            <div class="contact-form__right">
              <div class="contact-form__field">
              <label
                class="contact-form__label"
                for="email"
              >
                Qayga izoh (majburiy emas)
              </label>
              <input
                id="email"
                v-model="formData.message"
                type="text"
                class="contact-form__input"
                placeholder="Yozilsin..."
              >
            </div>
            <UiButton
              variant="primary"
              class="contact-form__submit"
            >
              Yuborish
            </UiButton>
            </div>
          </div>
        </form>

        <div class="contact-divider"></div>

        <div class="contact-info">
          <div class="contact-info__item">
            <div class="contact-info__icon contact-info__icon--location">
             <IconsLocation/>
            </div>
            <div class="contact-info__content">
              <p class="contact-info__label">
                Manzil
              </p>
              <p class="contact-info__value">
                Tashkent, Uzbekistan TSUM,<br>
                Chimkentskaya 1, office of Jets One Ai
              </p>
            </div>
          </div>

          <div class="contact-info__item">
            <div class="contact-info__icon contact-info__icon--phone">
              <IconsPhone/>
            </div>
            <div class="contact-info__content">
              <p class="contact-info__label">
                Bizning kontaktlar
              </p>
              <p class="contact-info__value">
                +998 33 850 22 22
              </p>
            </div>
          </div>

          <div class="contact-info__item">
            <div class="contact-info__icon contact-info__icon--email">
             <IconsEmail/>
            </div>
            <div class="contact-info__content">
              <p class="contact-info__label">
                Elektron pochta
              </p>
              <p class="contact-info__value">
                info@jetsoneair.com
              </p>
            </div>
          </div>
        </div>
      </UiCard>
    </div>
  </section>
</template>

<script setup lang="ts">
interface FormData {
  name: string
  phone: string
  message: string
}

const formData = ref<FormData>({
  name: '',
  phone: '',
  message: '',
});

function handleSubmit() {
  console.log('Form submitted:', formData.value);
}
</script>

<style lang="scss" scoped>
.contact-section {
  padding: 56px 0;
  margin-bottom: 100px;
  @media (max-width: 768px) {
    padding: 38px;
    margin-bottom: 30px;
  }
  
  &__content {
    padding: 50px;
    @media (max-width: 768px) {
    padding: 18px;
    }
  }
  &__header{
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }
  &__title{
    font-size: 42px;
    line-height: 100%;
    font-weight: 500;
    text-align: center;
    @media (max-width: 768px) {
    font-size: 24px;
  }
  }
  &__subtitle{
    font-size: 20px;
    margin-top: 18px;
    line-height: 150%;
    opacity: 0.7;
    font-weight: normal;
    text-align: center;
    @media (max-width: 768px) {
    font-size: 16px;
  }}
}

.contact-form {
  margin-top: 40px;
  @media (max-width: 768px) {
    margin-top: 24px;
  }
  &__fields {
    display: grid;
    grid-template-columns: repeat(2, 1fr) auto;
    gap: 16px;
    align-items: end;
    @media (max-width: 1024px) {
      grid-template-columns: repeat(1, 1fr);
    }
  }
  &__left{
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
    @media (max-width: 768px) {
      grid-template-columns: repeat(1, 1fr);
    }
  }
  &__right{
    display: flex;
    gap: 16px;
    align-items: end;
    @media (max-width: 1024px) {
      flex-direction: column;
      align-items: stretch;
  }
  }
  &__field{
    display: flex;
    flex-direction: column;
    gap: 8px;
    width: 100%;
  }
  &__label{
    font-size: 14px;
    line-height: 100%;
  }
  &__input{
    border: 1px solid #FFFFFF33;
    padding: 14px 16px;
    background: #040A2480;
    border-radius: 10px;
    width: 100%;
  }
}

.contact-divider{
  margin: 40px auto;
  border: 1px solid;
  border-image-source: linear-gradient(90deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.5) 48.08%, rgba(255, 255, 255, 0) 100%);
  border-image-slice: 1;
  width: 100%;
  height: 0; 
  @media (max-width: 768px) {
    margin: 24px auto;
  }
}

// Contact Info
.contact-info {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 80px;

  @media (max-width: 1220px) {
    gap: 20px;
  }
  @media (max-width: 1024px) {
    flex-wrap: wrap;
  }

  @media (max-width: 1024px) {
    justify-content: flex-start;
  }

  &__item {
    display: flex;
    gap: 24px;
    align-items: center;
  }

  &__icon {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s ease;
    border: 1px solid #FFFFFF33;
    @media (max-width: 1220px) {
      width: 60px;
      height: 60px;
      svg{
        width: 30px;
        height: 30px;
      }
    }
    @media (max-width: 768px) {
      width: 40px;
      height: 40px;
      border: none;
    }
  }

  &__content {
    flex: 1;
  }

  &__label {
    color: #FFFFFFB2;
    line-height: 100%;
  }

  &__value {
    font-size: 18px;
    font-weight: 500;
    line-height: 140%;
    margin-top: 10px;
  }
}
</style>
