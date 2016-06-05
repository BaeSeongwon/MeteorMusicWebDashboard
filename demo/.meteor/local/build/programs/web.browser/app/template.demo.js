(function(){
Template.body.addContent((function() {
  var view = this;
  return [ Blaze._TemplateWith(function() {
    return {
      align: Spacebars.call("left")
    };
  }, function() {
    return Spacebars.include(view.lookupTemplate("loginButtons"));
  }), HTML.Raw("<br>\n<h1>Chatting</h1>\n"), Spacebars.include(view.lookupTemplate("welcome")), "\n", Spacebars.include(view.lookupTemplate("input")), "\n", HTML.DIV({
    style: "overflow:scroll; width:300px; height:150px; padding:10px; background-color:gold;"
  }, "\n", Spacebars.include(view.lookupTemplate("messages")), "\n") ];
}));
Meteor.startup(Template.body.renderToDocument);

Template.__checkName("welcome");
Template["welcome"] = new Template("Template.welcome", (function() {
  var view = this;
  return HTML.Raw("<p>\n       닷넷 채팅방!!!!!!!!!!\n    </p>");
}));

}).call(this);
