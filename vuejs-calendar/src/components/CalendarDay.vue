<template>
	<!-- 格式化显示，只要显示简单的‘日’， 使用foramt()函数 -->
	<div :class="classObject" @click="captureClick">
		{{ day.format('D') }}
		<ul class="event-list">
			<li v-for="event in events">{{ event.description }}</li>
		</ul>
	</div>
</template>
<script>
	export default {
		props: [ 'day' ],
		computed: {
			// 获取各日期对应的描述
			events() {
				// let mocData = [
				// 	{ description: "Des 1", date: this.$moment('2017-12-28', 'YYYY-MM-DD') },
				// 	{ description: "Des 2", date: this.$moment('2017-12-25', 'YYYY-MM-DD') },
				// 	{ description: "Des 3", date: this.$moment('2017-12-31', 'YYYY-MM-DD') }
				// ];
				// // 通过filter过滤，输出相应的日期的description
				// return mocData.filter(event => event.date.isSame(this.day, 'day'));
				return this.$store.state.events.filter(event => event.date.isSame(this.day, 'day'));
			},
			classObject() {
				let today = this.day.isSame(this.$moment(), 'day');
				return {
					day: true,
					// today: this.day.isSame(this.$moment(), 'day'),
					today,
					// past: this.day.isSameOrBefore(this.$moment(), 'day')
					past: this.day.isBefore(this.$moment(), 'day')
				};
			}
		},
		methods: {
			captureClick(event) {
				console.log('!!!!!!');
				console.log(this.day);
				this.$store.commit('eventFormPos',{x: event.clientX, y: event.clientY});
				this.$store.commit('eventFormActive', true);
				// 获取click对象的日期
				this.$store.commit('addEventFormDate', this.day);

			}
		}
	}	
</script>