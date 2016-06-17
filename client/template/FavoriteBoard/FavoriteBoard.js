if(Meteor.isClient){

    Template.FavoriteBoard.events = {
        'keydown input#inputWarning' : function (event) {
            if (event.which == 13) { // 13 is the enter key event
                if (Meteor.user())
                    var name = Meteor.user().profile.name;

                else
                    var name = '비회원';
                var message = document.getElementById('inputWarning');

                if (message.value != '') {

                    Messages.insert({
                        name: name,
                        message: message.value,
                        time: new Date()
                    });

                    document.getElementById('inputWarning').value = '';

                    message.value = '';
                }
            }
        },


        'change .myFileInput' :function (event, template) {
            FS.Utility.eachFile(event, function(file) {

                    Images.insert(file,function (err, fileObj) {

                    });
            });
        }

    }

}