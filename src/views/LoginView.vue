<template>
  <div class="login">
    <h4>Login</h4>
    <label for="user">User</label>
    <input v-model="user" id="user" type="text" />
    <br />
    <label for="mdp">MDP</label>
    <input v-model="mdp" id="mdp" type="password" />
    <br />
    <button @click="getToken">Valider</button>
  </div>
</template>

<script>
export default {
  name: "LoginView",

  data() {
    return {
      user: "",
      mdp: "",
    };
  },

  methods: {
    getToken: function () {
      this.$store.commit("addUser", { user: this.user, mdp: this.mdp }),
      this.$store.dispatch('getToken')
    },
  },
};
</script>

<style scoped>
.login {
  color: white;
}

ul {
  list-style: none;
}

input {
  margin: 10px;
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
