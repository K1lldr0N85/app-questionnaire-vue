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
export default {
  data () {
    return {
      AMcompteur: 0, // variable servant de compteur
      AMbutton: 'Question Suivante', // variable contenant le libelle du button
      AMquestion: '', // variable initialisant le question vide
      AMcompt: Math.floor(Math.random() * length), // variable aléatoire pour le choix des questions
      AMmyJson: json, // variable contenant le json
      AMselected: [], // variable contenant l'élément sélectionné
      AMoptions: [], // variable contenant les options
      AMquestionUse: [], // variable contenant la question utilisé
      AMresult: [] // variable contenant les résultats
    }
  },
  created: function () {
    // Lors de la création on initialise la première question ainsi que ses options
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
    // La méthode suivante est appelé lorsque l'on passe à la question suivante
    AMnext: function () {
      var AMcontext = this
      // on stocke la question qui est utilisé
      this.AMquestionUse.push(this.AMcompt)
      // on stock le ou les résutats
      this.AMresult.push({
        question: this.AMmyJson[this.AMcompt]['question'],
        reponse: this.AMselected,
        expected: this.AMmyJson[this.AMcompt]['expected']
      })
      this.AMselected = []
      // incrémentation du compteur afin de n'avoir que 5 questions dans le test
      this.AMcompteur = this.AMcompteur + 1
      if (this.AMcompteur === 4) {
        this.AMbutton = 'Terminer le test'
      }
      // si le test est fini on redirige le user vers son résultat sinon on crée la nouvelle question ainsi que ses options
      if (this.AMcompteur === this.AMmyJson.length) {
        AMcontext.$router.push({ name: 'resultat', params: { result: this.AMresult, nom: this.$route.params.nom, prenom: this.$route.params.prenom, societe: this.$route.params.societe } })
      } else {
        while (this.AMquestionUse.includes(this.AMcompt)) {
          this.AMcompt = Math.floor(Math.random() * this.AMmyJson.length)
        }
        this.AMquestion = this.AMmyJson[this.AMcompt]['question']
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
