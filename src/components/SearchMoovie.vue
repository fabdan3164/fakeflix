<template>
  <div>
    <input v-model="searchName"  type="text"
    /><router-link  :to="{ name: 'search', params: { searchName: this.searchName } }"
      ><button @click="lookMovie" >rechercher</button></router-link>

  </div>
</template>

<script>
export default {
  name: "SearchMoovie",

  data() {
    return {
      searchName: '',
    };
  },
  
  methods:{
      lookMovie: function() {
        this.$store.commit('addSearch', this.searchName)
      }

  }
  


};

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->




