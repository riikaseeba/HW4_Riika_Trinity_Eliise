<template>
  <div class="contact-container">
    <h1>Contact Us</h1>
    <p>
      This page was created by <strong>Riika Seeba</strong>, <strong>Eliise Alop</strong>, 
      and <strong>Kärt Trinity Sillaots</strong>.
    </p>
    <p>
      If you encounter any problems, feel free to contact us for assistance.
    </p>
  </div>
</template>

<script>
export default {
  name: "ContactUs",
};
</script>

<style scoped>
.contact-container {
  background-color: #c8e1c8; /* Light green background */
  border-radius: 15px; /* Rounded corners */
  padding: 30px 20px;
  width: 400px;
  margin: 100px auto; /* Center horizontally */
  text-align: center;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1); /* Subtle shadow */
}

h1 {
  color: #2c3e50;
  font-size: 28px;
  margin-bottom: 15px;
}

p {
  font-size: 16px;
  color: #2c3e50;
  line-height: 1.6;
}

strong {
  font-weight: bold;
  color: #34495e;
}
</style>
