var express = require('express');
var router = express.Router();

var Event = require('../models/event').Event;

function ensureAuthenticated(req, res, next){
	if(req.isAuthenticated()){
		return next();
	} else {
		res.redirect('/users/login');
	}
}

// Get Homepage
router.get('/',function(req, res){
	var eventName = new Array();
	var description = new Array();
	var poster = new Array();
	var eventDate = new Array();
	var mobileNo = new Array();
	var emailId = new Array();
	var price = new Array();
	Event.find().then(function(event){
		event.forEach(function(ev){
			//console.log('ev:: ',ev);
			eventName.push(ev.eventName);
			description.push(ev.description);
			poster.push(ev.poster);
			eventDate.push(ev.eventDate);
			mobileNo.push(ev.mobileNo);
			emailId.push(ev.emailId);
			price.push(ev.price);
		});
	});
	res.render('home',{
		eventName,
		description,
		poster,
		eventDate,
		mobileNo,
	 	emailId,
	 	price
	});
});

router.get('/advertise',ensureAuthenticated,function(req, res){
	res.render('advertise');
});

router.get('/dashboard', ensureAuthenticated, function(req, res){
	res.render('dashboard');
});

router.get('/regParticipant', ensureAuthenticated, function(req, res){
	res.render('participants');
});

router.get('/teamReg', ensureAuthenticated, function(req, res){
	res.render('teamReg');
});

router.get('/test',function(req, res){
	res.render('test');
});

module.exports = router;