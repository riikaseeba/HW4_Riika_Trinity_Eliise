<template>
  <div class="home">
    <h1>Welcome to the Blog</h1>
    <p>Explore the latest posts below:</p>
    <!-- Header Section -->
    <div class="header">
      <button class="logout-btn" @click="logout">Logout</button>
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
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'HomeView',
  components: {
    HelloWorld, BlogPost
  },
  computed: {
    // Fetch all posts from Vuex store
    posts () {
      return this.$store.getters.allPosts
    }
  },
  methods: {
    // Logout method
    logout() {
      // Clear the user session (example: clearing token or state)
      this.$store.dispatch('logout');
      this.$router.push('/login'); // Redirect to the login page
    },
    // Navigate to "Add Post" page
    goToAddPost() {
      this.$router.push('/AddPost');
    },
    // Delete all posts
    deleteAllPosts() {
      if (confirm('Are you sure you want to delete all posts?')) {
        this.$store.dispatch('deleteAllPosts');
      }
    }
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