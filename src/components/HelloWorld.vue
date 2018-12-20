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
    Dec 17 2018   Fix refresh problem for the log window
                  Add some tech info and look @ Vuex getters from Vue
-->
<template>
  <div class="hello">
    <h2>{{ Version }}</h2>
    <h4>{{ getVersion }}</h4>
    <p class="time">The count is : {{fetchCount}} @ {{getTime}}</p>
    <div class="grid6">
      <span></span>
      <button class="btn btn-primary" @click='increment' :disabled=getRunningLimit>Increase</button>
      <button class="btn btn-primary" @click='decrement' :disabled=getRunningLimit>Decrease</button>
      <button class="btn btn-primary" @click='clearlog' :disabled=getRunning>Clear log</button>
      <span class="techinfo">Log size: {{getLogsSize}}</span>
      <span class="techinfo">Requests sent : {{getRequestsNumber}}</span>
    </div>
    <!--Track running actions -->
    <div class="running">
      <span></span>
      <ul id="requestedactions" v-for="request in getRequests" :key="request.id">
        <li>
          {{ request.label }} - {{ request.date }} REQID: {{ request.id }}
        </li>
      </ul> 
      <span></span>   
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

export default {
  name: 'Vuextutorial',
  data () {
    return {
      Version: 'vuex-tutorial, 1.76 Dec 18 2018',
      message: '',
      thelogsize: 0,
    }
  },
  computed: mapGetters( ['fetchCount', 'getVersion', 'getLogs', 
            'getLogsSize', 'getRunningLimit', 'getRunning', 
            'getRequests', 'getRequestsNumber', 'getTime'] ),
  methods: 
    mapActions([
      'increment',
      'decrement',
      'clearlog',
    ]),
  updated:
    function () {
      if (this.$store.state.logschanged) {
        this.thelogsize = this.$store.state.logs.length;
        this.$store.state.logschanged = false;
        let container = document.querySelector('.logging');
        let scrollHeight = container.scrollHeight;
        container.scrollTop = scrollHeight;
      }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.grid6 {
  display:grid;
  grid-gap: 10px; 
  grid-template-columns: repeat(6, 1fr);
  max-width: 70%;
  margin: auto;
}

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

.techinfo {
  text-align: center;
  color: darkblue;
  vertical-align: middle;
  font-size: 14px;
  padding-left: 20px;
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
