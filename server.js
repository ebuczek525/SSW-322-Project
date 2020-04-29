const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const database = require('./database.js')


const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
mongoose.Promise = global.Promise;



 database.connect("tests", (success) => {
      if(success){
          console.log("=Database Connected");
      }
      else {
          console.log("Database Connection Failed")
      }
  })



app.use(cors());
app.use(bodyParser.json({limit: '256mb'}));
app.use(bodyParser.urlencoded({extended: true}));

const testSchema = new mongoose.Schema({
    testOrSurvey: Boolean,
    testName: String,
    desc: String,
    questions: [Object]
});

const responseSchema = new mongoose.Schema({
    response: [Object]
})

const test = mongoose.model('test', testSchema);
const response = mongoose.model('response', responseSchema);

app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

app.get('/test', function(req, res) {
    return res.send('Received a GET HTTP method!');
  });

  const display  =  (req, res) => {
    console.log('got to display');
    console.log(req.body)
    if(req.body.id == undefined){
      res.sendStatus(400)
    }
    else{
      test.findById( req.body.id, (err, docs) => {
      if (err) {
        console.log(err);
        res.sendStatus(400)
      }
      else{
        res.send(docs);
      }
    });
    }
    
}

app.post('/display', display);

app.post('/modify', function(req, res, next) {
  console.log('got to modify post');
  console.log(req.body.id instanceof String);
    test.findOneAndUpdate(
      {_id: new ObjectId(req.body.id)}, 
      {
        testOrSurvey: req.body.code.testOrSurvey,
        testName: req.body.code.testName,
        desc: req.body.code.desc,
        questions: req.body.code.questions
      },
      function(err, result) {
        if (err) {
          res.send(err);
          console.log(req.body, err, result);
        } else {
          next()
          console.log(req.body, err, result);
        }
      }
    );
}, display);

app.post('/create', function(req, res) {
    const sentData = new test(req.body);
    console.log('got to post');

    sentData.save()
        .then((item) => {
          console.log('test saved to database');
          res.sendStatus(200);
        })
        .catch((err) => {
          console.log('errored out');
          res.status(400);
          res.send('got here db');
        });
    console.log('Bottom of server post');
    console.log('Req Body:', req.body);
});

app.post('/submitTest', /* function(req, res, next) {
  database.disconnect(() => {
    console.log('fucking like no other')
    database.connect("response",(success) => {
        if(success){
           next()
        }
        else {
            res.send("Something went wrong with switching databases");
        }
    })
  });

  
}, */ function(req, res, next) {
  console.log(req.body.code.questions)
  const sentData = new response({response: req.body.code.questions});
  console.log('got to submit test');

  sentData.save()
      .then(() => {
        console.log('test saved to database');
        res.status(200).send({fuck: 'off'})
      }, (err) => {
        console.log('errored out');
        res.status(400);
        res.send('got here db');
      })

  console.log('Bottom of server post');
  console.log('Req Body:', req.body);
  
  
}/*,  function(req, res, next) {
  database.disconnect(() => {
    database.connect("tests",(success) => {
        if(success){
          res.status(200);
        }
        else {
            res.send("Something went wrong with switching databases");
        }
    })
})} */
)

const PORT = process.env.PORT || 8080;
app.listen(PORT, function() {
  console.log('Dev app listening on port ' + PORT + '!');
});