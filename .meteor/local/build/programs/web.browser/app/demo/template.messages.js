(function(){
Template.__checkName("messages");
Template["messages"] = new Template("Template.messages", (function() {
  var view = this;
  return Blaze.Each(function() {
    return Spacebars.call(view.lookup("messages"));
  }, function() {
    return [ "\n\n        ", HTML.P({
      "class": function() {
        return Blaze.If(function() {
          return Spacebars.call(view.lookup("key"));
        }, function() {
          return "psb";
        });
      }
    }, HTML.STRONG(Blaze.View("lookup:name", function() {
      return Spacebars.mustache(view.lookup("name"));
    }), ":"), " ", Blaze.View("lookup:message", function() {
      return Spacebars.mustache(view.lookup("message"));
    })), "\n\n\n    " ];
  });
}));

}).call(this);
