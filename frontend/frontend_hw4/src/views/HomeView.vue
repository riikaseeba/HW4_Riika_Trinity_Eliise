<template>
  <div class="home">
    <h1>Welcome to the Blog</h1>
    <p>Explore the latest posts below:</p>
    <!-- Header Section -->
    <div class="header">
      <button v-if = "authResult" @click="Logout" class="center">Logout</button>
      <button class="add-btn" @click="goToAddPost">Add Post</button>
      <button class="delete-all-btn" @click="deleteAllPosts">Delete All</button>
    </div>

    <!-- Blog Posts Loop -->
    <div class="blog-posts">
      <BlogPost
        v-for="post in posts"
        :key="post.id"
        :postId="post.id"
      /></div>
  </div>
</template>

<script>
import BlogPost from '@/components/BlogPost.vue'

// @ is an alias to /src
//import HelloWorld from '@/components/HelloWorld.vue'
import auth from "../auth";

export default {
  name: 'HomeView',
  components: { 
    BlogPost
  },
  data: function() {
    return {
    posts:[ ],
    authResult: auth.authenticated()
    }
  },
  computed: {
  },
  methods: {
    LogOut: async function() {
      fetch("http://localhost:3000/auth/logout", {
        credentials: 'include'
      })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        console.log('jwt removed');
        //console.log('jwt removed:' + auth.authenticated());
        this.$router.push("/login");
        //location.assign("/");
      })
      .catch((e) => {
        console.log(e);
        console.log("error logout");
      });
    },
    },
    DeleteAll: async function() {
      const response = await fetch("http://localhost:3000/api/posts", {
        method: "DELETE",
        credentials: 'include'
      });
      console.log(response);
      location.reload()
    }
  }
</script>
<style scoped>
.header {
  display: flex;
  justify-content: center;
  margin: 40px 0;
}


.logout-btn, .add-btn, .delete-all-btn {
  background-color: #ff5722;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 8px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.2s ease, transform 0.2s ease;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
}

.logout-btn:hover, .add-btn:hover, .delete-all-btn:hover {
  background-color: #e64a19;
  transform: translateY(-2px);
}

.reset-likes:active {
  background-color: #d84315;
  transform: translateY(1px); /* Press effect */
}
</style>