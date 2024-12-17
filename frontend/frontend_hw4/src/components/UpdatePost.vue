<template>
    <form v-on:submit.prevent class="form">
        <h5>Update post</h5>
        <label>Body</label>
        <input class="input" name="postBody" id="postBody" v-model="data.body"  required>
        <!-- <input class="input" name="postLink" id="postLink" v-model="data.urllink" required> -->
        <button @click="UpdatePost" class="but">Update</button>
        <button @click="DeletePost" class="but">Delete</button>
    </form>
</template>

<script>
export default {
    name: "UpdatePost",
    props: {
        id: Number,
    },
    data() {
        return {
            data: []
        }
    },
    mounted() {
        this.fetchData();
    },
    methods: {
        UpdatePost() {
            
            fetch(`http://localhost:3000/api/posts/${this.id}`, {
            method: "PUT",
            headers: {
            "Content-Type": "application/json",
            },
            credentials: 'include',
            body: JSON.stringify({body:this.data.body}),
            })
        },

        DeletePost() {
            fetch(`http://localhost:3000/api/posts/${this.id}`, {
            method: "DELETE"
            })

            location.assign('/')
        },

        fetchData() {
            fetch(`http://localhost:3000/api/posts/${this.id}`)
                .then(response => response.json())
                .then(data => {
                    console.log(data)
                    this.data = data;
                })
                .catch(error =>{
                    console.log(error)
                });

        }
    }
}
</script>