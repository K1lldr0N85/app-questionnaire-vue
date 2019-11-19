<template>
  <div class="home">
    <div class="container">
      <div class="row">
        <div class="form-input">
           <div v-for="AMitem in AMfinal " :key = AMitem>
             <diV v-if=" AMitem[0] !== null">
               <div class="affichage">{{AMitem[0]}} / {{AMitem[1]}} / {{AMitem[3]}} / {{AMitem[2]}}</div>
             <!-- <p>{{AMitem['Nom']}}  {{AMitem['prenom']}} {{AMitem['societe']}} {{AMitem['AMscore']}}</p> -->
             </div>
            </div>
        </div>
      </div>
      <div class="validation">
        <b-button id="button" v-on:click="AMStart">Retour menu</b-button>
      </div>
    </div>
  </div>
</template>
<style>
#button{
  background-color: #2a1a5e;
}
.affichage{
  border: solid;
  border-color: grey;
  margin-top: 3%;
}
.validation{
  margin-top: 8%;
}
.input{
 margin-top: 5% !important;
 text-align: center ! important;
}
.form-input{
  margin-top: 5% !important;
  height: 35%;
  width: 50%;
  margin-right: auto !important;
  margin-left: auto !important;
}
</style>
<script>
import PouchDB from 'pouchdb/dist/pouchdb.js'
export default {
  AMname: 'resultat',
  data () {
    return {
      AMresult: [],
      AMnom: '',
      AMprenom: '',
      AMscore: 0,
      AMsociete: '',
      AMfinal: []
    }
  },
  created: function () {
    var AMdb = new PouchDB('app-questionnaire-vue')
    var AMcontext = this
    this.resultPromise = AMdb.allDocs({}).then(function (AMresult) {
      for (var AMitem in AMresult) {
        for (var AMind in AMitem) {
          AMdb.get(AMresult['rows'][AMind]['id']).then(function (doc) {
            AMcontext.AMnom = doc['nom']
            AMcontext.AMprenom = doc['prenom']
            AMcontext.AMscore = doc['score']
            AMcontext.AMsociete = doc['societe']
            AMcontext.AMresult.push(AMcontext.AMnom, AMcontext.AMprenom, AMcontext.AMscore, AMcontext.AMsociete)
            AMcontext.AMfinal.push(AMcontext.AMresult)
            AMcontext.AMresult = []
          })
        }
      }
    })
  },
  methods: {
    AMStart: function () {
      this.$router.push({ name: 'home' })
    }
  }
}
</script>
