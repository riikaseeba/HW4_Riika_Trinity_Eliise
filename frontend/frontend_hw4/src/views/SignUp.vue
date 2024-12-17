<template>
  <div class="signup">
    <h1>Signup Page</h1>
    <form>
      <label for="email">Email:</label>
      <input type="email" name="email"  required v-model="email"/>

      <br>
    
        <label for="password">Password:</label>
        <input type="password" name="password" required v-model="password"/>

        <br>

        <label for="confirm-password">Confirm Password:</label>
        <input
          :type="showPassword ? 'text' : 'password'"
          v-model="confirmPassword" id="confirm-password" placeholder="Confirm Password"/>
        <br>

        <button @click="SignUp" class="Signup">SignUp</button>
     </form>
  </div>
</template>

<script>
export default {
name: "Signup", 

data: function() {
  return {
    email: '',
    password: '',
  }
},
methods: {

SignUp() {
      var data = {
        email: this.email,
        password: this.password
      };
      // using Fetch - post method - send an HTTP post request to the specified URI with the defined body
      fetch("http://localhost:3000/auth/signup", {
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
      this.$router.push("/");
      })
      .catch((e) => {
        console.log(e);
        console.log("error");
      });
    },
  }, 
  }

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
