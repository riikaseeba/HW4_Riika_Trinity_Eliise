
<template>
  <div class="posts">
      <br>
      <fieldset class="post" :id="'post' + post.id" >
          <div class="posthead">
              <table>
                  <tbody>
                      <tr>
                          <td></td>
                          <td><h1>{{ post.date }}</h1></td>
                      </tr>
                  </tbody>
              </table>
          </div>
          <div class="postcap">
              <h3 v-if="post.title">{{ post.title }}</h3>
              <p>{{ post.content }}</p>
          </div>
      </fieldset>
      <br>
  </div>
</template>

<script>
export default {
  name: 'BlogPost',
  props: {
    postId: Number // We expect the post ID to be passed as a prop
  },
  computed: {
    post () {
      // Directly accessing the post from the store's state using this.$store
      return this.$store.state.posts.find(post => post.id === this.postId) || null
    },
    formattedDate() {
      // Format the date using a helper function
      return this.formatDate(this.post.date);
    }
  },
  methods: {
  
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: pink;
}

fieldset{
  justify-content: center;
  align-items: flex-start;
  margin-left: auto;
  margin-right: auto;
}

.post {
  border: 0px; /* Add border */
  border-radius: 30px; /* Rounded corners */
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 20px;
  display: flex;
  flex-direction: column;
  background-color: #d9f1e3;
  margin: 15px auto;
  max-width: 600px;
  width: 300px; /* Control fieldset width */
  width: 540px;
}

.post .posthead h1 {
  font-size: 20px;
  color: #333333;
  margin-bottom: 10px;
  margin-left: 150px;
}

.post .posthead img {
  margin-bottom: 10px;
  margin-right: 150px;
}
.post > img {               /*Child Selector (>)*/
  border-radius: 10px;
}

.post .postimg {
  width: 100%; /* Ensure image takes full width */
  border-radius: 10px;
}

.posthead ~ .postcap{       /*General Sibling Selector (~)*/
  color: #333333;
  margin-top: 10px;
  font-size: 16px;
  font-weight: 350;
}
.post.likeIcon {
  margin-top: 10px;
  font-size: 20px;
  cursor: pointer;
}

.like-section {
display: flex;
align-items: center;
margin-top: 15px;
}

.like-section button {
background-color: #ff5722;
color: white;
border: none;
padding: 8px 15px;
border-radius: 5px;
font-size: 14px;
cursor: pointer;
margin-right: 10px;
transition: background-color 0.2s ease;
}

.like-section button:hover {
background-color: #e64a19;
}

.like-section span {
font-size: 14px;
color: #333333;
}

</style>
