<template>
	<div id="movie-filter">
		<h2>Filter results</h2>
		<h3>By time of day</h3>
		<div class="filter-group">
			<!-- <check-filter v-for="time in times" 
			              category="time" 
			              v-bind:title="time" 
			              v-on:check-filter="checkFilter"
			></check-filter> -->
			<!-- 以上代码中通过MovieFilter组件传递调用 checkFilter方法 -->
			<check-filter v-for="time in times" 
			              category="time" 
			              v-bind:title="time" 
			></check-filter>
		</div>
		<h3>By genre</h3>
		<div class="filter-group">
			<!-- <check-filter v-for="genre in genres" 
			              category="genre" 
			              v-bind:title="genre" 
			              v-on:check-filter="checkFilter"
			></check-filter> -->
			<!-- 以上代码中通过MovieFilter组件传递调用 checkFilter方法 -->
			<check-filter v-for="genre in genres" 
			              category="genre" 
			              v-bind:title="genre" 
			></check-filter>
		</div>
	</div>
</template>

<script>
	import genres from '../util/genres';
	import times from '../util/times';
	import CheckFilter from './CheckFilter.vue';
	
	export default {
		data() {
			return {
				genres,
				times
			};
		},		
		methods: {
			// 通过传递调用（祖 - 父 - 子），现在这个是父层的方法定义。
			// checkFilter(category, title, checked) {
			// 	this.$emit('check-filter', category, title, checked);
			// }
		},
		components: {
			CheckFilter
		}
	}
</script>