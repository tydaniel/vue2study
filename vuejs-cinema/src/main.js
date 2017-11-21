import Vue from 'vue';
import './style.scss';
import genres from './util/genres';

import MovieList from './components/MovieList.vue';
import MovieFilter from './components/MovieFilter.vue';

import VueResource from 'vue-resource';
Vue.use(VueResource);

new Vue({
	el: "#app",
	data: {
		genre: [],
		time: [],
		movies: []
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

