'use strict';

var mongoose = require('mongoose');
var global = require('./config');
var businesses = require('../app/controllers/businesses');
var Business = mongoose.model('Business');

// var reviews = require('../app/controllers/reviews');

module.exports = function(app) {
  app.get(global.apiPrefix + '/businesses',
    function(req, res) {
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