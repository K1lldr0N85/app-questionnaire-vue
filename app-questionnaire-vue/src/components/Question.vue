<template>
  <div class="home">
    <div class="container">
      <div class="row">
            <div class="question">
              <p v-text="AMquestion"></p>
                <b-form-group class="rep">
                  <b-form-checkbox-group
                    v-model="AMselected"
                    :options="AMoptions"
                    plain
                  ></b-form-checkbox-group>
              </b-form-group>
            </div>
            </div>
            <div class="validation">
                    <b-button id="buttonValidate" v-text="AMbutton" v-on:click="AMnext"></b-button>
                </div>
        </div>
    </div>
</template>
<style>
#buttonValidate{
    background-color: #2a1a5e;
}
.question{
  padding-top: 15%;
  margin-right: auto !important;
  margin-left: auto !important;
}
.rep{
  padding-top: 5%;
}
.validation{
  margin-top: 8%;
}
.input{
 margin-top: 5% !important;
 text-align: center ! important;
}
.form-input{
  margin-top: 10%;
  height: 35%;
  width: 50%;
  margin-right: auto !important;
  margin-left: auto !important;
}
</style>
<script>
import json from '../assets/question.json'
// import PouchDB from 'pouchdb/dist/pouchdb.js'
export default {
  data () {
    return {
      AMcompteur: 0,
      AMbutton: 'Question Suivante',
      AMquestion: '',
      AMcompt: Math.floor(Math.random() * length),
      AMmyJson: json,
      AMselected: [],
      AMoptions: [],
      AMquestionUse: [],
      AMresult: []
    }
  },
  created: function () {
    // this.AMquestionUse.push(this.AMcompt)
    this.AMquestion = this.AMmyJson[this.AMcompt]['question']
    // this.AMselected = this.AMmyJson[this.AMcompt]['reponse1']
    this.AMoptions = [
      { text: this.AMmyJson[this.AMcompt]['reponse1'], value: this.AMmyJson[this.AMcompt]['reponse1'] },
      { text: this.AMmyJson[this.AMcompt]['reponse2'], value: this.AMmyJson[this.AMcompt]['reponse2'] },
      { text: this.AMmyJson[this.AMcompt]['reponse3'], value: this.AMmyJson[this.AMcompt]['reponse3'] },
      { text: this.AMmyJson[this.AMcompt]['reponse4'], value: this.AMmyJson[this.AMcompt]['reponse4'] }
    ]
    console.log(this)
  },
  methods: {
    AMnext: function () {
      console.log(this.AMoptions)
      var AMcontext = this
      this.AMquestionUse.push(this.AMcompt)
      this.AMresult.push({
        question: this.AMmyJson[this.AMcompt]['question'],
        reponse: this.AMselected,
        opt: this.AMoptions,
        expected: this.AMmyJson[this.AMcompt]['expected']
      })
      console.log(this.AMoptions)
      this.AMselected = []
      // console.log(this.AMresult)
      this.AMcompteur = this.AMcompteur + 1
      if (this.AMcompteur === 4) {
        this.AMbutton = 'Terminer le test'
      }
      if (this.AMcompteur === this.AMmyJson.length) {
        // var db = new PouchDB('app-questionnaire-vue')
        // const date = new Date()
        // db.put({
        //   _id: date,
        //   AMnom: this.$route.params.AMnom,
        //   prenom: this.$route.params.prenom,
        //   societe: this.$route.params.societe,
        //   AMquestionUse: this.AMquestionUse,
        //   AMresult: this.AMresult
        // })
        // db.get(date).then(function (doc) {
        //   console.log(doc)
        // }).catch(function (err) {
        //   console.log(err)
        // })
        AMcontext.$router.push({ name: 'resultat', params: { result: this.AMresult, nom: this.$route.params.nom, prenom: this.$route.params.prenom, societe: this.$route.params.societe } })
      } else {
        while (this.AMquestionUse.includes(this.AMcompt)) {
          this.AMcompt = Math.floor(Math.random() * this.AMmyJson.length)
        }
        this.AMquestion = this.AMmyJson[this.AMcompt]['question']
        // this.AMselected = this.AMmyJson[this.AMcompt]['reponse1']
        this.AMoptions = [
          { text: this.AMmyJson[this.AMcompt]['reponse1'], value: this.AMmyJson[this.AMcompt]['reponse1'] },
          { text: this.AMmyJson[this.AMcompt]['reponse2'], value: this.AMmyJson[this.AMcompt]['reponse2'] },
          { text: this.AMmyJson[this.AMcompt]['reponse3'], value: this.AMmyJson[this.AMcompt]['reponse3'] },
          { text: this.AMmyJson[this.AMcompt]['reponse4'], value: this.AMmyJson[this.AMcompt]['reponse4'] }
        ]
      }
    }
  }
}
</script>
