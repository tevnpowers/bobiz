'use strict';

var mongoose = require('mongoose');
var Business = mongoose.model('Business');
var Review = mongoose.model('Review');
var ObjectId = require('mongoose').Types.ObjectId;


exports.index = {
    json: function(req, res) {
        Business.find({}, function(err, businesses) {
            res.status(200).send(businesses);
        });
    }
};

exports.findOne = {
  json: function findOneJson(req,res) {
    console.log("looking for: " + req.params.id)
    var result = []
    Business.findById(req.params.id,function(err,biz){
      if(err) {
        console.log("error:" + err)
        return res.status(500).send(err)
      }

      if(biz == undefined) {
        return res.status(404).send({"error":"not found."})
      }

      //need to calculate aggregate of all user reviews to generate a
      //rating before sending the data out
      //do a find on all reviews whose Business._id = biz._id
      //then a .reduce function to aggregate a final Good/Bad

      res.status(200).send(biz)
    })
  }
}


exports.findBusinessReviews = {
  json: function findOneJson(req,res) {
    console.log("looking for: " + req.params.id)
    var result = []
    Business.findById(req.params.id, function(err,biz){
      if(err) {
        console.log("error:" + err)
        return res.status(500).send(err)
      }

      if(biz == undefined) {
        return res.status(404).send({"error":"not found."})
      }
      console.log('found business ' + biz.name + ', looking for reviews...')
      Review.find({ business: biz.id }, function(err, reviews) {
        if(err) {
            console.log("error:" + err)
            return res.status(500).send(err)
        }
        res.status(200).send(reviews);
      });
    })
  }
}