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
		checkFilter(category, title, checked){
			// console.log(category, title, checked);
			if(checked) {
				this[category].push(title);				
			} else {
			    let index = this[category].indexOf(title);
			    if(index > -1) {
			    	this[category].splice(index, 1);
			    } 
			}
		}
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
	}
});

