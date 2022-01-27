import { ref, computed } from 'vue';

export default function useSortedAndSearchedPosts(sortedPosts) {
  const searchQuery = ref('');
  // eslint-disable-next-line max-len
  const sortedAndSearchedPosts = computed(() => sortedPosts.value.filter((post) => post.title.toLowerCase().includes(searchQuery.value.toLowerCase())));
  return {
    searchQuery, sortedAndSearchedPosts,
  };
}
