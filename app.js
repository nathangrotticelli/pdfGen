
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , swig = require('swig')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path')
  , nodemailer = require("nodemailer");


var app = express();
app.engine('html', swig.renderFile);

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'html');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/', routes.index);
app.get('/resume', routes.resume);
app.get('/headshots', routes.headshots);
app.get('/photos', routes.photos);
app.get('/videos', routes.videos);
app.post('/contactSend', function(req,res){
  // create reusable transport method (opens pool of SMTP connections)
var smtpTransport = nodemailer.createTransport("SMTP",{
    service: "Gmail",
    auth: {
        user: "lenagrot@gmail.com",
        pass: "lena#123456"
    }
});
contactDetails=res.req.body;
contactName=contactDetails.name;
// console.log(contactName);
contactMess=contactDetails.message;
contactEmail=contactDetails.email;

// setup e-mail data with unicode symbols
var mailOptions = {
    from: contactName+" ✔ <email>", // sender address
    to: "lenagrot@gmail.com", // list of receivers
    subject: "Contacting from LenaG.com ✔", // Subject line
    text: contactMess+"", // plaintext body
    html: "<b>My email is: " +contactEmail+"</b>"+"<p>"+contactMess+"</p>" // html body
}

// send mail with defined transport object
smtpTransport.sendMail(mailOptions, function(error, response){
    if(error){
        console.log(error);
    }else{
        console.log("Message sent: " + response.message);
    }

    // if you don't want to use this transport object anymore, uncomment following line
    //smtpTransport.close(); // shut down the connection pool, no more messages
});
res.redirect('/');
});

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
