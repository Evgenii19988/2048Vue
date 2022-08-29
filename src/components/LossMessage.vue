<template>
  <div class="message loss-message">
    <h2 class="loss-message__title">ВЫ ПРОИГРАЛИ(</h2>
    <div class="loss-message__buttons">
      <button
        v-on:click="rebootGame()"
        class="loss-message__button button-again"
      >
        Заново
      </button>
    </div>
    <div class="loss-message__background"></div>
  </div>
</template>

<script>
export default {
  methods: {
    rebootGame() {
      this.$emit("reboot-game");
    },
  },
};
</script>

<style>
.loss-message__title {
  font-size: 5rem;
  color: #c3210f;
}

.loss-message__background {
  background: url("/public/img/icons/sadCat.jpg") 50% 50% no-repeat;
  background-size: cover;
  position: absolute;
  opacity: 1;
  width: 100vw;
  height: 100vh;
  z-index: -1;
}
.loss-message__button {
  color: #c3210f;
  padding: 10px 40px;
  text-decoration: none;
  text-align: center;
  margin: 20px auto;
  display: block;
  background-image: linear-gradient(
    to left,
    transparent,
    transparent 50%,
    #c3210f 50%,
    #c3210f
  );
  background-position: 100% 0;
  background-size: 200% 100%;

  font: 400 18px tahoma;
  border: 1px solid #43444e;
  border-radius: 0.5rem;
  transition-duration: 0.5s;
}
.loss-message__button:hover {
  background-position: 0 0;
  color: #fff;
  transition-duration: 0.5s;
}
</style>
