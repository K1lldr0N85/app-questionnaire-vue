<template>
  <div class="home">
    <div class="container">
      <div class="row">
            <div>
                <b-form-group label="Voici la question hyper importante">
                <b-form-radio-group
                    id="radio-group-1"
                    v-model="selected"
                    :options="options"
                    name="radio-options"
                ></b-form-radio-group>
                </b-form-group>
                </div>
                <div class="validation">
                    <router-link to="/">
                    <b-button id="buttonValidate">Question Suivante</b-button>
                    </router-link>
                </div>
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
  margin-top: 10%;
  height: 35%;
  width: 50%;
  margin-right: auto !important;
  margin-left: auto !important;
}
</style>
<script>
export default {
  data () {
    return {
      selected: 'first',
      options: [
        { text: 'Réponse 1', value: 'first' },
        { text: 'Réponse 2', value: 'second' },
        { text: 'Réponse 3', value: 'third', disabled: true },
        { text: 'Réponse 4', value: { fourth: 4 } }
      ]
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
