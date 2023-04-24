<template>
  <div class="password-checker">
    <label for="password">{{ $t("enterPassword") }}</label>
    <input
      id="password"
      type="password"
      v-model="enteredPassword"
    />
    <button @click="checkPassword">{{ $t("submit") }}</button>
    <p v-if="passwordCheckResult" class="result">{{ passwordCheckResult }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      enteredPassword: "",
      passwordCheckResult: "",
    };
  },
  methods: {
    checkPassword() {
      const savedPassword = localStorage.getItem("savedPassword");
      if (!savedPassword) {
        this.passwordCheckResult = this.$t("noSavedPassword");
        return;
      }

      if (this.enteredPassword === savedPassword) {
        this.passwordCheckResult = this.$t("passwordMatch");
      } else {
        this.passwordCheckResult = this.$t("passwordMismatch");
      }
    },
  },
};
</script>

<style scoped>
.password-checker {
  display: flex;
  flex-direction: column;
}

label {
  font-size: 18px;
  display: block;
  margin-bottom: 10px;
}

input {
  width: 100%;
  padding: 10px 15px;
  font-size: 16px;
  border-radius: 5px;
  border: 1px solid #ccc;
  margin-bottom: 20px;
  box-sizing: border-box;
}

.result {
  font-size: 16px;
  margin-top: 20px;
}
</style>
