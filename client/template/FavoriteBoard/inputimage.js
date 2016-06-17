if(Meteor.isClient){
    Template.inputimage.events = {

        'change .myFileInput' :function (event, template) {
            FS.Utility.eachFile(event, function(file) {
                if (Meteor.user())
                    Images.insert(file,function (err, fileObj) {

                    });
            });
        }
    }
        ,

        Template.inputimage.helpers({
            chatting:function () {
                return Images.find({},{sort: {uploadedAt:-1}});
            }
        });
}
