<template>
	<div id="event-form" :class="{ active: active }" :style="{ top: top, left: left }"> 
		<h4>Add an event</h4>
		<p v-if="active">{{ date.format('dddd, MMMM Do') }}</p>
		<div class="text">
			<input v-focus type="text" v-model="description" placeholder="Please input your event here!" @keyup.enter="create">
		</div>
		<div class="buttons">
			<button @click="create">Create</button>
		</div>
		<button id="close-button" @click="close">&#10005</button>
	</div>
</template>
<script>
	export default {
		data() {
			return {
				description: ''
			};
		},
		computed: {
			date() {
				return this.$store.state.eventFormDate;
			},
			top() {
				return `${this.$store.state.eventFormPosY}px`;
			},
			left() {
				return `${this.$store.state.eventFormPosX}px`;
			},
			active() {
				return this.$store.state.eventFormActive;
			}
		},
		methods: {

			close() {
				this.$store.commit('eventFormActive', false);
			},
			create(){
				if( this.description.length > 0) {
					// 执行actions--addEvent 然后通过.then等待执行结果后再更新关闭Form
					this.$store.dispatch('addEvent', this.description).then(_ =>{
						// this.$store.commit('addEvent', this.description);
						// 清空description, 并讲form的display关闭
						this.description = '';
						this.$store.commit('eventFormActive', false);	
					});					
				}
			}
		},
		directives: {
			focus: {
				update(el) {
					el.focus();
				}
			}
		}
	}

</script>