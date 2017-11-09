var PRICE = 9.99;
new Vue({
	el: '#app',
	data: {
		total: 0,
		items: [
			{ id: 1, title: 'Item 1'},
			{ id: 2, title: 'Item 2'},
			{ id: 3, title: 'Item 3'}
		],
		cart: [],
		search: ''
	},
	methods: {
		// addItem: function(){
		// 	console.log("addItem");
		// 	this.total += 9.99;
		// }
		addItem: function(index){
			// console.log(index);

			// this.cart.push(this.items[index]);
			// console.log(this.cart.length);
			this.total += PRICE;
			var item = this.items[index];
			var found = false;
			for ( var i=0; i< this.cart.length; i++) {
				if(this.cart[i].id === item.id) {
					this.cart[i].qty++;
					found = true;
					break;
				}
			}
			if( !found ) {
				this.cart.push({
					id: item.id,
					title: item.title,
					qty: 1,
					price: PRICE
				});
			}
		},
		inc: function(item) {
			console.log('inc');
			item.qty++;
			this.total += PRICE;
		},
		dec: function(item) {
			console.log('dec');
			item.qty--;
			this.total -= PRICE;
			if(item.qty <= 0) {
				for(var i=0; i<this.cart.length; i++) {
					if(this.cart[i].id === item.id) {
						this.cart.splice(i, 1);
						break;
					}
				}
			}
		},
		onSubmit: function(){
			//console.log('Search Function here!' + this.search);
			// console.log(this.$http);
			this.$http.get('/search/'.concat(this.search))
			.then(function(){
				console.log(res);
			})
		}
	},
	filters: {
		currency: function(price) {
			return '$'.concat(price.toFixed(2));
		}
	}
});
