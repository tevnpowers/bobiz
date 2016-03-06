'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    timestamp: { type: Date, default: Date.now },
    firstname: String,
    lastname: String,
    email: String,
    username: String,
});

var BusinessSchema = new Schema({
    timestamp: { type: Date, default: Date.now },
    name: String,
    address: String,
    hours: String,
    social: String,
    phone: String,
    website: String,
    category: String,
    profileImageUrl: String,
    daysOpen: String,
    description: String,
    email: String,
    status: String, //A = Active, BO = Black Owned, BL = Blacklisted
    reviews: [{ type: Schema.ObjectId, ref: 'Review' }]
});

BusinessSchema.statics.addReview = function(biz, user, review, cb) {
    // var User = mongoose.model('User');
    // var userObject = new User(user);

    // var Business = mongoose.model('Business');
    // var bizObject = new Business(biz);

    var Review = mongoose.model('Review');
    var reviewObject = new Review(review);

    reviewObject.user = user;
    reviewObject.business = biz;

    console.log('ADDREVIEW BIZ: ' + biz.name);

    reviewObject.save(function(err,doc) {
        if(err) {
            logger.error('addReview: error while adding review: ' + err);
            return cb(err,null);
        }
        return cb(null,reviewObject);
    })
};

var TagSchema = new Schema({
    timestamp: { type: Date, default: Date.now },
    value: String
});

var ReviewSchema = new Schema({
    timestamp: { type: Date, default: Date.now },
    user  : {type: Schema.ObjectId, ref: 'User'},
    business  : {type: Schema.ObjectId, ref: 'Business'},
    tags  : [ TagSchema ],
    rating: String
})

var User = mongoose.model('User', UserSchema);
var Business = mongoose.model('Business', BusinessSchema);
var Review = mongoose.model('Review', ReviewSchema);
var Tag = mongoose.model('Tag',TagSchema);

module.exports.User = User;
module.exports.Business = Business;
module.exports.Review = Review;
module.exports.Tag = Tag;

