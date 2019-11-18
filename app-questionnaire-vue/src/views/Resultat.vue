<template>
  <div class="home">
    <div class="container">
      <div class="row">
        <div class="form-input">
           <div v-for="item in result " :key = item>
             <p> Question : {{item['question']}}</p>
             <p>Attendu : {{item['expected']}}</p>
             <div v-for="rep in item['reponse'] " :key = rep>
               <div v-if="rep === item['expected']" style="background-color:green" >
               <p>{{rep}}</p>
               </div>
               <div v-else style="background-color:red">
                 <p>{{rep}}</p>
               </div>
             </div>
            </div>
            <p>Score : {{score}}/{{taille}}</p>
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
// import PouchDB from 'pouchdb/dist/pouchdb.js'
import json from '../assets/question.json'
import PouchDB from 'pouchdb/dist/pouchdb.js'
export default {
  name: 'resultat',
  data () {
    return {
      myJson: json,
      result: [],
      score: 0,
      item: 0,
      taille: 0,
      badresp: 0
    }
  },
  created: function () {
    var db = new PouchDB('app-questionnaire-vue')
    // var db = new PouchDB('app-questionnaire-vue')
    this.result = this.$route.params.result
    const result = this.$route.params.result
    console.log(this.result)
    // console.log('test' + datee)
    // console.log(this.doc)
    // console.log(this.result[0]['reponse'][0])
    let compt = 0
    for (var item in result) {
      compt = compt + 1
      console.log('compteur' + compt)
      let tab = []
      for (var t in result[item]['reponse']) {
        tab.push(result[item]['reponse'][t])
      }
      console.log('expect :' + result[item]['expected'])
      console.log('tab: ' + tab)
      if (result[item]['expected'] !== tab[0]) {
        this.badresp = this.badresp - 1
        console.log('bad' + this.badresp)
      }
      this.score = compt + this.badresp
      this.taille = compt
      console.log(this.response)
    }
    const date = new Date()
    db.put({
      _id: date,
      nom: this.$route.params.nom,
      prenom: this.$route.params.prenom,
      societe: this.$route.params.societe,
      score: this.score
    })
    db.get(date).then(function (doc) {
      console.log(doc)
    }).catch(function (err) {
      console.log(err)
    })
    // this.question.push(question)
    // console.log(this.question)
  },
  methods: {
    Start: function () {
      this.$router.push({ name: 'home' })
    }
  }
}
</script>
