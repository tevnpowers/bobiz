'use strict';

var mongoose = require('mongoose');
var Business = mongoose.model('Business');

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

      res.status(200).send(biz)
    })
  }
}

exports.index = {
    json: function(req, res) {
        Business.find({}, function(err, businesses) {
            res.status(200).send(businesses);
        });
    }
};