var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var User = new Schema ({
    timestamp: { type: Date, default: Date.now },
    firstname: String,
    lastname: String,
    email: String,
    username: String,
});

var BusinessSchema = new Schema({
    timestamp: { type: Date, default: Date.now },
    body: String,
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
    status: String //A = Active, BO = Black Owned, BL = Blacklisted
});

var TagSchema = new Schema({
    timestamp: { type: Date, default: Date.now },
    description: String
});

var ReviewSchema = new Schema({
    timestamp: { type: Date, default: Date.now },
    user  : {type: Number, ref: 'User'},
    business  : {type: Number, ref: 'Business'},
    tags  : [ TagSchema ],
    user  : {type: Number, ref: 'User'},
    rating: { enum: ['Good','Bad'] }
})
