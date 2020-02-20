var express = require('express');
const MongoClient = require('mongodb').MongoClient;
var port = process.env.PORT || 3000;
var app = express();

// MongoDB
const uri = "mongodb+srv://pitviper:pitviper@cluster0-phevd.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });


app.post('/hit', (req, res) => {
    console.log(req);
    var hit = req.body;
    console.log('POST REQUEST');
    console.log(hit);
    if (!hit) return console.log('undefined hit')

    hit.datetime = new Date()
    // add to database
    client.connect((err, client) => {
      if (err) return console.log('FUCK', err);
      db = client.db('pitviper');
      db.collection('pi').save(hit, (err, result) => {
        if (err) return console.log(err)
        console.log('saved to database:', hit)
        client.close();
        res.redirect('/success')
      })
    });

});

app.get('/', function (req, res) {
  res.send('pitviper')
})

app.get('/success', function (req, res) {
  res.send('pitviper hit success')
})

app.listen(port, function () {
 console.log('Pitviper listening on port ', port);
});
