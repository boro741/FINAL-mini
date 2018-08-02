var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

// User Schema
var EventPartSchema = mongoose.Schema({
	rollNo: {
		type: String,
		index:true
    },
    eventName: {
        type: String
    },
    team: {
        type: Number
    }
});

var eventPart = module.exports = mongoose.model('eventPart', EventPartSchema);

module.exports.createParticipant = function(newEventPart, callback){
	newEventPart.save(callback);
}

