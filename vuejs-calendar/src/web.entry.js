import Vue from 'vue';
import './style.scss';


//////////////////////////////
// 为了实现时间区的转换和格式化输出
//////////////////////////////
import moment from 'moment-timezone';
// 设置默认的时间TimeZone
moment.tz.setDefault("UTC");
// 设置一个 this.$moment ，就是将moment 加入到 Vue.prototype对象中
// 这样即使是在 components中也可以使用this.$moment
Object.defineProperty(Vue.prototype, '$moment', { get() { return this.$root.moment } });



import App from './components/App.vue';

new Vue({
  el: '#app',
  data: {
  	// 加入this.moment对象
  	moment
  },
  components: {
  	App
  }
});
