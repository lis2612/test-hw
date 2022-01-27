import { ref, computed } from 'vue';

export default function useSortedPosts(posts) {
  const selectedSort = ref('');
  // eslint-disable-next-line max-len
  const sortedPosts = computed(() => [...posts.value].sort((post1, post2) => post1[selectedSort.value]?.localeCompare(post2[selectedSort.value])));
  return {
    selectedSort, sortedPosts,
  };
}
