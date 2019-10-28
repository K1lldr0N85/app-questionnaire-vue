<template>
  <div id="app">
    <div id="nav">
      <b-button id="button"><router-link to="/">Commencer Test</router-link></b-button>
      <b-button id="button" class="button"><router-link to="/connexion">Administration</router-link></b-button>
    </div>
    <router-view/>
  </div>
</template>

<style lang="scss">
#button{
  background-color: #2a1a5e;
  border-color: #2a1a5e;
  width: 45%;
  padding-top : 2%;
  padding-bottom: 2%;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.button{
  margin-left: 5%;
}
#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: white;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
