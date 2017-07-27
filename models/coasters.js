var mongoose = require('mongoose'),
	Schema = mongoose.Schema;
	

var coasterSchema = new Schema({
	type: String,
	park: String,
	state: String,
	image: String
});

var Coaster = mongoose.model('Coaster', coasterSchema);

module.exports = Coaster;