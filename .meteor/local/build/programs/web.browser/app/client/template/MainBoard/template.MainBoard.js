(function(){
Template.__checkName("MainBoard");
Template["MainBoard"] = new Template("Template.MainBoard", (function() {
  var view = this;
  return HTML.DIV({
    "class": "row MainContainer",
    style: "margin-left: 250px; background-color: #eeeeee;"
  }, "\n        ", HTML.DIV({
    style: "position: absolute; width: calc(100% - 40px); left: 50%; transform: translateX(-50%);"
  }, "\n            ", HTML.DIV({
    "class": "col-md-8 test"
  }, "\n                ", HTML.DIV({
    "class": "col-md-3",
    style: "padding: 0px;"
  }, "\n                    ", Spacebars.include(view.lookupTemplate("MainPicture")), "\n                "), "\n                ", HTML.DIV({
    "class": "col-md-6",
    style: "padding: 0px;"
  }, "\n                    ", Spacebars.include(view.lookupTemplate("MainGraph")), "\n                "), "\n                ", HTML.DIV({
    "class": "col-md-3",
    style: "padding: 0px;"
  }, "\n                    ", Spacebars.include(view.lookupTemplate("MainAlbum")), "\n                "), "\n            "), "\n            ", HTML.DIV({
    "class": "col-md-4 test"
  }, "\n                ", HTML.DIV({
    style: "background-color: white; width: 100%; height: 300px;"
  }, "\n                   ", Spacebars.include(view.lookupTemplate("MainYoutube")), "\n                "), "\n            "), "\n            ", HTML.DIV({
    "class": "col-md-6 test"
  }, "\n                ", Spacebars.include(view.lookupTemplate("MainMusicChart")), "\n            "), "\n            ", HTML.DIV({
    "class": "col-md-6 test",
    id: "txt1"
  }, "\n             ", Spacebars.include(view.lookupTemplate("MainTwitter")), "\n            "), "\n        "), "\n        ", HTML.DIV({
    "class": "imagePopup"
  }, "\n            ", HTML.Raw('<span id="delPopup" class="glyphicon glyphicon-remove" style="cursor: pointer; float: right; font-size: 15px"></span>'), "\n            ", HTML.H1(Blaze.View("lookup:title", function() {
    return Spacebars.mustache(view.lookup("title"));
  })), "\n            ", Blaze.Each(function() {
    return Spacebars.call(view.lookup("Img"));
  }, function() {
    return [ "\n                ", HTML.DIV({
      "class": "imgBox",
      style: "cursor: pointer; float: left; padding: 5px;"
    }, "\n                    ", HTML.IMG({
      "class": "imgBorder",
      src: function() {
        return Spacebars.mustache(view.lookup("src"));
      }
    }), "\n                "), "\n            " ];
  }), "\n        "), "\n    ");
}));

}).call(this);
