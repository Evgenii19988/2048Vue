<template>
  <div class="message win-message">
    <h2 class="win-message__title">С ПОБЕДОЙ!!!</h2>
    <div class="win-message__buttons">
      <button v-on:click="rebootGame" class="win-message__button">
        Заново
      </button>
      <button v-on:click="continueGame" class="win-message__button">
        Продолжить
      </button>
    </div>
    <div class="win-message__background"></div>
  </div>
</template>

<script>
export default {
  methods: {
    rebootGame() {
      this.$emit("reboot-game");
    },
    continueGame() {
      this.$emit("continue-game");
    },
  },
};
</script>

<style>
.win-message__title {
  margin: -6em 0 0 0;
  font-size: 5rem;
  color: #c3210f;
}

.win-message__background {
  background: url("/public/img/icons/beer.png") 50% 50% no-repeat;
  background-size: cover;
  position: absolute;
  opacity: 1;
  width: 100vw;
  height: 100vh;
  z-index: -1;
}

.win-message__buttons {
  display: flex;
  gap: 20px;
}

.win-message__button {
  color: #526f77;
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
}

.win-message__button:hover {
  background-position: 0 0;
  color: #fff;
}
</style>