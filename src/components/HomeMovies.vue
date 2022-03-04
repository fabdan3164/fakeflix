<template>
  <div class="home">
    <ul id="resultSearch">
      <li>
        <img
          v-if="lastMovies.poster_path != null"
          :src="lastMovies.poster_path | imageSrc"
          alt=""
        />
        <img
          v-if="lastMovies.poster_path === null"
          :src="require('@/assets/pellicule.png')"
          alt=""
        />
        {{ lastMovies.original_title }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "HomeMovies",

  data() {
    return {
      lastMovies: [],
    };
  },

  filters: {
    imageSrc: function (value) {
      return "https://image.tmdb.org/t/p/w500/" + value;
    },
  },

  created: function () {
    fetch(
      "https://api.themoviedb.org/3/movie/latest?api_key=059776db5a1c39dd571e19ff2224eba0&language=fr-FR"
    )
      .then((result) => result.json())
      .then((data) => (this.lastMovies = data));

 
  },
};
</script>

<style scoped>
ul {
  list-style: none;
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
