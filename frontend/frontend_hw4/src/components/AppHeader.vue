<template>
  <header>
    <div class="navbar">
      <img
        id="logo"
        src="@/assets/al_logo.png"
        alt="Logo"
        width="50"
        height="50"
      />
      <nav>
        <ul>
          <li><router-link to="/">Home</router-link></li>
          <li><router-link to="/add-post">AddPost</router-link></li>
          <li><router-link to="/signup">SignUp</router-link></li>
          <li><router-link to="/login">Log In</router-link></li>
          <li><router-link to="/contact">Contact Us</router-link></li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<script>
export default {
name: 'AppHeader'
}
</script>

<style scoped>
/* Your header styles here */
.navbar {
  display: flex;
  justify-content: space-between;
  padding: 15px;
  background-color: #2c6e49;
  color: white;
}

.navbar ul {
  list-style: none;
  display: flex;
}

.navbar li {
  margin-left: 20px;
}

.navbar a {
  text-decoration: none;
  color: white;
  font-size: 16px;
  font-weight: bold;
  transition: color 0.2s ease;
}
.navbar a:hover {
color: #ff5722;
}
</style>