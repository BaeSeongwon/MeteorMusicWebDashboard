(function(){
Template.body.addContent((function() {
  var view = this;
  return Blaze._TemplateWith(function() {
    return {
      align: Spacebars.call("left")
    };
  }, function() {
    return Spacebars.include(view.lookupTemplate("loginButtons"));
  });
}));
Meteor.startup(Template.body.renderToDocument);

Template.__checkName("Home");
Template["Home"] = new Template("Template.Home", (function() {
  var view = this;
  return [ Spacebars.include(view.lookupTemplate("TopHeader")), "\n    ", Spacebars.include(view.lookupTemplate("SideMenue")), "\n    ", Spacebars.include(view.lookupTemplate("yield")) ];
}));

}).call(this);
