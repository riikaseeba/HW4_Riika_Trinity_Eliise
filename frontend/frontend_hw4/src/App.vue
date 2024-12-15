<template>
  <div id="app">
    <AppHeader  /> <!-- Use the Header component -->
    <main class="content">
      <router-view /> <!-- Dynamic page content -->
    </main>
    <AppFooter  /> <!-- Use the Footer component -->
  </div>
</template>

<script>
import AppHeader from '@/components/AppHeader.vue'
import AppFooter from '@/components/AppFooter.vue'

export default {
  name: 'App',
  components: {
    AppHeader,
    AppFooter
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  min-height: 100vh;
}
body, html {
  background-color: #f0f8ff;
  margin: 0; /* Remove default margin */
  padding: 0; /* Remove default padding */
  box-sizing: border-box; /* Ensure consistent sizing */
}

</style>