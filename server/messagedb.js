Messages = new Meteor.Collection('messages');
Images = new FS.Collection('images', {stores: [new FS.Store.FileSystem('images', {path: '../../../../../../uploads/images'})]});