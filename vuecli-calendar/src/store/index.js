import Vue from "vue";
import Vuex from 'vuex';
Vue.use(Vuex);


import moment from 'moment-timezone';
moment.tz.setDefault("UTC");

import Axios from 'axios';

export default new Vuex.Store({
	state: {
		currentYear: 2018,
		currentMonth: 1,
		eventFormPosX: 0,
		eventFormPosY: 0,
		eventFormActive: false,
		event: [],
		events: [],
		eventFormDate: moment()
	},
	mutations: {
		setCurrentMonth(state, payload) {
			state.currentMonth = payload;
		},
		setCurrentYear(state, payload) {
			state.currentYear = payload;
		},
		eventFormPos(state, payload) {
			state.eventFormPosX = payload.x;
			state.eventFormPosY = payload.y;
		},
		eventFormActive(state, payload) {
			state.eventFormActive = payload;
		},
		addEvent(state, payload) {
			state.events.push(payload);
		},
		// 获取click 日期的对应日期信息
		addEventFormDate(state, payload) {
			state.eventFormDate = payload;
		}
	},
	// • mutation is the only way to modify state
	// • mutation doesn't care about business logic, it just care about "state"
	// • action is business logic
	// action can dispatch more than 1 mutation at a time,it just implement the business logic, it doesn't care about data changing (which manage by mutation)
	actions: {
		addEvent(context, payload) {
			return new Promise((resolve, reject) => {
				// 通过context可以直接操作state 或 mutations
				let obj = {
					description: payload,
					// 直接从addEvnetnFormDate获取
					date: context.state.eventFormDate
				};
				
				Axios.post('/add_event', obj).then(response =>{
					if (response.status === 200) {
						// push into event array by mutations 
						context.commit('addEvent', obj);
						// 测试如果post请求后2秒后有反馈，延迟2秒后执行reslove方法
						// 看看EventForm是不是一直等着还是会直接关闭？
						// setTimeout(function() {
						// 	resolve();	
						// }, 2000);
						resolve();
					}
					else {
						reject();
					}
				});
			});			
		}
	}
});