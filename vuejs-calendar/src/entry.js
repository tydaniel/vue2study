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

export default function(events) {
	// need to replace every state objects
	// Object.assign ( Target, source, source2) 会讲两个对象合并成一个
	// let initialState = Object.assign({},store.state, { events: windows.__INITIAL_STATE__ });
	let initialState = Object.assign({},store.state, { events });
	// console.log(initialState);
	// 然后将合并后的结果替换原有的store.state中
	store.replaceState(initialState);

	return new Vue({
	  // Server redner不需要指定element的名字
	  // el: '#app',
	  data: {
	  	// 加入this.moment对象
	  	moment
	  },
	  components: {
	  	App
	  },
	  store
	});
}