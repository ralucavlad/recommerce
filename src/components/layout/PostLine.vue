<template>
  <tbody class="bg-white divide-y divide-gray-200">
    <tr>
      <td class="px-6 py-4 max-w-xs">
        <div class="text-sm text-gray-900 max-w-xs">
          {{ postId }}
        </div>
      </td>
      <td class="px-6 py-4 max-w-xs">
        <div
          class="text-sm text-gray-900 max-w-xs"
          @click="$emit('whole-article')"
        >
          {{ postTitle }}
        </div>
        <!-- <div class="text-sm text-gray-500">Optimization</div> -->
      </td>
      <td class="px-6 py-4 max-w-xs">
        <div
          class="text-sm text-gray-900 max-w-xs"
          @click="$emit('whole-article')"
        >
          {{ postExcerpt }}
        </div>
      </td>
      <td class="px-6 py-4">
        <div class="text-sm text-gray-900">{{ postAuthor }}</div>
      </td>
      <td class="px-6 py-4">
        <div class="text-sm text-gray-900">{{ postCategories }}</div>
      </td>
      <td class="px-6 py-4">
        <div class="text-sm text-gray-900">{{ postComments }}</div>
      </td>
      <td class="px-6 py-4">
        <div class="text-sm text-gray-900">{{ postLikes }}</div>
      </td>
      <td class="px-6 py-4 text-sm font-medium">
        <a
          class="text-indigo-600 hover:text-indigo-900"
          @click="$emit('edit-article')"
          >Edit</a
        >
      </td>
    </tr>
  </tbody>
</template>

<script>
export default {
  name: "PostLine",
  props: [
    "postId",
    "postTitle",
    "postExcerpt",
    "postAuthor",
    "postCategories",
    "postComments",
    "postLikes",
  ],
};
</script>
