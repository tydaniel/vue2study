import Vue from 'vue';
import './style.scss';
import genres from './util/genres';

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
import { checkFilter, setDay } from './util/bus';
const bus = new Vue();
Object.defineProperty(Vue.prototype, '$bus', { get() { return this.$root.bus } });

// Vue-Router 路由
import VueRouter from 'vue-router';
Vue.use(VueRouter);

import routes from './util/routes';
const router = new VueRouter({ routes });

new Vue({
	el: "#app",
	data: {
		genre: [],
		time: [],
		movies: [],
		moment,
		day: moment(),
		bus,
		testmessage: 'Ni hao!'
	},
	methods: {
		
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
		this.$bus.$on('set-day', setDay.bind(this));
	},
	router
});

import { addClass, removeClass } from './util/helpers';

let mouseOverHandler = function() {
	let span = event.target.parentNode.getElementsByTagName('SPAN')[0];
	// console.log(span);
	addClass(span, 'tooltip-show');
};

let mouseOutHandler = function() {
	let span = event.target.parentNode.getElementsByTagName('SPAN')[0];
	// console.log(span);
	removeClass(span, 'tooltip-show');
};

Vue.directive('tooltip', {
	// 参数1： 参数2：
	bind(el, bindings) {
		// 插入一个SPAN Tag
		let span = document.createElement('SPAN');
		let text =document.createTextNode('Seats available: 200');
		// 设置SPAN显示的文字内容
		span.appendChild(text);
		// 调用helpers.js 加入CSS class
		addClass(span, 'tooltip');
		// 加入到相应的t-tooltip里
		el.appendChild(span);

		// 获取DIV tag对象
		let div = el.getElementsByTagName('DIV')[0];
		// // 实现 mouseover 的事件处罚时的回调函数
		// div.addEventListener('mouseover', function() {
		// 	// console.log('mouseover');
		// });
		// // 实现 mouseout 的事件处罚时的回调函数
		// div.addEventListener('mouseout', function() {
		// 	// console.log('mouseout');
		// });
		// 实现 mouseover 的事件处罚时的回调函数
		div.addEventListener('mouseover', mouseOverHandler);
		// 实现 mouseout 的事件处罚时的回调函数
		div.addEventListener('mouseout', mouseOutHandler);
		div.addEventListener('touchstart', mouseOverHandler);
		div.addEventListener('touchend', mouseOutHandler);
	},
	unbind(el) {
		let div = el.getElementsByTagName('DIV')[0];
		div.removeEventListener('mouseover', mouseOverHandler);
		div.removeEventListener('mouseout', mouseOutHandler);
		div.removeEventListener('touchstart', mouseOverHandler);
		div.removeEventListener+('touchend', mouseOutHandler);
	}
});

