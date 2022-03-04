<template>
  <div class="home">
  
    <HomeMovies/>
   
  </div>
</template>

<script>
// @ is an alias to /src
import HomeMovies from '@/components/HomeMovies.vue'


export default {
  name: 'HomeView',
  components: {
    HomeMovies
  }
}
</script>
