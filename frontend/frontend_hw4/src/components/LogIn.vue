<template>
    <div class="signup">
      <h1>Signup Page</h1>
          <label for="email">Email:</label>
          <input
              placeholder="Email"
          />
          <br>
      <form>
        <label for="password">Password:</label>
        <input
          :type="showPassword ? 'text' : 'password'"
          v-model="password"
          @change="$emit('update:password', $event.target.value)"
         id="password"
          placeholder="Password"
        />
        <br>
        <br>
        <button @click=Validate()>submit</button>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    name: 'Validate',
    methods: {
      Validate () {
        const password = document.getElementById('password').value
        const errors = []
        let errorMesage = ''
  
        // Password validation checks
        if (password.length < 8 || password.length >= 15) {
          errors.push('Password must be at least 8 and less than 15 characters long.')
        }
        if (!/^[A-Z]/.test(password)) {
          errors.push('Password must start with an uppercase alphabet.')
        }
        if (!/[A-Z]/.test(password)) {
          errors.push('Password must include at least one uppercase alphabet character.')
        }
        if ((password.match(/[a-z]/g) || []).length < 2) {
          errors.push('Password must include at least two lowercase alphabet characters.')
        }
        if (!/\d/.test(password)) {
          errors.push('Password must include at least one numeric value.')
        }
        if (!/_/.test(password)) {
          errors.push("Password must include the character '_'.")
        }
        const valid = errors.length === 0
        if (!valid) {
          errors.forEach((item, index) => {
            errorMesage = errorMesage + item
          })
          alert('The password is not valid - ' + errorMesage)// + ${errors.join(" ")})
          return false
        } else {
          return confirm('Do you really want to submit the form?')
        }
      }
    }
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
      width: 300px; /* Control fieldset width */
      width: 540px;
      margin: 100px auto;
  }
  
  .signup input{
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
      background-color: #2c3e50; /* Tumesinine nupp */
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