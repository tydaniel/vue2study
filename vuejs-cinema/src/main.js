import Vue from 'vue';
import './style.scss';
import genres from './util/genres';

import MovieList from './components/MovieList.vue';
import MovieFilter from './components/MovieFilter.vue';

import VueResource from 'vue-resource';
Vue.use(VueResource);

// 为了实现时间区的转换和格式化输出
import moment from 'moment-timezone';
// 设置默认的时间TimeZone
moment.tz.setDefault("UTC");
// 设置一个 this.$moment ，就是将moment 加入到 Vue.prototype对象中
// 这样即使是在 components中也可以使用this.$moment
Object.defineProperty(Vue.prototype, '$moment', { get() { return this.$root.moment } });

// Global Event Bus
// 用于在不同的components之间传递
// 全局函数
import { checkFilter } from './util/bus.js';
const bus = new Vue();
Object.defineProperty(Vue.prototype, '$bus', { get() { return this.$root.bus } });

new Vue({
	el: "#app",
	data: {
		genre: [],
		time: [],
		movies: [],
		moment,
		day: moment(),
		bus
	},
	methods: {
		
	},
	components: {
		// 影片列表
		MovieList,
		// 关键字过滤区
		MovieFilter
	},
	created() {
		//console.log(this.$http);
		this.$http.get('/api').then(response => {
			// console.log(response.data);	
			this.movies = response.data;
		});

		// CheckFilter 组件中触发事件后， 调用Main中的hook 监听事件
		// this.$bus.$on('check-filter', this.checkFilter);
		this.$bus.$on('check-filter', checkFilter.bind(this));
		// 使用了JS中的Function.prototype.bind()方法
		// 主要作用就是将函数绑定至某个对象
	}
});

