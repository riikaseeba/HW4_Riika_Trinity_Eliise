<template>
  <footer>
    <div class="footer-content">
      <p>&copy; 2024 All rights reserved.</p>
    </div>
  </footer>
</template>

<script>
export default {
name: 'AppFooter'
}
</script>

<style scoped>
footer {
background-color: #2c6e49;
color: white;
text-align: center;
padding: 20px 0;
bottom: 0;
width: 100%;
box-shadow: 0 -2px 4px rgba(0, 0, 0, 0.1);
}

footer p {
font-size: 14px;
margin: 0;
font-weight: bold;
}
</style>