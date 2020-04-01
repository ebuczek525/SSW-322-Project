const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const url = 'mongodb://testsUser:tests@localhost:27017/tests';

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect(`mongodb://testsUser:tests@localhost:27017/tests`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      auth: {
        user: 'testsUser',
        password: 'tests',
      },
    }) .then(
      () => {
        console.log("success")
      },
      (error) => {
        console.log(error)
      },
    )


app.use(cors());
app.use(bodyParser.json({limit: '256mb'}));
app.use(bodyParser.urlencoded({extended: true}));

const testSchema = new mongoose.Schema({
    testOrSurvey: Boolean,
    testName: String,
    desc: String,
    questions: [Object]
});

const test = mongoose.model('test', testSchema);

app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

app.get('/test', function(req, res) {
    return res.send('Received a GET HTTP method!');
  });

app.post('/display', function(req, res) {
    // req.body => { surveyOrCunt: Boolean, description }
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
    
});

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

const PORT = process.env.PORT || 8080;
app.listen(PORT, function() {
  console.log('Dev app listening on port ' + PORT + '!');
});