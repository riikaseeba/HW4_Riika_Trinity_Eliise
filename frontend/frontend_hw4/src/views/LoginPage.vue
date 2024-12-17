<template>
  <div class="login-container">
    <h1>Login Page</h1>
      <div class="form-group">
        <label for="email">Email:</label>
        <input type="email" name="email"  required v-model="email"/>
      </div>
      <div class="form-group">
        <label for="password">Password:</label>
        <input type="password" name="password" required v-model="password"/>
      </div>
      <div class ="container">
        <button @click="LogIn"  class="center">LogIn</button>
        <button @click='this.$router.push("/signup")' class="center">SignUp</button>
      </div>
  </div>
</template>

<script>
  export default {
  name: "Login", 
  
  data: function() {
      return {
     email: '',
     password: ''
    }
    },
    
    methods: {

      LogIn() {
      var data = {
        email: this.email,
        password: this.password
      };
      // using Fetch - post method - send an HTTP post request to the specified URI with the defined body
      fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
          credentials: 'include', //  Don't forget to specify this if you need cookies
          body: JSON.stringify(data),
      })
      .then((response) => response.json())
      .then((data) => {
      console.log(data);
      //this.$router.push("/");
      location.assign("/");
      })
      .catch((e) => {
        console.log(e);
        console.log("error");
      });
    },
    }
  }
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
