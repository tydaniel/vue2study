<template>
  <div id="app">
    <div id="title">
        <img src="/src/assets/logo.png">
        <h1>Vue.js Cinema</h1>
    </div>
    <keep-alive>
      <!-- 通过router-view读取路由表中对应的component -->
      <router-view v-bind:genre="genre" 
                   v-bind:time="time" 
                   v-bind:movies="movies" 
                   v-bind:day="day"
      ></router-view>
    </keep-alive>
  </div>
</template>

<script>
import Vue from 'vue';

export default {
  name: 'app',
  props: [ 
           "genre", 
           "time", 
           "movies", 
           "day", 
           "bus" 
         ]
}
</script>
