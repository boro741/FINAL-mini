var express = require('express');
var app = express();

    // Download the helper library from https://www.twilio.com/docs/node/install
// Your Account Sid and Auth Token from twilio.com/console
const accountSid = 'AC9130df7457b1fc4f065d81d18a8789fa';
const authToken = '08a40f53ae14adf084e9c79deae2b05b';
const client = require('twilio')(accountSid, authToken);

app.get('/', function(req,res){


client.messages
  .create({
     body: 'This is the ship that made the Kessel Run in fourteen parsecs?',
     from: '+18577633710 ',
     to: '+919700332959'
   })
  .then(message => console.log(message.sid))
  .done();

});

app.set('port', (process.env.PORT || 5000));

app.listen(app.get('port'), function(){
	console.log('Server started on port '+app.get('port'));
});
