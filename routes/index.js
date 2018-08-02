var express = require('express');
var router = express.Router();
var QRCode = require('qrcode')

var Event = require('../models/event').Event;
var EventPart = require('../models/eventPart');
var Participant = require('../models/participant').Participant;

function ensureAuthenticated(req, res, next){
	if(req.isAuthenticated()){
		return next();
	} else {
		res.redirect('/users/login');
	}
}
var eventName = new Array();
var description = new Array();
var poster = new Array();
var p = new Array();
var eventDate = new Array();
var mobileNo = new Array();
var emailId = new Array();
var price = new Array();

function findEve(){
	eventName =  [];
	description = [];
	 poster =[];
	 p =[];
	 eventDate = [];
	 mobileNo = [];
	 emailId = [];
	 price = []; 

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
}




function ensureAuthenticated(req, res, next){
	if(req.isAuthenticated()){
		return next();
	} else {
		res.redirect('/users/login');
	}
}
// Get Homepage
router.get('/',function(req, res){
	findEve();
	res.render('home',{
		eventName,
		poster,
		eventDate,
		description
	});
});


router.get('/advertise',ensureAuthenticated,function(req, res){
	findEve();
	res.render('advertise',{eventName});
});

router.get('/dashboard', ensureAuthenticated, function(req, res){
	res.render('dashboard');
});

router.get('/regParticipant', ensureAuthenticated, function(req, res){
	res.render('participants');
});

router.get('/teamReg', ensureAuthenticated, function(req, res){
	findEve();
	res.render('teamReg',{eventName});
});

router.get('/myEventDash',function(req,res){
	findEve();
	res.render('myEventDash',{eventName});
});

var rollNumber = new Array();

function eventFind(my_event){
	// EventPart.find({'eventName':my_event}).then(function(a){
	// 	//console.log(a);
	// 	a.forEach(function(roll){
	// 		rollNumber.push(roll.rollNo);
	// 	});
	// });
	// EventPart.find({'eventName':'Ebullienza'},function(err,response){
	// 	//console.log(response);
	// 	response.forEach(function(roll){
	// 		rollNumber.push(roll.rollNo);
	// 	});
	// });
	var res = {};
	var a;
	// EventPart.aggregate([
	// 	{ "$match": { "eventName": "Ebullienza" } },
	// 	{
	// 		"$lookup": {
	// 			"from": "participants",
	// 			"localField": "rollNo",
	// 			"foreignField": "rollNo",
	// 			"as": "Participants"
	// 		}
	// 	}
	// ]).exec(function(err, results){
	// 	res = results;
	// 	a = Object.keys(results).map(function(key) {
	// 		return [Number(key), results[key]];
	// 	  });
	// 	console.log(a);
	//  })
}

router.get('/myEvePart',function(req,res){
	var my_event = req.query.event;
	var abc = new Array();
	//eventFind(my_event);
	EventPart.aggregate([
		{ "$match": { "eventName": my_event } },
		{
			"$lookup": {
				"from": "participants",
				"localField": "rollNo",
				"foreignField": "rollNo",
				"as": "Participants"
			}
		}
	]).exec(function(err, results){
		//res.locals.quiz  =  JSON.stringify(results);
		//res.json(results);
		//var re = JSON.stringify(results)
		var rollNo = new Array();
		var name = new Array();
		var email = new Array();
		var mobile = new Array();
		var branch = new Array();
		var section = new Array();
		var year = new Array();
		results.forEach(function(e){
			console.log(e);
			rollNo.push(e.Participants[0].rollNo);
			name.push(e.Participants[0].name);
			email.push(e.Participants[0].email);
			mobile.push(e.Participants[0].mobile);
			branch.push(e.Participants[0].branch);
			section.push(e.Participants[0].section);
			year.push(e.Participants[0].year);
		});
		console.log(rollNo);
		console.log(name);
		res.render('myEvePart',{rollNo,name,email,mobile,branch,section,year});
	 });

	//console.log(rollNumber);
	//res.render('myEvePart',abc);
});

router.post('/regPart', ensureAuthenticated, function(req, res){
	var ev = req.body.eventSelect;
	var rollno = req.body.rollno;
	//console.log("Roll No. ",rollno[1]);

	
	var QRCode = require('qrcode')
	var url;
	var team = Math.floor(Math.random() * 100) + 1;

	rollno.forEach(function(r){
		var newEventPart = new eventPart({
			rollNo : r,
			eventName: ev,
			team: team
		});
		eventPart.createParticipant(newEventPart, function (err, event) {
			if (err) throw err;
				console.log(event);
		});	
	});
	
	QRCode.toDataURL('Event Name: '+ev+' Team number: '+team, function (err, url) {
		url = url;
		res.send('<img src="'+ url+'">'); 
	});
});

router.get('/test',function(req, res){
	res.render('test');
});

module.exports = router;