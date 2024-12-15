<template>
  <div>
    <main>
      <h1>Add Post</h1>
      <form @submit.prevent="handleSubmit">
        <div>
          <label for="content">Body:</label>
          <textarea
            id="content"
            v-model="content"
            placeholder="Enter post content"
          ></textarea>
        </div>
        <button type="submit">Add Post</button>
      </form>
    </main>
  </div>
</template>

<script>
export default {
  data() {
    return {
      content: "", // Holds the post body
    };
  },
  methods: {
    handleSubmit() {
      console.log("Post added:", { content: this.content });
      // lisa siia loogika
    },
  },
};
</script>

<style scoped>
main {
  padding: 20px;
}

form {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

label {
  font-weight: bold;
}

textarea {
  padding: 10px;
  font-size: 16px;
  width: 100%;
  min-height: 100px;
}

button {
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
}
</style>
