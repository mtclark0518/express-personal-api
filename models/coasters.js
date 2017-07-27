var mongoose = require('mongoose');
var	Schema = mongoose.Schema;
	

var coasterSchema = new Schema({
	name: String,
	type: String,
	park: String,
	state: String
	// image: String
});

var Coaster = mongoose.model('Coaster', coasterSchema);

module.exports = Coaster;