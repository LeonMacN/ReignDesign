var axios = require('axios');
var _ = require('lodash');
var mongoose = require("mongoose");
var feedsSchema, feedModel;

function init(){
  mongoose.Promise = require("bluebird");
  mongoose
    .connect("mongodb://localhost:27017/reignDesign", {
      useMongoClient: true
    })
    .then(
      function(response) {
        console.log("Mongo Connected!");
      },
      function(err) {
        console.log("Error connecting mongo!");
      }
    );

  feedsSchema = mongoose.Schema({
    created_at: Date,
    title: String,
    url: String,
    author: String,
    story_id: Number,
    story_title: String,
    story_url: String
  });

  feedModel = mongoose.model("Feed", feedsSchema);
}

init();

module.exports = {
  feedsSchema: function() {
    return feedsSchema;
  },
  feedModel: function() {
    return feedModel;
  },
  populateDB: function() {
    axios.get('https://hn.algolia.com/api/v1/search_by_date?query=nodejs').then(function(response){
      var feeds = response.data.hits;
      _.each(feeds, function(feed){
        var feedObj = {
          created_at: feed.created_at,
          title: feed.title,
          url: feed.url,
          author: feed.author,
          story_id: feed.story_id,
          story_title: feed.story_title,
          story_url: feed.story_url,
        };
        feedModel.find({story_id: feed.story_id}).then(function(resp, err){
          if(resp.length === 0){
            var data = new feedModel(feedObj);
            data.save();
          }
        });
      });
    });
  }
};
