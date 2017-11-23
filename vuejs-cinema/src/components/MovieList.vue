<template>
	<div id="movie-list">
		<div v-if="filterMovies.length">
			<!-- <movie-item v-for="movie in filterMovies" 
			            v-bind:movie="movie.movie" 
			            v-bind:sessions="movie.sessions" 
						v-bind:day="day" 
						v-bind:time="time"
			> -->
			<movie-item v-for="movie in filterMovies" 
			            v-bind:movie="movie.movie"
			>
				<div class="movie-sessions">
					<div 
					     v-for="session in filteredSessions(movie.sessions)" 
					     class="session-time-wrapper tooltip-wrapper"
					     v-tooltip="{ seat: session.seats }"
					>
						<div class="session-time">{{ formatSessionTime(session.time) }}</div>					
					</div>
				</div>

			</movie-item>
		</div>
		<div v-else-if="movies.length" class="no-results">
			{{ noResults }}
		</div>
		<div v-else class="no-results">
			Loading...
		</div>
	</div>
</template>

<script>
	import genres from '../util/genres';
	import times from '../util/times';
	import MovieItem from './MovieItem.vue';	
	export default {		
		props: [ "genre", "time", "movies", "day"],
		methods: {
			// 回调函数 判断 Genre是否一致
			moviePassesGenreFilter(movie) {
				if (!this.genre.length) {
					return true;
				} else {
					let movieGenre = movie.movie.Genre.split(", ");
					let matched = true;
					this.genre.forEach(genre =>{
						if(movieGenre.indexOf(genre) === -1) {
							matched = false;
						}
					});
					return matched;
				}
			},
			// Callback
			sessionPassesTimeFilter(session) {
				if (!this.day.isSame(this.$moment(session.time), 'day')) {
					return false;
				} else if(this.time.length === 0 || this.time.length === 2){
					return true;	
				} else if(this.time[0] === times.BEFORE_6PM) {
					return this.$moment(session.time).hour() >= 18;
				} else {
					return this.$moment(session.time).hour() < 18;
				}
			},
			formatSessionTime(raw) {
				// 时间显示格式化返回
				return this.$moment(raw).format('h:mm A');
			},
			filteredSessions(sessions) {
				// return sessions.filter(session => {
				// 	return this.$moment(session.time).isSame(this.day, 'day');
				// });
				return sessions.filter(this.sessionPassesTimeFilter);

			},
		},
		computed: {
			// 显示相应的影片
			filterMovies() {
				// this.moviePassesGemreFilter callback function
				return this.movies
							.filter(this.moviePassesGenreFilter)
							.filter(movie => movie.sessions.find(this.sessionPassesTimeFilter));
			},
			noResults() {
				let times = this.time.join(', ');
				let genres = this.genre.join(', ');
				return `No results for ${times} ${ times.length && genres.length ? ', ' : ''} ${genres} `;
			}
		},
		components: {
			MovieItem
		},
		created() {
			console.log(this.$moment);
		}
	}
</script>
