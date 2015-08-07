// =============================================================================
// DECLARE GLOBAL APP OBJECT & variables
// =============================================================================
var app = {};
// james' LCBO api key
app.jamesAPI = 'MDo1ZmMzNGQ0Yy0zYWVmLTExZTUtODFkYi02YmQ0ZWM1NzJlOTQ6RDNTeEVIS1M4Zlh1M0E1UUZjMlFuRzFMWkhzbzcyeUQ2bnRN';
// james' mapbox api key
app.jamesMapbox = 'pk.eyJ1Ijoiamltc2F1cnVzIiwiYSI6IjM0NmIzMjllNGQzYzBlODY4NTQwMjlkMTA4YmM1OWIzIn0.GzyjWKJ4nnZarMZpjPCanQ';
// user input variable
app.postal = 'N1L1L6';
// booze type
app.boozeType = 'beer';

app.store2 = 499;



// =============================================================================
// STORES FUNCTION : returns stores closest to the user input
// =============================================================================
app.stores = function(){
	$.ajax({
		url: 'http://lcboapi.com/stores',
		type: 'GET',
		dataType: 'jsonp',
		data: {
			access_key: app.jamesAPI,
			per_page: 5,
			geo: app.postal
		}
	}).then(function(data) {
		//console.log('These are the 5 stores closest to the USER');
		//console.log(data.result);
		//console.log(data.result[0].id);
		app.store1 = data.result[0];
		//console.log(app.store1);
		app.promoBeers(app.store1);
	}); //end results function
	
} // end stores function


// =============================================================================
// PRODUCTS FUNCTION : returns the products on promotion
// =============================================================================
app.promoBeers = function(store){
	$.ajax({
		url: 'http://lcboapi.com/products',
		type: 'GET',
		dataType: 'jsonp',
		data: {
			access_key: app.jamesAPI,
			per_page: 5,
			where: 'has_bonus_reward_miles',
			where_not: 'is_dead',
			order: 'bonus_reward_miles',
			q: 'beer'
		}
	}).then(function(data) {
		//console.log('Beers on promotion!!');
		//console.log the 5 beers found
		//console.log(data.result);
		app.beers = data.result;
		//app.promoBeer_1 = data.result[0];
		//app.promoBeer_2 = data.result[1];
		//app.promoBeer_3 = data.result[2];
		//app.promoBeer_4 = data.result[3];
		//app.promoBeer_5 = data.result[4];
		app.inStock(app.beers, store);
	});//end results function
	
}; //end TEST function


// =============================================================================
// INVENTORY FUNCTION : returns store inventory
// =============================================================================
app.inStock = function(items, store){
	console.log('inStock fired');
	console.log(items);
	console.log(store);
	$.each(items, function(index, value){
		$.ajax({
			url: 'http://lcboapi.com/stores/' + store.id + '/products/' + items[index].id + '/inventory',
			type: 'GET',
			dataType: 'jsonp',
			data: {
				access_key: app.jamesAPI,
			}
		}).then(function(data) {
			console.log('This is the inventory of ' + items[index].name + ' at ' + store.address_line_1 + ", " + store.city );
			//console.log(data);
			if( data.result.quantity > 0 ){
				console.log(data.result.quantity);
			}else{
				console.log('Sorry not in stock!');
			}
			
		}); //end results function
	});

}//instock function

//example: lcboapi.com/stores/634/products/388900/inventory
// app.inventories = function(){
// 	$.ajax({
// 		url: 'http://lcboapi.com/inventories',
// 		type: 'GET',
// 		dataType: 'jsonp',
// 		data: {
// 			access_key: app.jamesAPI,
// 			per_page: 100,
// 			store_id: 634,
// 			product_id: 388900
// 		}
// 	}).then(function(data) {
// 		console.log('This is the inventory');
// 		console.log(data.result);
		
// 	}); //end results function
// } // end stores function

//API CALL PSEUDO CODE

// user enters postal code





//1. We want the user to enter their postal code.

//2. (as another option)We want the user to enable "geo location" to receive their location via 
//GoogleMaps / Map Box, by clicking a button.

//3. We want to 'smooth scroll' their results (whichever method they selected) further down the page. 

//4. We want to return 3 LCBO locations within their postal code parameters.

//5. We want to return a map displaying their LCBO locations using markers.

//6. Once a store has been selected by the user, we will 'smooth scroll' to display the airmiles promotions, further down the page.

//7. We want to display the available promotion images in a flickity gallery.

//8. We want to display the available promotion information in a div (rgba) within the image.

//9. We want to create an option for the user to select another store.

//10. We wabt to create an option for the user to zoom to the top of the page if they wish to search again.


// =============================================================================
// INIT FUNCTION
// =============================================================================
app.init = function(){
	app.stores();
	//app.inventories();
}; // end init function

// =============================================================================
// DOC READY RUN app.init()
// =============================================================================
$(function(){
	console.log('document ready!');
	app.init();
}); // end document ready





