var axios = require('axios');
var db = require('../database');

var model = db.feedModel();

function getFeeds(){
    return model.find({}).sort('-created_at').then(function(resp){
        return resp;
    });
}

function deleteFeed(id){
    return model.remove({_id: id}).then(function(resp){
        return getFeeds();
    });
}

module.exports = {
    getFeeds: getFeeds,
    deleteFeed: deleteFeed
};