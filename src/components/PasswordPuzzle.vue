<template>
  <div class="container">
    <label for="password">{{ $t("password") }}</label>
    <input
      id="password"
      :type="inputType"
      v-model="password"
      @keyup="checkPasswordStrength"
      @keydown="checkCapsLock($event)"
    />
    <div v-if="capsLock" class="caps-lock-warning">
      {{ $t("capsLockWarning") }}
    </div>
    <button @click="toggleShowPassword">{{ showPasswordText }}</button>

    <div
      id="password-strength-label"
      class="meter-text"
      role="status"
      aria-live="polite"
    >
      {{ $t(`passwordStrength.${strengthText}`) }}
    </div>
    <div id="password-strength-description" class="sr-only">
      The password strength is {{ strengthText }}. Use a combination of upper
      and lowercase letters, numbers, and special characters to create a
      password that is easy to remember but hard to hack. Consider using a
      passphrase instead of a single word.
    </div>
    <div class="password-strength-meter" aria-hidden="true">
      <div
        class="meter"
        :class="meterClass"
        :style="{ width: strength + '%' }"
      ></div>
    </div>
    <div class="common-password-warning" v-if="isCommonPassword">
      <p v-html="$t('commonPasswordWarning')"></p>
    </div>
    <div class="password-break-time">
      <p
        v-html="
          $t('passwordBreakTime', {
            bruteForceTimeText:
              bruteForceTimeObject.timeValue +
              ' ' +
              $t('timeUnits.' + bruteForceTimeObject.timeUnit),
          })
        "
      ></p>
    </div>
    <button v-if="isStrong" @click="savePassword">
      {{ $t("savePassword") }}
    </button>
    <div aria-live="polite" class="password-saved-message" v-if="passwordSaved">
      <p>{{ $t("passwordSaved") }}</p>
    </div>
    <div class="password-hint">
      <p v-html="$t('passwordHint')"></p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      password: "",
      strength: 0,
      bruteForceTimeText: "N/A",
      isCommonPassword: false,
      passwordSaved: false,
      inputType: "password",
      capsLock: false,
      showPasswordText: this.$t("showPassword"),
    };
  },
  computed: {
    meterClass() {
      if (this.strength < 25) {
        return "weak";
      } else if (this.strength < 50) {
        return "medium";
      } else if (this.strength < 75) {
        return "strong";
      } else {
        return "very-strong";
      }
    },
    strengthText() {
      if (this.strength < 25) {
        return "Weak";
      } else if (this.strength < 50) {
        return "Medium";
      } else if (this.strength < 75) {
        return "Strong";
      } else {
        return "VeryStrong";
      }
    },
    isStrong() {
      return this.strength >= 75;
    },
    bruteForceTimeObject() {
      return calculateBruteForceTime(this.password, this.strength);
    },
  },
  methods: {
    toggleShowPassword() {
      if (this.inputType === "password") {
        this.inputType = "text";
        this.showPasswordText = this.$t("hidePassword");
      } else {
        this.inputType = "password";
        this.showPasswordText = this.$t("showPassword");
      }
    },
    checkCapsLock(event) {
      this.capsLock = event.getModifierState("CapsLock");
    },
    checkPasswordStrength() {
      let password = this.password;
      this.strength = this.getPasswordStrength(password);
      this.bruteForceTimeText = calculateBruteForceTime(
        password,
        this.strength
      );
    },
    hasRepeatedCharacters(password) {
      return /^(.)\1*$/.test(password);
    },
    savePassword() {
      localStorage.setItem("savedPassword", this.password);
      this.passwordSaved = true;
      setTimeout(() => {
        this.passwordSaved = false;
      }, 3000);
    },
    getPasswordStrength(password) {
      let passwordLength = password.length;
      let hasUpperCase = /[A-Z]/.test(password);
      let hasLowerCase = /[a-z]/.test(password);
      let hasNumbers = /\d/.test(password);
      let hasNonalphas = /\W/.test(password);
      let strength = 0;

      if (passwordLength >= 8 && passwordLength <= 12) {
        strength += 10;
      } else if (passwordLength > 12 && passwordLength <= 16) {
        strength += 20;
      } else if (passwordLength > 16) {
        strength += 30;
      }

      if (hasUpperCase && hasLowerCase) {
        strength += 20;
      }

      if (hasNumbers) {
        strength += 20;
      }

      if (hasNonalphas) {
        strength += 30;
      }

      this.isCommonPassword =
        this.checkIfCommonPassword(password) ||
        this.hasRepeatedCharacters(password);
      if (this.isCommonPassword) {
        strength = 0;
      }

      // Return a low value if the password doesn't have at least one uppercase letter, one lowercase letter, and one number
      //   if (!hasUpperCase || !hasLowerCase || !hasNumbers) {
      //     strength -= 20
      //   }

      return Math.min(Math.round(strength), 100);
    },

    checkIfCommonPassword(password) {
      const commonPasswords = [
        "123456",
        "password",
        "123456789",
        "12345678",
        "12345",
        "1234567",
        "1234567890",
        "qwerty",
        "abc123",
        "111111",
        "123123",
        "admin",
        "letmein",
        "welcome",
        "monkey",
        "1q2w3e4r",
        "1qaz2wsx",
        "123321",
        "654321",
        "superman",
        "qazwsx",
        "michael",
        "jordan23",
        "password1",
        "sunshine",
        "princess",
        "trustno1",
        "batman",
        "12345678910",
        "jennifer",
        "123456789a",
        "ashley",
        "222222",
        "102030",
        "888888",
        "qwertyuiop",
        "555555",
        "666666",
        "789456",
        "159753",
        "7777777",
        "zxcvbnm",
        "1q2w3e",
        "987654321",
        "zxcvbn",
        "asdfgh",
        "999999",
        "88888888",
        "777777",
        "55555555",
        "66666666",
        "444444",
        "333333",
        "22222222",
        "qwerty123",
        "121212",
        "123654",
        "789456123",
        "159357",
        "csps",
        "csps-efpc",
        "efpc-csps",
        "Canada",
        "24Sussex",
        "Justin",
        "justin",
        "987654",
        "!@#$%^&*",
        "~!@#$%^&*()_+",
        "123456789g",
        "123456789t",
        "123456789r",
        "123456789e",
        "123456789w",
        "123456789q",
        "123456789s",
        "123456789d",
        "123456789f",
        "123456789p",
        "123456789l",
        "123456789o",
        "123456789i",
        "123456789u",
        "123456789y",
        "123456789t",
        "123456789p",
        "123456789a",
        "123456789s",
        "123456789d",
        "123456789f",
        "123456789g",
        "123456789h",
        "123456789j",
        "123456789k",
        "123456789l",
        "123456789z",
        "123456789x",
        "123456789c",
        "123456789v",
        "123456789b",
        "123456789n",
        "123456789m",
      ];
      return commonPasswords.includes(password);
    },
  },
};

function calculateBruteForceTime(password, strength) {
  if (!password) {
    return { timeValue: "0", timeUnit: "seconds" };
  }
  // Assuming 1 trillion guesses per second
  let guessesPerSecond = 1000000000000;
  let passwordLength = password.length;

  // Adjust the base number of possibilities based on the password strength
  let basePossibilities;
  let hasUpperCase = /[A-Z]/.test(password);
  let hasLowerCase = /[a-z]/.test(password);

  if (!hasUpperCase && !hasLowerCase) {
    basePossibilities = 0; // no uppercase and no lowercase letters
  } else if (strength < 25) {
    basePossibilities = 26; // lowercase letters only
  } else if (strength < 50) {
    basePossibilities = 52; // lowercase and uppercase letters
  } else if (strength < 75) {
    basePossibilities = 62; // lowercase, uppercase letters, and digits
  } else {
    basePossibilities = 72; // lowercase, uppercase letters, digits, and special characters
  }

  if (basePossibilities === 0) {
    return { timeValue: 0, timeUnit: "seconds" };
  }

  let possibilities = basePossibilities ** passwordLength;
  let seconds = possibilities / guessesPerSecond;
  let minutes = seconds / 60;
  let hours = minutes / 60;
  let days = hours / 24;
  let years = days / 365;

  let timeUnit;
  let timeValue = 0;

  if (years >= 100000) {
    timeUnit = "million_years";
    timeValue = years / 1000000;
  } else if (years >= 1) {
    timeUnit = "years";
    timeValue = years;
  } else if (days >= 1) {
    timeUnit = "days";
    timeValue = days;
  } else if (hours >= 1) {
    timeUnit = "hours";
    timeValue = hours;
  } else if (minutes >= 1) {
    timeUnit = "minutes";
    timeValue = minutes;
  } else {
    timeUnit = "seconds";
    timeValue = seconds;
  }

  return { timeValue: timeValue.toFixed(2), timeUnit };
}
</script>

<style scoped>
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  border: 0;
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

.password-strength-meter {
  margin-top: 10px;
  height: 1rem;
  background-color: #ddd;
  border-radius: 5px;
  overflow: hidden;
  position: relative;
}

.password-strength-meter .meter {
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  transition: width 0.3s ease;
}

.password-strength-meter .weak {
  background-color: #ff6347;
}

.password-strength-meter .medium {
  background-color: #ffa500;
}

.password-strength-meter .strong {
  background-color: #1e90ff;
}

.password-strength-meter .very-strong {
  background-color: #00ff7f;
}

.password-strength-meter .meter-text {
  margin-top: 5px;
  font-size: 14px;
  font-weight: bold;
  text-align: center;
  color: #333;
}

.password-hint {
  margin-top: 10px;
  font-size: 14px;
  color: #666;
}

.password-hint strong {
  color: #333;
}

.password-break-time {
  margin-top: 10px;
  font-size: 14px;
  color: #666;
}

.password-break-time strong {
  color: #333;
}
.common-password-warning {
  margin-top: 10px;
  font-size: 14px;
  color: #a00;
  background-color: #fee;
  padding: 10px;
  border-radius: 5px;
}
.password-saved-message {
  margin-top: 10px;
  font-size: 14px;
  color: #007f00;
  font-weight: bold;
}
.caps-lock-warning {
  margin-top: 5px;
  font-size: 14px;
  color: #ff6347;
}
</style>
