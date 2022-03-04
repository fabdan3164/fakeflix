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
        this.$store.commit('addUser', {user:this.user, mdp:this.mdp}),
        this.$store.commit('getToken')    
},

  //   getToken: function () {
  //     fetch(
  //       "https://api.themoviedb.org/3/authentication/token/new?api_key=059776db5a1c39dd571e19ff2224eba0"
  //     )
  //       .then((result) => result.json())
  //       .then((data) => {
  //         this.tokenFirst = data.request_token;
  //         console.log("data", data);
  //         this.getToken2();
  //       });
  //   },

  //   getToken2: function () {
  //     fetch(
  //       "https://api.themoviedb.org/3/authentication/token/validate_with_login?api_key=059776db5a1c39dd571e19ff2224eba0",
  //       {
  //         method: "POST",
  //         headers: {
  //           Accept: "application/json",
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify({
  //           username: this.user,
  //           password: this.mdp,
  //           request_token: this.tokenFirst,
  //         }),
  //       }
  //     )
  //       .then((resulttok) => resulttok.json())
  //       .then((datatok) => {
  //         this.tokenSecond = datatok.request_token;
  //         console.log(datatok.request_token);
  //         this.getSessionId();
  //       });
  //   },

  //   getSessionId: function () {
  //     fetch(
  //       "https://api.themoviedb.org/3/authentication/session/new?api_key=059776db5a1c39dd571e19ff2224eba0",
  //       {
  //         method: "POST",
  //         headers: {
  //           Accept: "application/json",
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify({
  //           request_token: this.tokenSecond,
  //         }),
  //       }
  //     )
  //       .then((resultses) => resultses.json())
  //       .then((datases) => {
  //     this. sessionId = datases.session_id;
  //       });
  //   },
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
