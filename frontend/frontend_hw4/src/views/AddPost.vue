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
        <button @click="addPost" class="addPost">Add Post</button>
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
        fetch("http://localhost:3000/posts", { 
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
          credentials: "include",
        })
        .then((response) => { 
          console.log(response.data);
          // redirect to /allposts view
          this.$router.push("/");
        })
        .catch((e) => {
          console.log(e);
          console.log("error");
        });
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
