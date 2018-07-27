var express = require('express');
var router = express.Router();
var QRCode = require('qrcode')

var Event = require('../models/event').Event;

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


// Get Homepage
router.get('/',function(req, res){
	
	res.render('home',{
		poster
	});
});

router.get('/advertise',ensureAuthenticated,function(req, res){
	
	res.render('advertise',{eventName});
});

router.get('/dashboard', ensureAuthenticated, function(req, res){
	res.render('dashboard');
});

router.get('/regParticipant', ensureAuthenticated, function(req, res){
	res.render('participants');
});

router.get('/teamReg', ensureAuthenticated, function(req, res){
	
	res.render('teamReg',{eventName});
});

router.post('/regEvent', ensureAuthenticated, function(req, res){
	var ev = req.body.eventSelect;
	var QRCode = require('qrcode')
	var url;
	var team = Math.floor(Math.random() * 100) + 1;
	QRCode.toDataURL('Event Name: '+ev+' Team number: '+team, function (err, url) {
		url = url;
		res.send('<img src="'+ url+'">'); 
	});
	//console.log(url);
	//res.render('qr',url);
});

router.get('/test',function(req, res){
	res.render('test');
});

module.exports = router;