//    <div class="footer2" >
//       <div class="container conContainer">
//         <br><br><br>

//       <div class="contactForm col-xs-8 col-sm-8 col-md-12 col-lg-12">
//         <div >
//           <form class="form-horizontal"  action="/contactSend" method="post">
//           <fieldset>
//              <img src="images/cf1.jpg" class="contactPic img-responsive col-xs-4 col-sm-4 col-md-4 col-lg-4"/>
//             <legend id="footer" class="text-center cM">Contact Me!</legend>
//             <a href="#navTop" class="topBtn">(back to the top)</a>


//             <!-- Name input-->
//             <div class="form-group">
//               <label class="col-md-2 control-label" for="name">Name</label>
//               <div class="col-md-6 col-lg-6">
//                 <input id="name" name="name" type="text" placeholder="Your name" class="form-control">
//               </div>
//             </div>


//             <!-- Email input-->
//             <div class="form-group">
//               <label class="col-md-2 control-label" for="email">Your E-mail</label>
//               <div class="col-md-6 col-lg-6">
//                 <input id="email" name="email" type="text" placeholder="Your email" class="form-control">
//               </div>
//             </div>


//             <!-- Message body -->
//             <div class="form-group">
//               <label class="col-md-2 control-label" for="message">Your Message</label>
//               <div class="col-md-6 col-lg-6">
//                 <textarea class="form-control" id="message" name="message" placeholder="Please enter your message here..." rows="5"></textarea>
//               </div>
//             </div>
// <!-- <p>@LG copywright</p> -->
//             <!-- Form actions -->
//             <div class="form-group">
//               <div class="col-md-6 col-lg-6 submit">
//                 <button type="submit" class="btn btn-lg">Submit</button>
//               </div>
//             </div>

//           </fieldset>
//           </form>
//         </div>



//    <!--  -->

//   </div>


// </div>



//     </div>
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

app.get('/download/images/:fileName', function(req, res){
  var file = 'public/images/'+req.params.fileName.toString();
  // alert(file);
  console.log(file);

  // var locationID = req.params.locationID.toString();
  res.download(file); // Set disposition and send it.
  // res.redirect('/');
  // res.redirect(/)
});
app.get('/', routes.index);
app.get('/resume', routes.resume);
app.get('/headshots', routes.headshots);
app.get('/photos', routes.photos);
app.get('/videos', routes.videos);
app.get('/contact', routes.contact);
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
