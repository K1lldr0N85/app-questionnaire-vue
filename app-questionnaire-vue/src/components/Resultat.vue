<template>
  <div class="home">
    <div class="container">
      <div class="row">
        <div class="form-input">
           <div v-for="AMitem in AMresult " :key = AMitem class="groupeResult">
             <p> Question : {{AMitem['question']}}</p>
             <p>Attendu : {{AMitem['expected']}}</p>
             <div v-for="AMrep in AMitem['reponse'] " :key = AMrep>
               <div v-if="AMrep === AMitem['expected']" style="background-color:green" >
               <p>{{AMrep}}</p>
               </div>
               <div v-else style="background-color:red">
                 <p>{{AMrep}}</p>
               </div>
             </div>
            </div>
            <p class="score">Score : {{AMscore}}/{{AMtaille}}</p>
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
.score{
  margin-top:8%;
  font-size: 30px;
}
.groupeResult{
  margin-top: 10%;
  padding-top: 3%;
  border: solid;
  border-color: grey;
  background-color: white;
}
.validation{
  margin-top: 2%;
  margin-bottom: 5%;
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
import json from '../assets/question.json'
import PouchDB from 'pouchdb/dist/pouchdb.js'
export default {
  name: 'resultat',
  data () {
    return {
      AMmyJson: json, // variable contenant notre json
      AMresult: [], // variable contenant nos résultats
      AMscore: 0, // variable calculant le score
      AMitem: 0, // variable contenant les index d'un tableau
      AMtaille: 0, // variable contenant la taille d'un tableau
      AMbadresp: 0 // variable contenant le nombre de mauvaises répones
    }
  },
  created: function () {
    var AMdb = new PouchDB('app-questionnaire-vue')
    this.AMresult = this.$route.params.result
    console.log(this.AMresult)
    const AMresult = this.$route.params.result
    console.log(this.AMresult)
    // compteur pour savoir le nb de question
    let AMcompt = 0
    for (var AMitem in AMresult) {
      AMcompt = AMcompt + 1
      let tab = []
      // on ajoute au tableau les résultats
      for (var t in AMresult[AMitem]['reponse']) {
        tab.push(AMresult[AMitem]['reponse'][t])
      }
      if (AMresult[AMitem]['expected'] !== tab[0]) {
        this.AMbadresp = this.AMbadresp - 1
        console.log('bad' + this.AMbadresp)
      }
      this.AMscore = AMcompt + this.AMbadresp
      this.AMtaille = AMcompt
      console.log(this.response)
    }
    // insert dans la base du nom, prénom, societe du user ainsi que son score
    const AMdate = new Date()
    AMdb.put({
      _id: AMdate,
      nom: this.$route.params.nom,
      prenom: this.$route.params.prenom,
      societe: this.$route.params.societe,
      score: this.AMscore
    })
    AMdb.get(AMdate).then(function (doc) {
      console.log(doc)
    }).catch(function (err) {
      console.log(err)
    })
    // this.AMquestion.push(AMquestion)
    // console.log(this.AMquestion)
  },
  methods: {
    // quand click sur retour menu alors on renvoie vers le menu
    AMStart: function () {
      this.$router.push({ name: 'home' })
    }
  }
}
</script>
