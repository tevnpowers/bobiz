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

// BusinessSchema.virtual('ratingAggregate').get(() => { return { something: "another" }});
// BusinessSchema.virtual('ratingAggregate').get(() => new Promise((resolve,reject) => {
//     return resolve(5);
// }));

BusinessSchema.virtual('ratingAggregate').get(() => new Promise((resolve, reject) => {
   Review.find({ business: this.id }, function(err, reviews) {
        if(err) {
            console.log("error:" + err);
            return res.status(500).send(err);
        }

        console.log('aggregating ' + reviews.length + ' reviews for ' + this.name);
        var reviewValues = [];
        var totalRating = 0;
        for(var i = 0; i < reviews.length; i++) {
            totalRating += reviews[i].rating === 'Good' ? 1 : 0;
        }

        console.log('total rating: ' + totalRating);

        var aggregateRating = totalRating > (reviews.length / 2) ? 'Good' : 'Bad';
        this._ratingAggregate =  aggregateRating;
        return resolve(aggregateRating);
    });
   return 5;
}));

BusinessSchema.set('toObject', {
  getters: true
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

    reviewObject.save(function(err, doc) {
        if(err) {
            logger.error('addReview: error while adding review: ' + err);
            return cb(err,null);
        }
        return cb(null, reviewObject);
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

