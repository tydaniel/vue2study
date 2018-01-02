import Vue from "vue";
import Vuex from 'vuex';
Vue.use(Vuex);


import moment from 'moment-timezone';
moment.tz.setDefault("UTC");

export default new Vuex.Store({
	state: {
		currentYear: 2017,
		currentMonth: 12,
		eventFormPosX: 0,
		eventFormPosY: 0,
		eventFormActive: false,
		events: [
					{ description: "Des 1", date: moment('2017-12-28', 'YYYY-MM-DD') },
					{ description: "Des 2", date: moment('2017-12-25', 'YYYY-MM-DD') },
					{ description: "Des 3", date: moment('2017-12-31', 'YYYY-MM-DD') }
				],
		eventFormDate: null

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
			state.events.push({
				description: payload,
				// 直接从addEvnetnFormDate获取
				date: this.eventFormDate
			});
		},
		// 获取click 日期的对应日期信息
		addEventFormDate(state, payload) {
			this.eventFormDate = payload;
		}
	}
});