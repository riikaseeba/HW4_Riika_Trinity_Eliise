<template>
  <div class="home">
    <!-- Pass the postId prop to BlogPost component -->
    <BlogPost :postId="1"/>
    <BlogPost :postId="2" />
    <BlogPost :postId="3" />
    <BlogPost :postId="4" />
    <BlogPost :postId="5" />
    <BlogPost :postId="6" />
    <BlogPost :postId="7" />
    <BlogPost :postId="8" />
    <BlogPost :postId="9" />
    <BlogPost :postId="10" />
    <!-- Reset all likes -->
    <button class="reset-likes" @click="resetAllLikes">Reset All Likes</button>
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