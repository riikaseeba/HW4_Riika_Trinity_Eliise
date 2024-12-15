<template>
  <div class="login-container">
    <h1>Login Page</h1>
    <form @submit.prevent="handleLogin">
      <div class="form-group">
        <label for="email">Email:</label>
        <input
          id="email"
          type="email"
          v-model="email"
          placeholder="Email"
          required
        />
      </div>
      <div class="form-group">
        <label for="password">Password:</label>
        <input
          id="password"
          type="password"
          v-model="password"
          placeholder="Password"
          required
        />
      </div>
      <!-- Buttons Container -->
      <div class="buttons-container">
        <button type="submit" class="login-button">Login</button>
        <span class="or-text">Or</span>
        <router-link to="/signup">
          <button type="button" class="signup-button">Sign Up</button>
        </router-link>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: "LoginPage",
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    handleLogin() {
      console.log("Logging in with:", { email: this.email, password: this.password });
    },
  },
};
</script>

<style scoped>
.login-container {
  background-color: #c8e1c8; /* Light green background */
  border-radius: 15px; /* Rounded corners */
  padding: 30px 20px;
  width: 400px;
  margin: 100px auto; /* Centered horizontally */
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1); /* Subtle shadow */
}

h1 {
  text-align: center;
  color: #2c3e50;
  font-size: 28px;
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 15px;
  text-align: left; /* Align labels to the left */
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
  color: #2c3e50;
}

input {
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-sizing: border-box; /* Prevent input overflow */
}

button {
  width: 100%;
  padding: 10px;
  background-color: #2c3e50; /* Dark blue-gray */
  color: white;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #34495e; /* Slightly lighter hover color */
}
</style>
