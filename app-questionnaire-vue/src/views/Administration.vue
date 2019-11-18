<template>
  <div class="home">
    <div class="container">
      <div class="row">
        <div class="form-input">
           <div v-for="item in final " :key = item>
             <diV v-if=" item[0] !== null">
             {{item[0]}} / {{item[1]}} / {{item[3]}} / {{item[2]}}
             <!-- <p>{{item['Nom']}}  {{item['prenom']}} {{item['societe']}} {{item['score']}}</p> -->
             </div>
            </div>
        </div>
      </div>
      <div class="validation">
        <b-button id="button" v-on:click="Start">Retour menu</b-button>
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
  name: 'resultat',
  data () {
    return {
      result: [],
      nom: '',
      prenom: '',
      score: 0,
      societe: '',
      final: []
    }
  },
  created: function () {
    var db = new PouchDB('app-questionnaire-vue')
    var context = this
    this.resultPromise = db.allDocs({}).then(function (result) {
      for (var item in result) {
        for (var ind in item) {
          db.get(result['rows'][ind]['id']).then(function (doc) {
            context.nom = doc['nom']
            context.prenom = doc['prenom']
            context.score = doc['score']
            context.societe = doc['societe']
            context.result.push(context.nom, context.prenom, context.score, context.societe)
            context.final.push(context.result)
            console.log('final' + context.final)
            context.result = []
            console.log(result)
          }).catch(function (err) {
            console.log(err)
          })
        }
      }
      console.log(this.resultPromise)
    })
  },
  methods: {
    Start: function () {
      this.$router.push({ name: 'home' })
    }
  }
}
</script>
