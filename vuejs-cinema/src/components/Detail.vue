<template>
	<div id="detail" v-if="movie">
		<movie-item v-bind:movie="movie.movie" v-bind:sessions="[]"></movie-item>
	</div>
</template>
<script>
	import MovieItem from "./MovieItem.vue";
	export default {
		// 只需要在route-view中有绑定后，就可以直接用props了
		props: [ 'movies' ],
		computed: {
			movie() {
				let movie = this.movies.find(movie => movie.id === this.$route.params.id);
				// 判断是否找到
				return movie ? movie : null;
			}
		},
		created() {
			console.log(this.$route);

		},
		components: {
			MovieItem
		}
	}
</script>