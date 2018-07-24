var express = require('express');
var router = express.Router();
var multer = require('multer');

var Event = require('../models/event');

//MULTER CONFIG: to get file photos to temp server storage
const multerConfig = {
    
	storage: multer.diskStorage({
	 //Setup where the user's file will go
	 destination: function(req, file, next){
	   next(null, 'uploads/');
	   },   
		
		//Then give the file a unique name
		filename: function(req, file, next){
			next(null, file.originalname);
		  }
		}),   
		
		//A means of ensuring only images are uploaded. 
		fileFilter: function(req, file, next){
			  if(!file){
				next();
			  }
			const image = file.mimetype.startsWith('image/');
			if(image){
			  console.log('photo uploaded');
			  next(null, true);
			}else{
			  console.log("file not supported");
			  
			  //TODO:  A better message response to user on failure.
			  return next();
			}
	}
};

// Create Event
router.post('/createEvent',multer(multerConfig).single('poster'),function(req,res){
	var eventName = req.body.eventName;
	var description = req.body.description;
	var eventDate = req.body.eventDate;
	var mobileNo = req.body.mobileNo;
	var emailId = req.body.emailId;
	var price = req.body.price;
	var poster = req.file.path;

	//console.log('Path: ',req.file);
	
	var newEvent = new Event({
		eventName: eventName,
		description: description,
		poster: poster,
		eventDate: eventDate,
		mobileNo: mobileNo,
		emailId: emailId,
		price: price
	});

	Event.createEvent(newEvent, function (err, event) {
	if (err) throw err;
		console.log(event);
	});

	req.flash('success_msg', 'Event Published');
	
	res.redirect('/');
});

module.exports = router;
