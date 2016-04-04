'use strict';

var mongoose = require('mongoose');
var global = require('./config');
var businesses = require('../app/controllers/businesses');
var Business = mongoose.model('Business');
var http = require('http');

// var reviews = require('../app/controllers/reviews');

module.exports = function(app) {
  // respond with "hello world" when a GET request is made to the homepage
  app.get('/home', function(req, res) {
    res.sendfile('public/search.html');
  });

  app.get(global.apiPrefix + '/businesses',
    function(req, res) {
      console.log('hello');
      businesses.index.json(req, res);
    }
  );

  app.get(global.apiPrefix + '/businesses/:id',
    function(req, res) {
      businesses.findOne.json(req, res);
    }
  );

  app.get(global.apiPrefix + '/businesses/:id/reviews',
    function(req, res) {
      businesses.findBusinessReviews.json(req, res);
    }
  );

  app.post(global.apiPrefix + '/businesses/search',
    function(req, res) {
      businesses.searchBusinesses.json(req, res);
    }
  );

  app.get('/businesses/search',
    function(req, res) {
      console.log(req.query.name);
      var post_data = JSON.stringify({ 'name' : req.query.name });
      var post_options = {
          port: 5008,
          path: '/api/businesses/search',
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
              'Content-Length': Buffer.byteLength(post_data)
          }
      };

      var post_req = http.request(post_options, function(searchRes) {
          searchRes.setEncoding('utf8');
          var data = "";
          searchRes.on('data', function (chunk) {
            data += chunk;
          });

          searchRes.on('end', function() {
            res.send(data);
          });
      });

      // post the data
      post_req.write(post_data);
      post_req.end();
    }
  );

  app.post('/submitbusiness', function(req, res) {
    console.log(req.body);
    
    var businessData = {  name: req.body.name,
                          address: req.body.address,
                          hours: "9am - 5pm",
                          social: "twitter.com/dummy",
                          phone: req.body.phone,
                          website: "www.dummy.com",
                          category: "Test Category",
                          profileImageUrl: "....",
                          daysOpen: "Mon-Fri",
                          description: req.description,
                          email: req.body.email,
                          status: "A | BO",
                        };

    // res.send(businessData);

    var business = new Business(businessData); 
    
    business.save(function (err, business) {
      if (err) {
        res.status(400).send("Error" + err);
        return;
      }

      res.status(200).send("Success " + business);
    });
  });

  app.post('/createuser', function(req, res) {
      console.log(req.body);
      res.send("Create user placeholder...");
  });
};
