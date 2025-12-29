<template>
  <div class="about-us-right">
    <h2>Biz haqimizda</h2>
    <p>
      Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical
      Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at
      Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem
      Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable
      source. Lorem Ipsum comes from
    </p>
    <p>
      Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical
      Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at
      Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem
      Ipsum passage, and going through the cites of the word in classical l
    </p>
  </div>
</template>

<style scoped lang="scss">
.about-us-right {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 20px;

    p {
        opacity: 0.7;
    }

    @include respond(885px) {
        text-align: center;
    }
}
</style>
