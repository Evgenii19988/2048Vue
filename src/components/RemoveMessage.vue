<template>
  <div class="message remove-message">
    <h2 class="remove-message__title">
      Вы уверены, что хотите начать новую игру?
    </h2>
    <div class="remove-message__buttons">
      <button v-on:click="rebootGame" class="remove-message__button">Да</button>
      <button v-on:click="continueGame" class="remove-message__button">
        Нет
      </button>
    </div>
    <div class="remove-message__background"></div>
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
.remove-message__title {
  font-family: "DM Sans", sans-serif;
}
.remove-message__buttons {
  display: flex;
  gap: 20px;
}
.remove-message__button {
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
    #526f77 50%,
    #526f77
  );
  background-position: 100% 0;
  background-size: 200% 100%;

  font: 400 18px tahoma;
  border: 1px solid #43444e;
}
.remove-message__button:hover {
  background-position: 0 0;
  color: #fff;
}

.remove-message__background {
  position: absolute;
  background-color: #9e9d9d;
  opacity: 0.6;
  width: 100vw;
  height: 100vh;
  z-index: -1;
}
</style>