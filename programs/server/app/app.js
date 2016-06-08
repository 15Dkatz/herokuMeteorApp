var require = meteorInstall({"both":{"posts.js":function(){

///////////////////////////////////////////////////////////////////////
//                                                                   //
// both/posts.js                                                     //
//                                                                   //
///////////////////////////////////////////////////////////////////////
                                                                     //
Posts = new Mongo.Collection('posts');                               // 1
                                                                     //
Meteor.methods({                                                     // 3
  'addPost': function () {                                           // 4
    function addPost() {                                             // 4
      Posts.insert({ title: "Post " + Random.id() });                // 5
    }                                                                //
                                                                     //
    return addPost;                                                  //
  }(),                                                               //
                                                                     //
  'deletePost': function () {                                        // 8
    function deletePost() {                                          // 8
      var post = Posts.findOne();                                    // 9
      if (post) {                                                    // 10
        Posts.remove({ _id: post._id });                             // 11
      }                                                              //
    }                                                                //
                                                                     //
    return deletePost;                                               //
  }()                                                                //
});                                                                  //
///////////////////////////////////////////////////////////////////////

}},"server":{"app.js":function(){

///////////////////////////////////////////////////////////////////////
//                                                                   //
// server/app.js                                                     //
//                                                                   //
///////////////////////////////////////////////////////////////////////
                                                                     //
Meteor.startup(function () {                                         // 1
  if (Posts.find().count() === 0) {                                  // 2
    for (i = 1; i < 10; i++) {                                       // 3
      Posts.insert({ title: 'Post ' + Random.id() });                // 4
    }                                                                //
  }                                                                  //
});                                                                  //
                                                                     //
Meteor.publish('posts', function () {                                // 9
  return Posts.find();                                               // 10
});                                                                  //
///////////////////////////////////////////////////////////////////////

}},"meteor-app.js":function(){

///////////////////////////////////////////////////////////////////////
//                                                                   //
// meteor-app.js                                                     //
//                                                                   //
///////////////////////////////////////////////////////////////////////
                                                                     //
if (Meteor.isClient) {                                               // 1
  // counter starts at 0                                             //
  Session.setDefault('counter', 0);                                  // 3
                                                                     //
  Template.hello.helpers({                                           // 5
    counter: function () {                                           // 6
      function counter() {                                           // 6
        return Session.get('counter');                               // 7
      }                                                              //
                                                                     //
      return counter;                                                //
    }()                                                              //
  });                                                                //
                                                                     //
  Template.hello.events({                                            // 11
    'click button': function () {                                    // 12
      function clickButton() {                                       // 12
        // increment the counter when button is clicked              //
        Session.set('counter', Session.get('counter') + 1);          // 14
      }                                                              //
                                                                     //
      return clickButton;                                            //
    }()                                                              //
  });                                                                //
}                                                                    //
                                                                     //
if (Meteor.isServer) {                                               // 19
  Meteor.startup(function () {                                       // 20
    // code to run on server at startup                              //
  });                                                                //
}                                                                    //
///////////////////////////////////////////////////////////////////////

}},{"extensions":[".js",".json"]});
require("./both/posts.js");
require("./server/app.js");
require("./meteor-app.js");
//# sourceMappingURL=app.js.map
