<template>
  <div class="search">
    <ul id="resultSearch">
      <li v-for="movie of $store.state.searchResult" :key="movie.id">
        <img
          v-if="movie.poster_path === null"
          :src="require('@/assets/pellicule.png')"
          :alt="movie.original_title | imageAlt"
        />

        <img
          v-if="movie.poster_path != null"
          :src="movie.poster_path | imageSrc"
          :alt="movie.original_title | imageAlt"
        />
        <router-link
          :to="{ name: 'MovieDetailView', params: { id: movie.id } }"
          >{{ movie.title }}</router-link
        >
      </li>
    </ul>
  </div>
</template>

<script>

export default {
  name: "SearchView",

  filters: {
    imageSrc: function (value) {
      return "https://image.tmdb.org/t/p/w500/" + value;
    },

    imageAlt: function (value) {
      return value;
    },
  },

};
</script>

<style scoped>
ul {
  list-style: none;
}

#resultSearch {
  display: flex;
  flex-wrap: wrap;
}

img {
  max-width: 100%;
  vertical-align: middle;
  height: auto;
}

ul li {
  width: 130px;
  display: flex;
  flex-wrap: wrap;
}

ul li img {
  width: 120px;
  height: auto;
  margin: 10px;
}
</style>