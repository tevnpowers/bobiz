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
        console.log("looking for: " + req.params.id);
        Business.findById(req.params.id,function(err, biz) {
            if(err) {
                console.log("error:" + err);
                return res.status(500).send(err);
            }

            if (biz === undefined) {
                return res.status(404).send({"error":"not found."});
            }
            console.log(JSON.stringify(biz.toObject()));
            // var bizObj = Business(biz.toObject());
            biz.toObject().ratingAggregate.then(function(rating) {
                var result = biz.toObject();
                result.ratingAggregate = rating;
                res.status(200).send(JSON.stringify(result));
                console.log("got rating: " + rating);
            });
        });
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