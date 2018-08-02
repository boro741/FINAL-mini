var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

// User Schema
var ParticipantSchema = mongoose.Schema({
	rollNo: {
		type: String,
		index:true
	},
	name: {
		type: String
	},
	email: {
		type: String
	},
	mobile: {
		type: Number
	},
	branch: {
		type: String
	},
	section: {
		type: String
	},
	year: {
		type: Number
	}
});

var Participant = module.exports = mongoose.model('Participant', ParticipantSchema);

module.exports.createParticipant = function(newParticipant, callback){
	newParticipant.save(callback);
}

module.exports.getParticipantByRollNo = function(rollNo, callback){
	var query = {rollNo: rollNo};
	Participant.findOne(query, callback);
}

module.exports.getUserById = function(id, callback){
	User.findById(id, callback);
}
