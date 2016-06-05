(function(){

/////////////////////////////////////////////////////////////////////////
//                                                                     //
// demo/input.js                                                       //
//                                                                     //
/////////////////////////////////////////////////////////////////////////
                                                                       //
if (Meteor.isClient) {                                                 // 1
    Template.input.events = {                                          // 2
        'keydown input#message': function (event) {                    // 3
            if (event.which == 13) {                                   // 4
                // 13 is the enter key event                           //
                if (Meteor.user()) var name = Meteor.user().profile.name;else var name = '비회원';
                var message = document.getElementById('message');      // 9
                                                                       //
                if (message.value != '') {                             // 11
                    Messages.insert({                                  // 12
                        name: name,                                    // 13
                        message: message.value,                        // 14
                        time: Date.now()                               // 15
                    });                                                //
                                                                       //
                    document.getElementById('message').value = '';     // 18
                    message.value = '';                                // 19
                }                                                      //
            }                                                          //
        }                                                              //
    };                                                                 //
}                                                                      //
/////////////////////////////////////////////////////////////////////////

}).call(this);
