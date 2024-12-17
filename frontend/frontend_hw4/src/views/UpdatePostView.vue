<template>
    <UpdatePost :id="$route.params.id" />
</template>

<script>
import UpdatePost from "@/components/UpdatePost.vue";


export default {
    name: "UpdatePostView",
    components: {
        UpdatePost,
    }
}
</script>