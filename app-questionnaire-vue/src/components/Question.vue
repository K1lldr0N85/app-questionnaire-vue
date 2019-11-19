<template>
  <div class="home">
    <div class="container">
      <div class="row">
            <div class="question">
              <p v-text="question"></p>
                <b-form-group class="rep">
                  <b-form-checkbox-group
                    v-model="selected"
                    :options="options"
                    plain
                  ></b-form-checkbox-group>
              </b-form-group>
            </div>
            </div>
            <div class="validation">
                    <b-button id="buttonValidate" v-text="button" v-on:click="next"></b-button>
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
      compteur: 0,
      button: 'Question Suivante',
      question: '',
      compt: Math.floor(Math.random() * length),
      myJson: json,
      selected: [],
      options: [],
      questionUse: [],
      result: []
    }
  },
  created: function () {
    // this.questionUse.push(this.compt)
    this.question = this.myJson[this.compt]['question']
    // this.selected = this.myJson[this.compt]['reponse1']
    this.options = [
      { text: this.myJson[this.compt]['reponse1'], value: this.myJson[this.compt]['reponse1'] },
      { text: this.myJson[this.compt]['reponse2'], value: this.myJson[this.compt]['reponse2'] },
      { text: this.myJson[this.compt]['reponse3'], value: this.myJson[this.compt]['reponse3'] },
      { text: this.myJson[this.compt]['reponse4'], value: this.myJson[this.compt]['reponse4'] }
    ]
    console.log(this)
  },
  methods: {
    next: function () {
      console.log(this.options)
      var context = this
      this.questionUse.push(this.compt)
      this.result.push({
        question: this.myJson[this.compt]['question'],
        reponse: this.selected,
        opt: this.options,
        expected: this.myJson[this.compt]['expected']
      })
      console.log(this.options)
      this.selected = []
      // console.log(this.result)
      this.compteur = this.compteur + 1
      if (this.compteur === 4) {
        this.button = 'Terminer le test'
      }
      if (this.compteur === this.myJson.length) {
        // var db = new PouchDB('app-questionnaire-vue')
        // const date = new Date()
        // db.put({
        //   _id: date,
        //   nom: this.$route.params.nom,
        //   prenom: this.$route.params.prenom,
        //   societe: this.$route.params.societe,
        //   questionUse: this.questionUse,
        //   result: this.result
        // })
        // db.get(date).then(function (doc) {
        //   console.log(doc)
        // }).catch(function (err) {
        //   console.log(err)
        // })
        context.$router.push({ name: 'resultat', params: { result: this.result, nom: this.$route.params.nom, prenom: this.$route.params.prenom, societe: this.$route.params.societe } })
      } else {
        while (this.questionUse.includes(this.compt)) {
          this.compt = Math.floor(Math.random() * this.myJson.length)
        }
        this.question = this.myJson[this.compt]['question']
        // this.selected = this.myJson[this.compt]['reponse1']
        this.options = [
          { text: this.myJson[this.compt]['reponse1'], value: this.myJson[this.compt]['reponse1'] },
          { text: this.myJson[this.compt]['reponse2'], value: this.myJson[this.compt]['reponse2'] },
          { text: this.myJson[this.compt]['reponse3'], value: this.myJson[this.compt]['reponse3'] },
          { text: this.myJson[this.compt]['reponse4'], value: this.myJson[this.compt]['reponse4'] }
        ]
      }
    }
  }
}
</script>
