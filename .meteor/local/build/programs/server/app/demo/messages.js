(function(){

/////////////////////////////////////////////////////////////////////////
//                                                                     //
// demo/messages.js                                                    //
//                                                                     //
/////////////////////////////////////////////////////////////////////////
                                                                       //
Messages = new Meteor.Collection('messages');                          // 1
if (Meteor.isClient) {                                                 // 2
                                                                       //
    Template.messages.helpers({                                        // 4
        messages: function () {                                        // 5
            return Messages.find({}, { sort: { time: -1 } });          // 6
        },                                                             //
        key: function () {                                             // 8
            if (Meteor.user().profile.name == this.name) {             // 9
                return true;                                           // 10
            }                                                          //
        }                                                              //
    });                                                                //
}                                                                      //
/////////////////////////////////////////////////////////////////////////

}).call(this);

//# sourceMappingURL=messages.js.map
