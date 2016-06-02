Messages = new Meteor.Collection('messages');
if (Meteor.isClient) {
    
    Template.messages.helpers({
        messages: function () {
            return Messages.find({}, {sort: {time: -1}});
        },
        key:function () {
            if(Meteor.user().profile.name==this.name){
                return true;
            
            }
             
        }
    });
}