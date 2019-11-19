<template>
  <div class="home">
    <div class="container">
      <div class="row">
        <div class="form-input">
          <b-form-input  class="input" v-model="login" placeholder="Login"></b-form-input>
          <b-form-input  class="input" v-model="password" type="password" placeholder="Mot de Passe"></b-form-input>
          <!-- <div class="mt-2">Value: {{ text }}</div> -->
        </div>
      </div>
      <div class="validation">
          <b-button id="buttonValidate" v-on:click="VerificationUser">Valider</b-button>
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
        Administration: "/",
        login: "",
        password: ""
      }
    },
    methods: {
        VerificationUser: function () {
          var db = new PouchDB('app-questionnaire-vue')
          const login = this.login
          const password = this.password
          var context = this
          // db.find({
          //   selector: {login: this.login, password: this.password},
          //   fields: ['_id', 'login', 'password'],
          // }).then(function (result) {
          //    if( doc.login == login && doc.password == password ){
          //   console.log("easy")
          //   Administration = "/Administration"
          // }
          // }).catch(function (err) {
          //   console.log(err);
          // });
          db.get('1').then(function (doc) {
            console.log(doc)
            if( doc.login == login && doc.password == password ){
              console.log("easy")
              context.$router.push({ name: 'Administration' })
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
