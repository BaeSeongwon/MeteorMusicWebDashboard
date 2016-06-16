(function(){
Template.__checkName("MainAlbum");
Template["MainAlbum"] = new Template("Template.MainAlbum", (function() {
  var view = this;
  return HTML.DIV({
    style: "background-color: white; width: 100%; height: 300px;"
  }, "\n        ", HTML.DIV({
    "class": "panel",
    style: "height: 300px; box-shadow: none;"
  }, "\n            ", HTML.DIV({
    "class": "pannelTitle"
  }, "\n                ", HTML.H3({
    "class": "panel-title"
  }, Blaze.View("lookup:Title", function() {
    return Spacebars.mustache(view.lookup("Title"));
  }), " - Album"), "\n            "), "\n            ", HTML.DIV({
    id: "albumList",
    "class": "panel-body",
    style: "position: static; background-color: #3D3D3D; height: calc(100% - 37px); overflow: auto;"
  }, "\n                ", HTML.TABLE({
    style: "color: white;"
  }, "\n                    ", HTML.TBODY("\n                        ", Blaze.Each(function() {
    return Spacebars.call(view.lookup("albumList"));
  }, function() {
    return [ "\n                        ", HTML.TR({
      id: "albumInfo"
    }, "\n                            ", HTML.TD({
      style: "width: 20px; padding: 2px;"
    }, Blaze.View("lookup:count", function() {
      return Spacebars.mustache(view.lookup("count"));
    })), "\n                            ", HTML.TD({
      style: "width: 50px; text-align: left; padding: 2px;"
    }, HTML.IMG({
      src: function() {
        return Spacebars.mustache(view.lookup("img"));
      },
      alt: ""
    })), "\n                            ", HTML.TD({
      style: "text-align: left; padding: 2px; cursor:pointer;"
    }, Blaze.View("lookup:albumName", function() {
      return Spacebars.mustache(view.lookup("albumName"));
    })), "\n                        "), "\n                        " ];
  }), "\n                    "), "\n                "), "\n            "), "\n        "), "\n    ");
}));

}).call(this);
