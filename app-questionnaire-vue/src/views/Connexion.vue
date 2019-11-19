<template>
  <div class="home">
    <div class="container">
      <div class="row">
        <div class="form-input">
          <b-form-input class="input" v-model="AMlogin" placeholder="Login"></b-form-input>
          <b-form-input class="input" v-model="AMpassword" type="password" placeholder="Mot de Passe"></b-form-input>
          <!-- <div class="mt-2">Value: {{ text }}</div> -->
        </div>
      </div>
      <div class="validation">
          <b-button id="buttonValidate" v-on:click="AMVerificationUser">Valider</b-button>
        </div>
    </div>
  </div>
</template>

<style>
#buttonValidate{
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
  margin-top: 10% !important;
  height: 35%;
  width: 50%;
  margin-right: auto !important;
  margin-left: auto !important;
  color:black;
}
</style>
<script src="https://cdnjs.cloudflare.com/ajax/libs/vue/2.0.5/vue.min.js"></script>
<script src="pouchdb.find.js"></script>
<script>
import PouchDB from 'pouchdb/dist/pouchdb.js'

export default {
  name: 'home',
    data() {
      return {
        AMAdministration: "/",
        AMlogin: "",
        AMpassword: ""
      }
    },
    methods: {
        AMVerificationUser: function () {
          // vérifie si l'utilisateur est admin
          var AMdb = new PouchDB('app-questionnaire-vue')
          const AMlogin = this.AMlogin
          const AMpassword = this.AMpassword
          var AMcontext = this
          // db.find({
          //   selector: {AMlogin: this.AMlogin, AMpassword: this.AMpassword},
          //   fields: ['_id', 'AMlogin', 'AMpassword'],
          // }).then(function (AMresult) {
          //    if( doc.AMlogin == AMlogin && doc.AMpassword == AMpassword ){
          //   console.log("easy")
          //   AMAdministration = "/AMAdministration"
          // }
          // }).catch(function (err) {
          //   console.log(err);
          // });
          AMdb.get('1').then(function (doc) {
            console.log(doc)
            // si le login et le password correspond alors on peut rediriger
            if( doc.login == AMlogin && doc.password == AMpassword ){
              // redirection vers l'administration
              AMcontext.$router.push({ name: 'Administration' })
            }
          }).catch(function (err) {
            console.log(err)
          })
        }
    }
}
</script>
<!-- <script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'home',
  components: {
    HelloWorld
  }
}
</script>-->
