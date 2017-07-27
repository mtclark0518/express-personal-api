var mongoose = require('mongoose'),
	Schema = mongoose.Schema;
	

var CoasterSchema = new Schema({
	name: String,
	type: String,
	park: String,
	state: String
});

var Coaster = mongoose.model('Coaster', CoasterSchema);

module.exports = Coaster;