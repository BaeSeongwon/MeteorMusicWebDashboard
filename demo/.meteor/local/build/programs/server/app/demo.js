(function(){

/////////////////////////////////////////////////////////////////////////
//                                                                     //
// demo.js                                                             //
//                                                                     //
/////////////////////////////////////////////////////////////////////////
                                                                       //
Messages = new Meteor.Collection('messages');                          // 1
if (Meteor.isClient) {}                                                // 2
                                                                       //
if (Meteor.isServer) {                                                 // 8
                                                                       //
  Meteor.startup(function () {});                                      // 10
}                                                                      //
/////////////////////////////////////////////////////////////////////////

}).call(this);

//# sourceMappingURL=demo.js.map
