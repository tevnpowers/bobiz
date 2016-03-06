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


exports.searchBusinesses = {
    json: function findOneJson(req,res) {
        var query = req.params.name;
        var nameTokens = query.split(" ");
        var nameRegex = nameTokens.join(".*|.*");
        nameRegex = ".*" + nameRegex + ".*";
        console.log(nameRegex);
        var results = [];

        Array.prototype.getUnique = function(){
           var u = {}, a = [];
           for(var i = 0, l = this.length; i < l; ++i){
              if(u.hasOwnProperty(this[i])) {
                 continue;
              }
              a.push(this[i]);
              u[this[i]] = 1;
           }
           return a;
        }

        console.log("searching " + query);
        Business.find({name: new RegExp(nameRegex, "i")}, function(err, bizs)
        {
            if(err) {
                console.log("error:" + err)
                return res.status(500).send(err)
            }
            //console.log("found " + bizs)
            var querySet = nameTokens.getUnique();

            // Sort by Jaccard similarity w/out normalization (no union)
            bizs.sort(function (c1, c2) {
                var intersection1 = 0;
                var intersection2 = 0;
                console.log(querySet);
                for (var i = 0; i < querySet.length; i++) { 
                    //console.log("uhhh" + new RegExp(".*" + querySet[i] + ".*", "i").test(c1.name))
                    if (new RegExp(".*" + querySet[i] + ".*", "i").test(c1.name))
                    {
                        intersection1++;
                    }
                    if (new RegExp(".*" + querySet[i] + ".*", "i").test(c2.name))
                    {
                        intersection2++;
                    }
                }
                //console.log(intersection1);
                return intersection2 - intersection1;
            })
            res.status(200).send(bizs);
        })
    }
}