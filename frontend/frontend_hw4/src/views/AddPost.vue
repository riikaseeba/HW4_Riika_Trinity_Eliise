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
        <button  @click="addPost" >Add Post</button>
      </form>
    </main>
  </div>
</template>

<script>
  export default {
    name: "AddPost",
    data() { /*initializes the component's data with a single property post, 
    which is an object containing the post body as an empty string.*/
      return {
        post: {
          body: "",
        },
      };
    },
    methods: {
      addPost() {
        if (this.content.trim() === "") {
          console.log("Post body cannot be empty.");
          return;
        }
        var data = { //makes data object containing the post body
          body: this.content,
        };
        fetch("http://localhost:3000/api/posts", { 
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(data),
          
        })
        .then((response) => { 
          if (!response.ok) {
          // Handle HTTP errors
          throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
        console.log("Post added:", data);
        this.$router.push("/"); // Redirect to the desired page
        })
        .catch((e) => {
          console.log("Error adding post:", e.message);
        });
      },
    },
  };
/*export default {
  data() {
    return {
      content: "", // Holds the post body
    };
  },
  methods: {
    handleSubmit() {
      console.log("Post added:", { content: this.content });
      if (!this.content.trim()) {
        alert("Content cannot be empty!");
        return;
      }
      // Dispatch Vuex action to add the new post
      this.$store.dispatch("addPost", this.content);
      // Clear the input
      this.content = "";
      // Redirect to the posts page
      this.$router.push("/");
    },
  },
};*/
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
