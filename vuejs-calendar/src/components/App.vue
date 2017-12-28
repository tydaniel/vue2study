<template>
	<div>
		<div id="header">
			<div>
				<h1>iCalender</h1>
			</div>
			<div>
				<current-month></current-month>
			</div>
		</div>
		<div id="day-bar">
			<div>Mon</div>
			<div>Tue</div>
			<div>Wed</div>
			<div>Thu</div>
			<div>Fri</div>
			<div>Sat</div>
			<div>Sun</div>
		</div>
		<div id="calendar">
			<div v-for="week in weeks" class="calendar-week">
				<calendar-day v-for="day in week" :day="day"></calendar-day>
			</div>		
		</div>
		<event-form></event-form>	
	</div>
	
</template>
<script>	
	import CalendarDay from './CalendarDay.vue';
	import CurrentMonth from './CurrentMonth.vue';
	import EventForm from './EventForm.vue';

	export default {
		// data() {
		// 	return {
		// 		month: 12,
		// 		year: 2017
		// 	};			
		// },
		created(){
			// // 确认web.entry.js中的this.$moment对象是否正确传入
			// console.log(this.$moment);
		},
		computed: {
			month() {
				return this.$store.state.currentMonth;
			},
			year() {
				return this.$store.state.currentYear;
			},
			// padding days according to Year-Month
			// 根据年月获取当月日历中显示的日期（涵盖上月或下月的日期，补全MONDAY～SUNDAY
			days() {
				// Generating all days in current month
				let days = [];
				let currentDay = this.$moment(`${this.year}-${this.month}-1`, 'YYYY-M-D');
				// 将当月的日期依次加入的到days array中，用push()
				do {
					days.push(currentDay);
					currentDay = this.$moment(currentDay).add(1, 'days');
				} while ((currentDay.month() + 1)  === this.month);

				// Add previous days to start
				currentDay = this.$moment(days[0]);
				const SUNDAY = 0;
				const MONDAY = 1;
				if (currentDay.day() !== MONDAY) {
					// 将1日前的日期补上，一直到周一，用头部添加方法 unshift()
					do {
						currentDay = this.$moment(currentDay).subtract(1,'days');
						days.unshift(currentDay);
					} while (currentDay.day() !== MONDAY);	
				}
				

				// Add next days to days array
				currentDay = this.$moment(days[days.length -1]);
				if (currentDay.day() !== SUNDAY) {
					do {
						currentDay =  this.$moment(currentDay).add(1, 'days');
						days.push(currentDay);
					} while (currentDay.day() !== SUNDAY);	
				}
				
				return days;
			},

			// 将已经获取的日期，分割成每周
			weeks() {
				let weeks = [];
				let week = [];

				for (let day of this.days) {
					week.push(day);
					if(week.length === 7) {
						weeks.push(week);
						week = [];
					}
				}
				return weeks;
			}
		},
		components: {
			CalendarDay,
			CurrentMonth,
			EventForm
		}
	}
</script>
