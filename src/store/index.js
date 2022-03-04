import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    favoris: [],
    dataFavoris: [],
    searchResult: [],
    user: "",
    mdp: "",
    tokenFirst: "",
    tokenSecond: "",
    sessionId: "",
  },
  getters: {

  },
  mutations: {



    addFavoris(state, newvalue) {
      if (!state.favoris.includes(newvalue)) {
        state.favoris.push(newvalue);
        fetch(
            "https://api.themoviedb.org/3/movie/" +
            newvalue +
            "?api_key=059776db5a1c39dd571e19ff2224eba0&language=fr-FR"
          )
          .then((result) => result.json())
          .then((data) => state.dataFavoris.push(data))
      }
    },

    addSearch(state, value) {
      console.log('baladsfgj')
      fetch(
          "https://api.themoviedb.org/3/search/movie?api_key=059776db5a1c39dd571e19ff2224eba0&language=fr-FR&query=" +
          value +
          "&include_adult=false"
        )
        .then((result) => result.json())
        .then((data) => (state.searchResult = data.results));
    },

    addUser(state, value) {
      state.user = value.user
      state.mdp = value.mdp
    },

    getToken: function () {
      fetch(
          "https://api.themoviedb.org/3/authentication/token/new?api_key=059776db5a1c39dd571e19ff2224eba0"
        )
        .then((result) => result.json())
        .then((data) => {
          this.state.tokenFirst = data.request_token;
          this.getToken2()
        });
    },

    getToken2: function () {
      console.log('token2')
      fetch(
          "https://api.themoviedb.org/3/authentication/token/validate_with_login?api_key=059776db5a1c39dd571e19ff2224eba0", {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              username: this.state.user,
              password: this.state.mdp,
              request_token: this.state.tokenFirst,
            }),
          }
        )
        .then((resulttok) => resulttok.json())
        .then((datatok) => {
          this.state.tokenSecond = datatok.request_token;
          console.log(datatok.request_token);
        });
    },

    getSessionId: function () {
      fetch(
          "https://api.themoviedb.org/3/authentication/session/new?api_key=059776db5a1c39dd571e19ff2224eba0", {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              request_token: this.state.tokenSecond,
            }),
          }
        )
        .then((resultses) => resultses.json())
        .then((datases) => {
          this.state.sessionId = datases.session_id;
        });
    },

  },
  actions: {



  },
  modules: {}
})