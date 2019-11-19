<template>
  <div class="home">
    <div class="container">
      <div class="row">
        <div class="form-input">
          <b-form-input class="input" v-model="AMnom" placeholder="Nom"></b-form-input>
          <b-form-input class="input" v-model="AMprenom" placeholder="Prénom"></b-form-input>
          <b-form-input class="input" v-model="AMnomSociete" placeholder="Nom de la Société"></b-form-input>
          <!-- <div class="mt-2">Value: {{ text }}</div> -->
        </div>
      </div>
      <div class="validation">
        <b-button id="button" v-on:click="AMStart">Commencer le Test</b-button>
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
// import PouchDB from 'pouchdb/dist/pouchdb.js'
export default {
  name: 'home',
  data () {
    return {
      AMnom: '', // variable contenant le nom de la personne du test
      AMprenom: '', // variable contenant le prénom de la personne du test
      AMnomSociete: '' // variable contenant la société de la personne du test
    }
  },
  methods: {
    // on lance le test
    AMStart: function () {
      this.$router.push({ name: 'question', params: { nom: this.AMnom, prenom: this.AMprenom, societe: this.AMnomSociete } })
    }
  }
}
</script>
