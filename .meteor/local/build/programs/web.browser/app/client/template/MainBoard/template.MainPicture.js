(function(){
Template.__checkName("MainPicture");
Template["MainPicture"] = new Template("Template.MainPicture", (function() {
  var view = this;
  return HTML.DIV({
    style: "background-color: white; width: 100%; height: 300px;"
  }, "\n        ", HTML.IMG({
    src: function() {
      return Spacebars.mustache(view.lookup("src"));
    },
    style: "width: 100%; height: 300px;"
  }), "\n    ");
}));

}).call(this);
