<!-- 
    HelloWord.vue

    Dec 09 2018   Initial
    Dec 10 2018   Learn Getters, Actions, Mutations...

-->
<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h2>{{ Version }}</h2>
    <h1>the count is : {{ fetchCount }}</h1>
    <h4>{{ getVersion }}</h4>
    <button class="btn btn-primary" @click='increment'>Increase</button>
    <button class="btn btn-primary" @click='decrement'>Decrease</button>
    <div class="messagearea">
      {{ getStatus }}
    </div>
  </div>
</template>

<script>

import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'Vuextutorial',
  computed: mapGetters( ['fetchCount', 'getVersion', 'getStatus'] ),
  methods: mapActions([
    'increment',
    'decrement',
  ]),
  data () {
    return {
      msg: 'Welcome to vuex tutorial',
      Version: 'vuex-tutorial, 1.08 Dec 10 2018',
      message: '',
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.messagearea {
  color: blue;
}
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
