<template>
  <div class="flex flex-col">
    <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
      <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
        <div
          class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg"
        >
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  class="
                    px-6
                    py-3
                    text-left text-xs
                    font-medium
                    text-gray-500
                    uppercase
                    tracking-wider
                  "
                >
                  Id
                </th>
                <th
                  scope="col"
                  class="
                    px-6
                    py-3
                    text-left text-xs
                    font-medium
                    text-gray-500
                    uppercase
                    tracking-wider
                  "
                >
                  Title
                </th>
                <th
                  scope="col"
                  class="
                    px-6
                    py-3
                    text-left text-xs
                    font-medium
                    text-gray-500
                    uppercase
                    tracking-wider
                  "
                >
                  Post (excerpt)
                </th>
                <th
                  scope="col"
                  class="
                    px-6
                    py-3
                    text-left text-xs
                    font-medium
                    text-gray-500
                    uppercase
                    tracking-wider
                  "
                >
                  Author
                </th>
                <th
                  scope="col"
                  class="
                    px-6
                    py-3
                    text-left text-xs
                    font-medium
                    text-gray-500
                    uppercase
                    tracking-wider
                  "
                >
                  Categories
                </th>
                <th
                  scope="col"
                  class="
                    px-6
                    py-3
                    text-left text-xs
                    font-medium
                    text-gray-500
                    uppercase
                    tracking-wider
                  "
                >
                  Comments
                </th>
                <th
                  scope="col"
                  class="
                    px-6
                    py-3
                    text-left text-xs
                    font-medium
                    text-gray-500
                    uppercase
                    tracking-wider
                  "
                >
                  Likes
                </th>
                <th
                  scope="col"
                  class="
                    px-6
                    py-3
                    text-left text-xs
                    font-medium
                    text-gray-500
                    uppercase
                    tracking-wider
                  "
                >
                  Actions
                </th>
              </tr>
            </thead>
            <post-line
              v-for="(post, index) in allPostsList"
              :key="index"
              :postId="post.postId"
              :postTitle="post.postTitle"
              :postExcerpt="post.postExcerpt"
              :postAuthor="post.postAuthor"
              :postCategories="post.postCategories"
              :postComments="post.postComments"
              :postLikes="post.postLikes"
              :postActions="post.postActions"
              @whole-article="seeWholeArticle(post.postId)"
              @edit-article="editArticle(post.postId)"
            ></post-line>
          </table>

          <button
            class="
              bg-blue-500
              hover:bg-blue-700
              text-white
              font-bold
              py-2
              px-4
              rounded
            "
          >
            <router-link to="/add-post">Add Post</router-link>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PostLine from "@/components/layout/PostLine.vue";

export default {
  name: "Home",
  components: {
    PostLine,
  },
  data() {
    return {
      allPostsList: [],
      comments: [],
      // selectedPost: [],
      postAuthor: "",
      postCategories: "",
      postComments: "",
      postLikes: "",
    };
  },
  methods: {
    getAllPosts() {
      this.getPostsData((postsData) => {
        console.log(postsData);
      })
        .then((usersData) => {
          return this.getUsersData(usersData);
        })
        .then((categoriesData) => {
          return this.getCategoryData(categoriesData);
        })
        .then((commentsData) => {
          return this.getCommentsData(commentsData);
        });
    },
    getPostsData() {
      return new Promise((resolve, reject) => {
        fetch("http://fakeapi.jsonparseronline.com/posts")
          .then((response) => response.json())
          .then((json) => {
            // console.log(json);
            for (const index in json) {
              this.allPostsList.push({
                postId: json[index].id,
                postTitle: json[index].title,
                postExcerpt: json[index].content,
                postAuthor: "",
                postCategories: "",
                postComments: "",
                postLikes: json[index].likes,
                userId: json[index].userId,
                categoryId: json[index].categoryId,
              });
            }
            resolve(this.allPostsList);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    getUsersData() {
      return new Promise((resolve, reject) => {
        fetch("http://fakeapi.jsonparseronline.com/users")
          .then((response) => response.json())
          .then((json) => {
            for (const index in json) {
              for (const allPostIndex in this.allPostsList) {
                if (json[index].id == this.allPostsList[allPostIndex].userId) {
                  this.allPostsList[
                    allPostIndex
                  ].postAuthor = `${json[index].firstName} ${json[index].lastName}`;
                }
              }
            }
            resolve(this.allPostsList);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    getCategoryData() {
      return new Promise((resolve, reject) => {
        fetch("http://fakeapi.jsonparseronline.com/categories")
          .then((response) => response.json())
          .then((json) => {
            // console.log(json);
            for (const index in json) {
              for (const allPostIndex in this.allPostsList) {
                if (
                  json[index].id == this.allPostsList[allPostIndex].categoryId
                ) {
                  this.allPostsList[allPostIndex].postCategories =
                    json[index].name;
                }
              }
            }
            resolve(this.allPostsList);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    getCommentsData() {
      return new Promise((resolve, reject) => {
        fetch("http://fakeapi.jsonparseronline.com/comments")
          .then((response) => response.json())
          .then((json) => {
            // console.log(json);
            for (const index in json) {
              console.log(json);
              if (typeof this.comments[json[index].userId] === "undefined") {
                this.comments[json[index].userId] = 0;
              } else {
                this.comments[json[index].userId] =
                  this.comments[json[index].userId] + 1;
              }
            }
            // console.log("this.comments: ", this.comments);

            for (const allPostIndex in this.allPostsList) {
              this.allPostsList[allPostIndex].postComments =
                this.comments[this.allPostsList[allPostIndex].userId];
            }

            resolve(this.allPostsList);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    seeWholeArticle(postId) {
      for (let i = 0; i < this.allPostsList.length; i++) {
        if (this.allPostsList[i].postId === postId) {
          this.postSeenId = postId;
          this.$store.commit("setPostOpened", {
            postAuthor: this.allPostsList[i].postAuthor,
            postCategories: this.allPostsList[i].postCategories,
            postComments: this.allPostsList[i].postComments,
            postLikes: this.allPostsList[i].postLikes,
          });
        }
      }
      this.$router.push("/view-article/" + this.postSeenId);
    },
    editArticle(postId) {
      for (let i = 0; i < this.allPostsList.length; i++) {
        if (this.allPostsList[i].postId === postId) {
          this.postSeenId = postId;
          this.$store.commit("setPostToEdit", {
            postSeenId: this.allPostsList[i].postId,
          });
        }
      }
      this.$router.push("/edit-article/" + this.postSeenId);
    },
  },
  created() {
    this.getAllPosts();
  },
};
</script>
