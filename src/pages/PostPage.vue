/* eslint-disable max-len */
<template>
  <div>
    <h1>Страница с постами</h1>
    <my-input
    v-focus
    v-model="searchQuery"
    placeholder="Поиск..."
    ></my-input>
    <div class="app__btns">
      <my-button
        @click="showDialog"
      >Создать пост</my-button>
      <my-select
        v-model="selectedSort"
        :options="sortOptions"
      ></my-select>
    </div>

    <my-dialog v-model:show="dialogVisible">
      <post-form @create="createPost"></post-form>
    </my-dialog>

    <post-list
      :posts="sortedAndSearchedPosts"
      @remove="removePost"
      v-if="!isPostsLoading"
    ></post-list>
    <div v-else>LOADING...</div>
    <div v-intersection="loadMorePosts" class="observer"></div>
    <!-- <div class="page__wrapper">
      <div
        v-for="pageNumber in totalPages"
        :key="pageNumber"
        class="page"
        :class="{
          'current-page':page===pageNumber
          }"
        @click="changePage(pageNumber)"
        > {{ pageNumber }} </div>
    </div> -->
  </div>
</template>

<script>
import PostForm from '@/components/PostForm.vue';
import PostList from '@/components/PostList.vue';
import axios from 'axios';
// import MyButton from './components/UI/MyButton.vue';
// import MyDialog from './components/UI/MyDialog.vue';

export default {
  components: { PostForm, PostList },
  data() {
    return {
      posts: [],
      dialogVisible: false,
      isPostsLoading: false,
      selectedSort: '',
      searchQuery: '',
      page: 1,
      limit: 10,
      totalPages: 0,
      sortOptions: [
        { value: 'title', name: 'По названию' },
        { value: 'body', name: 'По содержимому' },
      ],
    };
  },
  methods: {
    createPost(post) {
      this.posts.push(post);
      this.dialogVisible = false;
    },
    removePost(post) {
      this.posts = this.posts.filter((p) => p.id !== post.id);
    },
    showDialog() {
      this.dialogVisible = true;
    },
    // changePage(pageNumber) {
    //   this.page = pageNumber;
    // },
    async fetchPosts() {
      try {
        this.isPostsLoading = true;
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
          params: {
            _page: this.page,
            _limit: this.limit,
          },
        });
        this.totalPages = Math.ceil(response.headers['x-total-count'] / this.limit);
        this.posts = response.data;
      } catch (e) {
        // eslint-disable-next-line no-alert
        alert('ERROR');
      } finally {
        this.isPostsLoading = false;
      }
    },
    async loadMorePosts() {
      try {
        this.page += 1;
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
          params: {
            _page: this.page,
            _limit: this.limit,
          },
        });
        this.totalPages = Math.ceil(response.headers['x-total-count'] / this.limit);
        this.posts = [...this.posts, ...response.data];
      } catch (e) {
        // eslint-disable-next-line no-alert
        alert('ERROR');
      }
    },
  },
  mounted() {
    this.fetchPosts();
    // const options = {
    //   rootMargin: '0px',
    //   threshold: 1.0,
    // };
    // const callback = (entries, observer) => {
    //   if (entries[0].isIntersecting && this.page < this.totalPages) {
    //     this.loadMorePosts();
    //   }
    // };
    // const observer = new IntersectionObserver(callback, options);
    // observer.observe(this.$refs.observer);
  },
  computed: {
    sortedPosts() {
      // eslint-disable-next-line max-len
      return [...this.posts].sort((post1, post2) => post1[this.selectedSort]?.localeCompare(post2[this.selectedSort]));
    },
    sortedAndSearchedPosts() {
      // eslint-disable-next-line max-len
      return this.sortedPosts.filter((post) => post.title.toLowerCase().includes(this.searchQuery.toLowerCase()));
    },
  },
  watch: {
    // page() {
    //   this.fetchPosts();
    // },
  },
};
</script>

<style>

  .app__btns {
    display: flex;
    justify-content: space-between;
    margin: 15px 0;
  }
  .page__wrapper {
    display: flex;
    margin-top: 15px;
  }
  .page {
    border: 1px solid black;
    padding: 10px;
    margin: 0 3px;
  }
  .current-page {
    border: 2px solid teal;
  }
  .observer {
    height: 30px;
    background: grey;
  }
</style>
