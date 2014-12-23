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
  , PDFDocument = require('pdfkit')
  , moment = require('moment')
  , sizeOf = require('image-size')
  , fs = require('fs')
  , swig = require('swig')
  , request = require('request')
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



var fakeP = {

    "_id": "549608c4f998e62b5d0eca22",
    "name": "Harrell Winters",
    "agent": "Tami Fleming",
    "group_name": "Exercitation Culpa",
    "message": "Duis in elit excepteur esse anim amet est elit mollit esse Lorem aliquip officia eiusmod. Voluptate mollit aute ut ut laborum. Irure magna non officia nostrud. Occaecat commodo veniam excepteur occaecat irure velit exercitation eiusmod. Commodo mollit dolore qui irure laborum ut aute eiusmod dolor do.\r\nAute Lorem laborum cupidatat ad eu deserunt mollit laboris. Et do cillum cupidatat est cillum ad Lorem ex ipsum voluptate. Enim consectetur exercitation eiusmod deserunt aute. Dolor voluptate est exercitation anim officia proident dolor exercitation veniam consequat. Veniam irure minim minim incididunt do non sint ut enim labore sint duis pariatur. Non officia duis pariatur consequat ad pariatur velit duis laborum velit do incididunt non.\r\n",
    "arrival_date": "2014-04-04T15:29:52 +04:00",
    "services": [
      {
        "name": "quis nulla exercitation ea eu",
        "description": "Anim minim id consectetur anim in et magna culpa officia id eiusmod irure. Nisi adipisicing consequat ea minim qui deserunt proident et minim. Nostrud sint voluptate elit duis ex consectetur do cillum magna est non. Pariatur excepteur sit fugiat dolore incididunt Lorem esse et pariatur.\r\nNostrud consequat irure elit irure quis proident duis pariatur laborum est. Sunt dolore sit ipsum non elit eu sunt et sit. Elit dolor irure do adipisicing id et Lorem. Quis et commodo do laboris ullamco laboris aute id excepteur excepteur.\r\n",
        "service_date": "2014-01-14T00:22:27 +05:00",
        "quantity": {
          "adults": 1,
          "children": 1
        },
        "price_person": "$362.07",
        "banner": "http://s3-us-west-2.amazonaws.com/abgv1/banners/img_4.jpg"
      },
      {
        "name": "anim ullamco velit exercitation deserunt",
        "description": "Elit consequat culpa id irure non eu. Dolor aute minim fugiat labore et veniam ea deserunt culpa enim commodo ipsum et. Et in occaecat magna anim adipisicing exercitation qui. Consectetur aliqua sint labore consectetur ea tempor eiusmod. Occaecat velit labore reprehenderit cillum culpa irure magna.\r\nIn ullamco officia deserunt irure est esse in est Lorem eu. Consequat labore aliquip ullamco et ullamco ad labore sint aute commodo et. Cupidatat quis ut ullamco id. Excepteur eiusmod consequat amet ex. Nostrud commodo mollit cupidatat anim est veniam sint et in est velit mollit consequat cupidatat. Lorem tempor ipsum Lorem ullamco non ad ex non ex nulla excepteur est veniam in. Nostrud consectetur consectetur culpa veniam laboris dolor.\r\n",
        "service_date": "2014-07-24T23:33:45 +04:00",
        "quantity": {
          "adults": 1,
          "children": 1
        },
        "price_person": "$354.03",
        "banner": "http://s3-us-west-2.amazonaws.com/abgv1/banners/img_4.jpg"
      },
      {
        "name": "ad irure ad veniam occaecat",
        "description": "Ad fugiat id occaecat Lorem officia anim id magna ea nulla. Amet eiusmod culpa consectetur aliquip do cillum officia. Sunt veniam culpa labore sunt amet sit mollit Lorem eiusmod nulla est adipisicing tempor. Ut laborum tempor minim voluptate. Tempor deserunt magna quis anim quis. Nostrud ex ipsum incididunt ullamco et.\r\nId officia id Lorem velit tempor elit tempor id enim commodo Lorem est nulla labore. Labore nostrud labore Lorem ad adipisicing dolor aute. Ullamco irure pariatur nostrud laborum nisi nostrud incididunt adipisicing pariatur occaecat. Minim nulla officia reprehenderit reprehenderit.\r\n",
        "service_date": "2014-03-07T21:05:22 +05:00",
        "quantity": {
          "adults": 2,
          "children": 1
        },
        "price_person": "$376.25",
        "banner": "http://s3-us-west-2.amazonaws.com/abgv1/banners/img_2.jpg"
      },
      {
        "name": "non tempor elit amet dolor",
        "description": "Eu est Lorem occaecat sunt ea eu qui et ea esse incididunt consequat laboris. Minim voluptate eu et id. Dolor commodo exercitation nisi pariatur occaecat culpa sunt cupidatat elit nulla. Nisi irure consequat exercitation officia cupidatat incididunt. Fugiat officia proident aliqua anim non eiusmod proident exercitation veniam aliquip ea.\r\nDo laborum anim nisi consectetur officia in tempor occaecat nostrud. Irure consequat deserunt ad eiusmod cillum ex deserunt ut cillum tempor ad sit occaecat irure. Veniam irure esse anim ullamco elit pariatur sint mollit consectetur adipisicing. Ut aliquip dolor laboris nisi nostrud labore laboris cillum sunt aute nostrud Lorem dolor incididunt. Cupidatat labore Lorem qui amet qui ad eu incididunt sunt consequat dolore elit magna sunt. Nostrud reprehenderit culpa in enim consectetur mollit veniam excepteur aliqua velit amet enim non.\r\n",
        "service_date": "2014-09-29T03:21:50 +04:00",
        "quantity": {
          "adults": 2,
          "children": 3
        },
        "price_person": "$149",
        "banner": "http://s3-us-west-2.amazonaws.com/abgv1/banners/img_3.jpg"
      }
    ],
    "grand_total": "$925.04"

};










//pdf creation function
var makePDF = function(object){
  //function to pull images to local storage
  var currentBannerFromURL = function(imageLink){
    if(imageLink.indexOf('https:')>-1){
      var location = imageLink.replace('https://','').replace(/\//g,'-');
    }
    else{
      var location = imageLink.replace('http://','').replace(/\//g,'-');
    }
    var fileName = 'a_' + location;

    var request = http.get(imageLink, function(res){
      var imagedata = '';
      res.setEncoding('binary');
      res.on('data', function(chunk){
        imagedata += chunk
      });
      res.on('end', function(){
        var fileName = 'a_' + location;
        fs.exists(fileName, function (exists) {
          if(exists){
            // console.log('exists');
          }
          else{
            console.log('doesnt exist,saving image locally');
            fs.writeFile(fileName,imagedata,'binary',function(err){
              if (err){
                //how should i throw this error?
                throw err
              }
              else{
                // console.log('File saved.')
              }
            });
          }
        });
      });
    });
  };
  //function to create an array of sorted service dates with no duplicates
  var dateArrayFunc = function(){
    var date_sort_asc = function (date1, date2) {
      if (new Date(date1).getTime() > new Date(date2).getTime()) return 1;
      if (new Date(date1).getTime() < new Date(date2).getTime()) return -1;
      return 0;
    };
    var datesArray = [];
    for(q=0;q<object.services.length;q++){
      var a = object.services[q].service_date.replace(/\s/g, '');
      var b = moment(a).format("MMMM DD, YYYY");
      if(datesArray.indexOf(b)==-1){
        datesArray.push(b);
      }
    }
    return datesArray.sort(date_sort_asc);
  };
  //start of whats run in pdfMake function
  datesArray = dateArrayFunc();
  doc = new PDFDocument();
  doc.pipe(fs.createWriteStream('output.pdf'));
  doc.save()
  .font('Bitter-Regular.ttf')
  .fontSize(25)
  .image("abgBanner.png",0,0,{width: 612})
  .fontSize(11)
  .text(moment().format("MMMM DD, YYYY"),460,153,{lineBreak:false})
  .text('Dear '+object.name+',',50, 165)
  .moveDown(.6)
  .text(object.message,65)
  .moveDown(.8)
  .text(object.agent,50)
  .moveDown(.9)
  .fontSize(16)
  .fillColor("#2980b9")
  .text('Itinerary - '+object.group_name,{align:'center'})
  for(m=0;m<datesArray.length;m++){
    doc.moveDown(.7)
    .fontSize(16)
    .fillColor("#3498db")
    .text(datesArray[m],50);
    for(x=0;x<object.services.length;x++){
      if(new Date(object.services[x].service_date.replace(/\s/g, '')).getDate() == new Date(datesArray[m]).getDate()){
        currentBannerFromURL(object.services[x].banner);
        doc.fontSize(12)
        .fillColor("black")
        .moveDown(.75)
        .font('Bitter-Bold.ttf')
        .text(object.services[x].name,  82)
        .font('Bitter-Regular.ttf')
        .moveUp()
        .fontSize(11)
        .text('Price per person: USD '+object.services[x].price_person, {align:"right"})
        .moveDown(.45)
        .text(object.services[x].description,82)
        .moveDown(.8)
        //generate banner image for service
        if(object.services[x].banner.indexOf('https:')>-1){
          var fileName = 'a_'+object.services[x].banner.replace('https://','').replace(/\//g,'-');
        }
        else{
          var fileName = 'a_'+object.services[x].banner.replace('http://','').replace(/\//g,'-');
        }
        var a4 = (doc.page.width - sizeOf(fileName).width);
        doc.image(fileName,a4/2);
      }
    }
  }
  doc.end();
}
makePDF(fakeP);












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
