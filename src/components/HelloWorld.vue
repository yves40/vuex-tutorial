<!-- 
    HelloWord.vue

    Dec 09 2018   Initial
    Dec 10 2018   Learn Getters, Actions, Mutations...
    Dec 11 2018   Play with some vue features
    Dec 12 2018   Manage buttons
    Dec 13 2018   Log window 
    Dec 14 2018   Log window size and scroll, 1st tests 
    Dec 15 2018   Scroll log window to bottom when full
                  Clear log button. Problem with scroll every second

-->
<template>
  <div class="hello">
    <h2>{{ Version }}</h2>
    <h4>{{ getVersion }}</h4>
    <p class="time">The count is : {{fetchCount}} @ {{getTime}} : Log size: {{getLogsSize}}</p>
    <button class="btn btn-primary" @click='increment' :disabled=getRunningLimit>Increase</button>
    <button class="btn btn-primary" @click='decrement' :disabled=getRunningLimit>Decrease</button>
    <button class="btn btn-primary" @click='clearlog' :disabled=getRunning>Clear log</button>
    <!--Track running actions -->
    <div class="running">
      <ul id="requestedactions" v-for="request in getRequests" :key="request.id">
        <li>
          {{ request.label }} - {{ request.date }} REQID: {{ request.id }}
        </li>
      </ul>    
    </div>
    <!--Logs -->
    <div class="logging">
      <ul id="requestedactions" v-for="log in getLogs" :key="log.id" >
        <li>
          {{ log.date }}: {{ log.message }}
        </li>
      </ul>    
    </div>
  </div>
</template>

<script>

import { mapGetters, mapActions } from 'vuex';
import { store } from '../../store/store';

export default {
  name: 'Vuextutorial',
  computed: mapGetters( ['fetchCount', 'getVersion', 'getLogs', 'getLogsSize', 'getRunningLimit', 'getRunning', 'getRequests', 'getTime'] ),
  methods: 
    mapActions([
      'increment',
      'decrement',
      'clearlog',
    ]),
  updated:
    function () {
      this.thelogsize = store.state.logs.length;
      var container = document.querySelector('.logging');
      var scrollHeight = container.scrollHeight;
      container.scrollTop = scrollHeight;
  },
  data () {
    return {
      Version: 'vuex-tutorial, 1.58 Dec 15 2018',
      message: '',
      thelogsize: 0,
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.running {
  background-color: #337ab7;
  color: white;
  text-align: left;
  vertical-align: middle;
  border: 1px;
  border-radius: 4px;
  padding: 10px 20px 10px 20px;
  margin: 10px 20px 0px 20px;
  height: 120px;
  overflow: auto;
}

.logging {
  background-color: #337ab7;
  color: white;
  text-align: left;
  vertical-align: middle;
  border: 1px;
  border-radius: 4px;
  padding: 10px 20px 10px 20px;
  margin: 10px 20px 0px 20px;
  height: 300px;
  overflow: auto;
}

#requestedactions {
  padding: 0 0 0 0 ;
  margin: 2px 10px 0px 10px;
}

.time {
    letter-spacing: 0.05em;
    font-size: 30px;
    padding: 5px 0;
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
