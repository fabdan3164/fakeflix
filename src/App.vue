<template>
  <div id="app">

    <h1>FAKEFLIX</h1>
    <nav>
      <router-link to="/">Accueil</router-link> |
      <router-link to="/about">Favoris</router-link> |
        <router-link to="/LoginView">Login</router-link> |
       <SearchMoovie/>
    </nav>
    <router-view/>
  </div>
</template>
<script>
import SearchMoovie from './components/SearchMoovie.vue'


export default {
  components: {
    SearchMoovie,
  },


  created: function (){
  var local_Storage = JSON.parse(localStorage.getItem('login'))
  this.$store.commit("addacountId", local_Storage.acountId)
  this.$store.commit("addsessionId", local_Storage.sessionId)
  },
}


</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
  display: flex;
  justify-content: space-between;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: white;
}


nav {
  background-color: grey;
}

h1 {
  color: red;
}
body {
  background-color: black;
}
</style>
