var express = require('express');
var router = express.Router();

// SMS
const accountSid = 'AC9130df7457b1fc4f065d81d18a8789fa';
const authToken = '08a40f53ae14adf084e9c79deae2b05b';
const client = require('twilio')(accountSid, authToken);

// Email
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey('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');

router.post('/', function(req,res){
    console.log(req.body);
    req.flash('success_msg', 'Event Advertised');
    res.redirect('/');
    if(req.body.SMS == 'sms'){
        client.messages
            .create({
                body: 'This is the ship that made the Kessel Run in fourteen parsecs?',
                from: '+18577633710 ',
                to: '+919700332950'
            })
            .then(message => console.log(message.sid))
            .done();
        console.log("SMS");
    } 
    
    if(req.body.Email == 'email'){        
        const msg = {
            to: [{
                "email": "pavanboro14@gmail.com"
            }, {
                "email": "pavanboro16@gmail.com"
            }],
            from: 'pavanboro15@gmail.com',
            subject: 'MRITS Event',
            text: 'Participate in upcoming new events.',
            html: '<strong>Explore, learn and have fun participating in events.</strong>',
          };
          sgMail.send(msg, function(err,json){
              if(err){
                  return res.send("Error:: Email not Sent!!!");
              }
    
              return res.send("Email Sent!!!");
          });
        console.log("EMAIL");
    }

    

});

module.exports = router;
