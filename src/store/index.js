import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {

    searchResult: [],
    user: "",
    mdp: "",
    tokenFirst: "",
    tokenSecond: "",
    sessionId: "",
    favorisliste: '',
    acountId: '',
    apikey: '059776db5a1c39dd571e19ff2224eba0',
  },
  getters: {

  },
  mutations: {

    addacountId(state, value) {
      state.acountId = value
    },

    addsessionId(state, value) {
      state.sessionId = value
    },


    addSearch(state, value) {
      fetch(
          "https://api.themoviedb.org/3/search/movie?api_key=" + this.state.apikey + "&language=fr-FR&query=" +
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

  },
  actions: {

    getToken: function () {
      fetch(
          "https://api.themoviedb.org/3/authentication/token/new?api_key=" + this.state.apikey + ""
        )
        .then((result) => result.json())
        .then((data) => {
          this.state.tokenFirst = data.request_token;
          this.dispatch("getToken2")
        });
    },

    getToken2: function () {

      fetch(
          "https://api.themoviedb.org/3/authentication/token/validate_with_login?api_key=" + this.state.apikey, {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              'username': this.state.user,
              'password': this.state.mdp,
              'request_token': this.state.tokenFirst,
            }),
          }
        )
        .then((resulttok) => resulttok.json())
        .then((datatok) => {
          this.state.tokenSecond = datatok.request_token;
          this.dispatch("getSessionId")
        });
    },

    getSessionId: function () {
      fetch(
          "https://api.themoviedb.org/3/authentication/session/new?api_key=" + this.state.apikey, {
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
          this.dispatch('favoriList')
          this.dispatch('acountId')
          this.dispatch('pushDataLocalStorage')
        })
    },

    pushDataLocalStorage: function() {
      localStorage.setItem('login', JSON.stringify(this.state))
    },

    acountId: function () {
      fetch('https://api.themoviedb.org/3/account?api_key=' + this.state.apikey + '&session_id=' + this.state.sessionId)
        .then(result => result.json())
        .then(data => this.state.acountId = data.id)
    },

    favoriList: function () {
      fetch('https://api.themoviedb.org/3/account/{account_id}/favorite/movies?api_key=' + this.state.apikey + '&session_id=' + this.state.sessionId + '&language=fr-FR&sort_by=created_at.asc&page=1')
        .then(result => result.json())
        .then(data => this.state.favorisliste = data)
    },

    addToFavoris: function (context, value) {
      fetch('https://api.themoviedb.org/3/account/' + this.state.acountId + '/favorite?api_key=' + this.state.apikey+'&session_id='+this.state.sessionId, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          "media_type": "movie",
          "media_id": value,
          "favorite": true
        }),
      })
    },


    deletToFavoris: function (context, value) {
      fetch('https://api.themoviedb.org/3/account/' + this.state.acountId + '/favorite?api_key=' + this.state.apikey+'&session_id='+this.state.sessionId, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          "media_type": "movie",
          "media_id": value,
          "favorite": false
        }),
      })
    }


  },
  modules: {}
})