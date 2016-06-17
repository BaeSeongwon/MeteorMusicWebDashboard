Template.uname.helpers({
    name:function () {
        return Meteor.user().profile.name;
    }
});
