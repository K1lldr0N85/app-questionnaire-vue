<template>
  <div class="home">
    <div class="container">
      <div class="row">
        <div class="form-input">
          <b-form-input class="input" v-model="nom" placeholder="Nom"></b-form-input>
          <b-form-input class="input" v-model="prenom" placeholder="Prénom"></b-form-input>
          <b-form-input class="input" v-model="nomSociete" placeholder="Nom de la Société"></b-form-input>
          <!-- <div class="mt-2">Value: {{ text }}</div> -->
        </div>
      </div>
      <div class="validation">
        <router-link to="/Question">
        <b-button id="button" v-on:click="Start">Commencer le Test</b-button>
        </router-link>
      </div>
    </div>
  </div>
</template>
<style>
#button{
  background-color: #2a1a5e;
}
.validation{
  margin-top: 8%;
}
.input{
 margin-top: 5% !important;
 text-align: center ! important;
}
.form-input{
  margin-top: 3% !important;
  height: 35%;
  width: 50%;
  margin-right: auto !important;
  margin-left: auto !important;
}
</style>
<script>
import PouchDB from 'pouchdb/dist/pouchdb.js'
export default {
  name: 'home',
  data () {
    return {
      nom: '',
      prenom: '',
      nomSociete: ''
    }
  },
  methods: {
    Start: function () {
      var db = new PouchDB('app-questionnaire-vue')
      db.put({
        _id: '3',
        name: this.nom,
        surname: this.prenom,
        nameS: this.nomSociete
      })
      db.get('3').then(function (doc) {
        console.log(doc)
      }).catch(function (err) {
        console.log(err)
      })
    }
  }
}
</script>
