// This file allows us to seed our application with data
// simply run: `node seed.js` from the root of this project folder.
var db = require('./models');

var coaster_list = [{
	name: "Kumba",
	type: "Steel",
	park: "Busch Gardens",
	state: "FL",
	// image: String
},{
	name: "Montu",
	type: "Inverted Steel",
	park: "Busch Gardens",
	state: "FL"
},{
	name: "Incredible Hulk",
	type: "Steel",
	park: "Islands of Adventure",
	state: "FL"
},{
	name: "Batman",
	type: "Inverted Steel",
	park: "Kings Dominion",
	state: "VA"
},{
	name: "Sling Shot",
	type: "Steel",
	park: "Elitch Gardens",
	state: "CO"
}];

// db.Campsite.create(new_campsite, function(err, campsite){
//   if (err){
//     return console.log("Error:", err);
//   }

db.Coaster.remove({}, function(err, coasters) {
	coaster_list.forEach(function (coasterProps) {
		var coaster = new db.Coaster({
			name: coasterProps.name,
			type: coasterProps.type,
			park: coasterProps.park,
			state: coasterProps.state
		});
		
	});
});



//   console.log("Created new campsite", campsite._id)
//   process.exit(); // we're all done! Exit the program.
// })




// db.Coaster.create(coaster_list, function(err, coaster) {
// 	if (err) {
// 		return console.log("err: " + err);
		
// 	}  
//     console.log('recreated all coasters');
//     console.log("created", coasters.length, "coasters");
// 	});
// });

