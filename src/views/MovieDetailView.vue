<template>
  <div class="MovieDetail">
    <h2>{{ MovieSelect.original_title }}</h2>
    <div class="fetch">
      <div>
        <img
          v-if="MovieSelect.poster_path === null"
          :src="require('@/assets/pellicule.png')"
          :alt="MovieSelect.original_title | imageAlt"
        />

        <img
          v-if="MovieSelect.poster_path != null"
          :src="MovieSelect.poster_path | imageSrc"
          :alt="MovieSelect.original_title | imageAlt"
        />
      </div>
      <div>
        <h4>Informations</h4>
        <p>{{ MovieSelect.overview }}</p>
        <ul>
          <li>Popularité : {{ MovieSelect.popularity }}</li>
          <li>Note : {{ MovieSelect.vote_average }}/10</li>
          <li>Nombre de vote : {{ MovieSelect.vote_count }}</li>
        </ul>
      </div>
    </div>
    <div class="fetch">
      <button @click="addToFavoris">Ajouter aux favoris</button>
      <button>Ajouter aux "A voir"</button>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
export default {
  name: "MovieDetailView",

  data() {
    return {
      MovieSelect: {},
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
    fetch(
      "https://api.themoviedb.org/3/movie/" +
        this.$route.params.id +
        "?api_key=059776db5a1c39dd571e19ff2224eba0&language=fr-FR"
    )
      .then((result) => result.json())
      .then((data) => (this.MovieSelect = data));
  },
  methods: {
    addToFavoris() {
      this.$store.dispatch('addToFavoris', this.MovieSelect.id)
   },
  },
};
</script> 

<style scoped>
.MovieDetail {
  color: white;
  width: 1000px;
  margin: 30px auto;
}

p {
  text-align: justify;
  margin-bottom: 30px;
}

.fetch {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

img {
  width: 300px;
  height: auto;
  margin: 10px;
}

button {
  background-color: rgb(0, 177, 66);
  height: 30px;
}

li {
  text-align: left;
}
</style>
