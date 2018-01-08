// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App.vue';
import router from './router';
import './style.scss';
import store from './store';


import moment from 'moment-timezone';
// 设置默认的时间TimeZone
moment.tz.setDefault("UTC");
// 设置一个 this.$moment ，就是将moment 加入到 Vue.prototype对象中
// 这样即使是在 components中也可以使用this.$moment
Object.defineProperty(Vue.prototype, '$moment', { get() { return this.$root.moment } });

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  data: { moment },
  template: '<App/>',
  components: { App },
  store
});
