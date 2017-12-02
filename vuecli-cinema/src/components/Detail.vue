<template>
	<div id="detail" v-if="movie">
		<movie-item v-bind:movie="movie">
			<div class="movie-details">
				<p class="movie-genre">{{ movie.Genre }}</p>
				<p class="movie-plot">{{ movie.Plot }}</p>
				<table>
					<tr><td>Released Date:</td><td>{{ movie.Released }}</td></tr>
					<tr><td>Running Time:</td><td>{{ movie.Runtime }}</td></tr>
					<tr><td>Director:</td><td>{{ movie.Director }}</td></tr>
					<tr><td>Cast:</td><td>{{ movie.Actors }}</td></tr>
				</table>
			</div>
		</movie-item>
		<div class="home">
			<!-- <router-link to="{path: '/'}"> Back to home </router-link> -->
			<router-link :to="{name: 'home'}"> Back to home </router-link>
			
		</div>
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
				return movie ? movie.movie : null;
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