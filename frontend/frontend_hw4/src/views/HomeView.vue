<template>
  <div class="home">
    <h1>Welcome to the Blog</h1>
    <p>Explore the latest posts below:</p>

    <!-- Blog Posts Loop -->
    <div class="blog-posts">
      <BlogPost
        v-for="post in posts"
        :key="post.id"
        :postId="post.id"
      />
    </div>

    <!-- Reset All Likes Button -->
    <div class="reset-likes-container">
      <button class="reset-likes" @click="resetAllLikes">
        Reset All Likes
      </button>
    </div>
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
    resetAllLikes () {
      // Dispatch Vuex action to reset all likes
      this.$store.dispatch('resetLikes')
    }
  }
}
</script>
<style scoped>
/* Styling for the reset button container */
.reset-likes-container {
  display: flex;
  justify-content: center;
  margin: 40px 0;
}

/* Styling for the reset button */
.reset-likes {
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

.reset-likes:hover {
  background-color: #e64a19;
  transform: translateY(-2px);
}

.reset-likes:active {
  background-color: #d84315;
  transform: translateY(1px); /* Press effect */
}
</style>