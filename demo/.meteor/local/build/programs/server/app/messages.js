(function(){

/////////////////////////////////////////////////////////////////////////
//                                                                     //
// messages.js                                                         //
//                                                                     //
/////////////////////////////////////////////////////////////////////////
                                                                       //
if (Meteor.isClient) {                                                 // 1
    Template.messages.helpers({                                        // 2
        messages: function () {                                        // 3
            return Messages.find({}, { sort: { time: -1 } });          // 4
        },                                                             //
        key: function () {                                             // 6
            if (Meteor.user().profile.name == this.name) {             // 7
                return true;                                           // 8
            }                                                          //
        }                                                              //
    });                                                                //
}                                                                      //
/////////////////////////////////////////////////////////////////////////

}).call(this);

//# sourceMappingURL=messages.js.map
