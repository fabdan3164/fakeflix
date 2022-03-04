<template>
  <div class="about">
    <ul id="listFavoris">
      <li v-for="movie of data.results" :key="movie.id">
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
  name: "listeFavoris",

  data() {
    return {
      data: '',
    };
  },

  filters: {
    imageSrc: function (value) {
      return "https://image.tmdb.org/t/p/w500/" + value;
    },

    imageAlt: function (value) {
      return value;
    },
  },

  created: function () {
      fetch('https://api.themoviedb.org/3/account/{account_id}/favorite/movies?api_key=' + this.$store.state.apikey + '&session_id=' + this.$store.state.sessionId + '&language=fr-FR&sort_by=created_at.asc&page=1')
        .then(result => result.json())
        .then(data => this.data = data) 
  },
};
</script>

<style scoped>
ul {
  list-style: none;
}

#listFavoris {
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
