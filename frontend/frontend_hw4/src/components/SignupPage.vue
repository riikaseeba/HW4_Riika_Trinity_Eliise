<template>
  <div class="signup">
    <h1>Signup Page</h1>

    <label for="email">Email:</label>
    <input
      id="email"
      v-model="email"
      placeholder="Email"
    />
    <br>

    <form>
      <label for="password">Password:</label>
      <input
        :type="showPassword ? 'text' : 'password'"
        v-model="password"
        id="password"
        placeholder="Password"
      />
      <br>
      <label for="confirm-password">Confirm Password:</label>
      <input
        :type="showPassword ? 'text' : 'password'"
        v-model="confirmPassword"
        id="confirm-password"
        placeholder="Confirm Password"
      />
      <br>
      <button @click="validateSignup">Submit</button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'SignupPage',
  data() {
    return {
      email: "",
      password: "",
      confirmPassword: "",
      showPassword: false,
    };
  },
  methods: {
    validateSignup() {
      const errors = [];
      let errorMessage = "";

      // Password validation
      if (this.password.length < 8 || this.password.length >= 15) {
        errors.push("Password must be at least 8 and less than 15 characters long.");
      }
      if (!/^[A-Z]/.test(this.password)) {
        errors.push("Password must start with an uppercase letter.");
      }
      if (!/[A-Z]/.test(this.password)) {
        errors.push("Password must include at least one uppercase letter.");
      }
      if ((this.password.match(/[a-z]/g) || []).length < 2) {
        errors.push("Password must include at least two lowercase letters.");
      }
      if (!/\d/.test(this.password)) {
        errors.push("Password must include at least one numeric value.");
      }
      if (!/_/.test(this.password)) {
        errors.push("Password must include the character '_'.");
      }

      // Confirm password validation
      if (this.password !== this.confirmPassword) {
        errors.push("Passwords do not match.");
      }

      // Display errors or success message
      const valid = errors.length === 0;
      if (!valid) {
        errors.forEach((item) => {
          errorMessage += `${item}\n`;
        });
        alert("The form contains errors:\n" + errorMessage);
        return false;
      } else {
        alert("Signup successful!");
        // Add signup logic here, e.g., API call
        return true;
      }
    },
  },
};
</script>

<style>
.signup {
  border: 0px; /* Add border */
  border-radius: 30px; /* Rounded corners */
  padding: 20px;
  display: flex;
  flex-direction: column;
  background-color: rgb(181, 216, 175);
  width: 540px;
  margin: 100px auto;
}

.signup input {
  display: block;
  padding: 10px 6px;
  width: 100%;
  box-sizing: border-box;
  border: none;
  border-bottom: 1px solid white;
  color: rgb(69, 26, 4);
}

.error-messages {
  color: red;
  font-size: 0.9em;
}

button {
  width: 100%;
  padding: 10px;
  background-color: #2c3e50; /* Dark blue button */
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
}

button:hover {
  background-color: #34495e;
}
</style>
