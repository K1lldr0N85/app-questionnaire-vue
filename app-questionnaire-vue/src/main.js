import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import PouchDB from 'pouchdb/dist/pouchdb.js'

Vue.use(BootstrapVue)
Vue.config.productionTip = false
var db = new PouchDB('app-questionnaire-vue')
// db.destroy()
db.put({
  _id: '1',
  login: 'alois',
  password: 'mdp'
})
db.get('1').then(function (doc) {
  console.log(doc)
}).catch(function (err) {
  console.log(err)
})

db.replicate.to('http://127.0.0.1:3306/useradmin')
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
