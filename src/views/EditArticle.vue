<template>
  <button
    class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
  >
    <router-link to="/">Resturn to posts</router-link>
  </button>
  <form>
    <div class="col-span-6 sm:col-span-3">
      <label for="title" class="block text-sm font-medium text-gray-700"
        >Title</label
      >
      <input
        type="text"
        name="title"
        id="title"
        class="
          mt-1
          focus:ring-indigo-500 focus:border-indigo-500
          block
          w-full
          shadow-sm
          sm:text-sm
          border-gray-300
          rounded-md
        "
      />
    </div>
  </form>

  <button
    class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
    @click="editPost(postSeenId)"
  >
    Edit the post
  </button>
</template>

<script>
// import PostLine from "@/components/layout/PostLine.vue";
export default {
  name: "EditArticle",
  data() {
    return {
      postId: false,
      postSeenId: "",
    };
  },
  methods: {
    editPost() {
      this.$router.push("/");
    },
  },
  created() {
    if (this.$route.params.postId) {
      this.postId = true;
    } else {
      this.postId = false;
    }
    if (this.postId === true) {
      const postToEdit = this.$store.getters.postToEdit;
      this.postSeenId = postToEdit.postSeenId;
    }
  },
};
</script>
