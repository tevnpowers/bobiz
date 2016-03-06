'use strict';

var env = process.env.NODE_ENV || 'development';
var async = require('async');
var data = require('../data/ourdb');
var mongoose = require('mongoose');
var config = require('../config/config')[env];
var logger = require('../config/logger');
var fs = require('fs');


var app = require('../server');

var Business = mongoose.model('Business');
var User = mongoose.model('User');

var loadUsers = function(users) {
    async.each(users, function (u, cb) {
        console.log('adding user ' + u.username);
        var user = new User(u);
        user.save(function (err, doc) {
            if (err) {
                cb(err);
            } else {
                console.log('loaded ' + doc.firstname + ' ' + doc.lastname);
                cb();
            }
        });
    }, function (err) {
        // if any of the file processing produced an error, err would equal that error
        if (err) {
            console.log('adding user failed: ' + err);
        } else {
          console.log('all users loaded...');
          return;
        }
    });
};

var loadBusinesses = function(businesses) {
    async.each(businesses, function(business,cb) {
        var b = new Business(business);
        b.save(function(err, biz) {
            if(err) {
                console.log('adding biz failed: ' + err);
                cb(err);
            } else {
              console.log('added biz ' + biz.name);
              cb();
            }
        });
    }, function (err) {
        if (err) {
            console.log('adding biz failed: ' + err);
        } else {
            console.log('all businesses loaded...');
            return;
        }
    });
};

var loadReviews = function() {
  Business.find({}, function(err, businesses) {
    if(err) {
      throw (err);
    }
    console.log('found ' + businesses.length + ' businesses');
    async.each(businesses,function(biz, cb) {
      //each user will review each business
      console.log('adding reviews for business ' + biz.name);
      User.find({}, function(err, users) {
        if(err) {
          throw (err);
        }

        async.each(users,function(user,cb) {
          var review = {
              rating: (function() { return Math.round(Math.random() * 10) > 5 ? 'Good' : 'Bad'; })()
          }
          console.log('adding ' + users.length + ' reviews for ' + JSON.stringify(biz));
          Business.addReview(biz,user,review,function(err,doc) {
            if(err) {
              throw err;
            }
            console.log('added review ' + doc.rating + ' from ' + user.username + ' for ' + biz.name);
            cb();
          });
        })
      });
    });
  });
}


async.series([
    function(cb) {
      loadUsers(data.users);
      cb();
    },
    function(cb) {
      loadBusinesses(data.businesses);
      cb();
    },
    function(cb) {
      loadReviews();
      cb();
    }
]);

/*
var review = {
            rating: function() { return Math.round(Math.random() * 10) > 5 ? 'Good' : 'Bad'; }
        }
*/
