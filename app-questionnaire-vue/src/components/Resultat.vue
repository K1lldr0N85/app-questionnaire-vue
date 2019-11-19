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
      AMmyJson: json,
      AMresult: [],
      AMscore: 0,
      AMitem: 0,
      AMtaille: 0,
      AMbadresp: 0
    }
  },
  created: function () {
    var AMdb = new PouchDB('app-questionnaire-vue')
    // var db = new PouchDB('app-questionnaire-vue')
    this.AMresult = this.$route.params.result
    console.log(this.AMresult)
    const AMresult = this.$route.params.result
    console.log(this.AMresult)
    // console.log('test' + datee)
    // console.log(this.doc)
    // console.log(this.AMresult[0]['reponse'][0])
    let AMcompt = 0
    for (var AMitem in AMresult) {
      AMcompt = AMcompt + 1
      console.log('compteur' + AMcompt)
      let tab = []
      for (var t in AMresult[AMitem]['reponse']) {
        tab.push(AMresult[AMitem]['reponse'][t])
      }
      console.log('expect :' + AMresult[AMitem]['expected'])
      console.log('tab: ' + tab)
      if (AMresult[AMitem]['expected'] !== tab[0]) {
        this.AMbadresp = this.AMbadresp - 1
        console.log('bad' + this.AMbadresp)
      }
      this.AMscore = AMcompt + this.AMbadresp
      this.AMtaille = AMcompt
      console.log(this.response)
    }
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
    AMStart: function () {
      this.$router.push({ name: 'home' })
    }
  }
}
</script>
