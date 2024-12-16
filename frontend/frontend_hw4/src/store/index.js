import { createStore } from 'vuex'

export default createStore({
  strict: true,

  state: {
    posts: [
     { id: 1, author: 'John Doe', content: 'Went to my favorite restaurant. They served (as always) the best food in town.', date: 'Oct 1, 2024', profileImage: require('@/assets/al_logo.png'), postImage: require('@/assets/food.jpg'), title: null, likes: 0 },
     { id: 2, author: 'John Doe', content: 'This autumn, Tallinn hosts several fascinating cultural events that attract both locals and tourists. A standout is the Tallinn Light Festival, where the streets of the Old Town are filled with mesmerizing light installations.', date: 'Sep 21, 2024', profileImage: require('@/assets/al_logo.png'), postImage: null, title: 'Exciting Cultural Event in Autumnal Tallinn', likes: 0 },
     { id: 3, author: 'John Doe', content: 'The University of Tartu Library has undergone significant renovations, offering even more modern spaces for students and visitors. The spacious reading rooms and new digital resources make studying more convenient and productive.', date: 'Sep 10, 2024', profileImage: require('@/assets/al_logo.png'), postImage: null, title: 'Updates at the University of Tartu Library', likes: 0 },
     { id: 4, author: 'John Doe', content: 'Tallinn Old Town - A UNESCO World Heritage Site', date: 'Aug 26, 2024', profileImage: require('@/assets/al_logo.png'), postImage: require('@/assets/post04.jpg'), title: null, likes: 0 },
     { id: 5, author: 'John Doe', content: "Pärnu Beach - Estonia's Summer Capital", date: 'Aug 20, 2024', profileImage: require('@/assets/al_logo.png'), postImage: require('@/assets/post05.jpg'), title: null, likes: 0 },
     { id: 6, author: 'John Doe', content: 'Visited Lahemaa National Park and enjoyed the serene landscapes, lush forests, and beautiful coastline. A perfect escape from the city!', date: 'Aug 10, 2024', profileImage: require('@/assets/al_logo.png'), postImage: require('@/assets/post06.jpg'), title: 'A Day at Lahemaa National Park', likes: 0 },
     { id: 7, author: 'John Doe', content: 'Discovered a cozy little cafe near the Town Hall Square. It’s perfect for relaxing with a book and a warm cup of coffee.', date: 'Jul 30, 2024', profileImage: require('@/assets/al_logo.png'), postImage: null, title: 'New Cafe in Town!', likes: 0 },
     { id: 8, author: 'John Doe', content: 'Spent the afternoon exploring Estonian Art Museum. The exhibits showcase a fascinating range of local art, both traditional and contemporary.', date: 'Jul 15, 2024', profileImage: require('@/assets/al_logo.png'), postImage: require('@/assets/post08.jpeg'), title: 'Exploring Estonian Art Museum', likes: 0 },
     { id: 9, author: 'John Doe', content: 'Took a refreshing swim at Pirita Beach. The summer weather made it the perfect day to enjoy Estonia’s beautiful coastline.', date: 'Jun 25, 2024', profileImage: require('@/assets/al_logo.png'), postImage: require('@/assets/post09.jpg'), title: null, likes: 0 },
     { id: 10, author: 'John Doe', content: 'Visited the Tallinn Botanic Garden today. Loved the colorful flower arrangements and peaceful walking paths!', date: 'Jun 5, 2024', profileImage: require('@/assets/al_logo.png'), postImage: require('@/assets/post10.jpg'), title: 'Tallinn Botanic Garden Visit', likes: 0 }
    ],
    user: null
  },
  getters: {
    allPosts: (state) => state.posts,
    getPostById: (state) => (id) => {
      return state.posts.find(post => post.id === id)
    },
    transformedPosts: (state) => {
      return state.posts.map(post => ({
        id: post.id,
        author: post.author,
        title: post.title || 'Untitled Post',
        shortContent: post.content.length > 100 ? post.content.substring(0, 100) + '...' : post.content,
        hasImage: post.postImage !== null,
        likeStatus: post.likes > 0 ? 'Liked' : 'Not Liked'
      }))
    }
  },
  // likede osa
  mutations: {
    DELETE_ALL_POSTS(state) {
      state.posts = [];
    },
    LOGOUT_USER(state) {
      state.user = null;
    },
    ADD_POST(state, newPost) {
      state.posts.unshift(newPost); // Add new post to the start of the array
    }
  },
  actions: {
    resetLikes ({ commit }) {
      commit('resetAllLikes')
    },
    deleteAllPosts({ commit }) {
      commit('DELETE_ALL_POSTS');
    },
    logout({ commit }) {
      commit('LOGOUT_USER');
    },
    addPost({ commit }, content) {
      const newPost = {
        id: Date.now(), // Unique ID based on current timestamp
        content,
        date: new Date().toLocaleString(), // Add the current date and time
        likes: 0, // Default likes
        profileImage: require('@/assets/al_logo.png'), // Example profile image
        postImage: null // Placeholder for post image
      };
      commit('ADD_POST', newPost);
    }

  }
})