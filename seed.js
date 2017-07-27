// This file allows us to seed our application with data
// simply run: `node seed.js` from the root of this project folder.
var db = require('./models');

var coaster_list = [{
	name: "Kumba",
	type: "Steel",
	park: "Busch Gardens",
	state: "FL",
	id: 1
	// image: String
},{
	name: "Montu",
	type: "Inverted Steel",
	park: "Busch Gardens",
	state: "FL",
	id: 2,
},{
	name: "Incredible Hulk",
	type: "Steel",
	park: "Islands of Adventure",
	state: "FL",
	id: 3,
},{
	name: "Batman",
	type: "Inverted Steel",
	park: "Kings Dominion",
	state: "VA",
	id: 4

},{
	name: "Sling Shot",
	type: "Steel",
	park: "Elitch Gardens",
	state: "CO",
	id: 5

}];



db.Coaster.remove({}, function(err, coasters) {
	db.Coaster.create(coaster_list, function(err, coasters){
		if(err){
			console.log(err);
			return;
		}
		console.log('recreated all coasters');
		console.log("created " + coasters.length + " coasters");
	});


	// var coaster;
	// coaster_list.forEach(function (coasterProps) {
	// 	coaster = new db.Coaster({
	// 		name: coasterProps.name,
	// 		type: coasterProps.type,
	// 		park: coasterProps.park,
	// 		state: coasterProps.state
	// 	});
		// console.log(coaster);

	// });
});






