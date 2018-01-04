import Vue from 'vue';
import './style.scss';
import store from './store'



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

let events = [
 		{ description: "水星西大距", date: moment('2018-01-02', 'YYYY-MM-DD') },
		{ description: "满月", date: moment('2018-01-02', 'YYYY-MM-DD') },
		{ description: "地球过近日点", date: moment('2018-01-03', 'YYYY-MM-DD') },
		{ description: "象限仪座流星雨", date: moment('2018-01-04', 'YYYY-MM-DD') },
		{ description: "下弦月", date: moment('2018-01-09', 'YYYY-MM-DD') },
		{ description: "木星合月", date: moment('2018-01-11', 'YYYY-MM-DD') },
		{ description: "土星合月", date: moment('2018-01-15', 'YYYY-MM-DD') },
		{ description: "新月", date: moment('2018-01-17', 'YYYY-MM-DD') },
		{ description: "上弦月", date: moment('2018-01-25', 'YYYY-MM-DD') },
		{ description: "月掩毕宿五", date: moment('2018-01-27', 'YYYY-MM-DD') },
		{ description: "满月", date: moment('2018-01-31', 'YYYY-MM-DD') },
		{ description: "月全食", date: moment('2018-01-31', 'YYYY-MM-DD') }
];
// need to replace every state objects
// Object.assign ( Target, source, source2) 会讲两个对象合并成一个
let initialState = Object.assign({},store.state, { events });
// console.log(initialState);
// 然后将合并后的结果替换原有的store.state中
store.replaceState(initialState);

new Vue({
  el: '#app',
  data: {
  	// 加入this.moment对象
  	moment
  },
  components: {
  	App
  },
  store
});
