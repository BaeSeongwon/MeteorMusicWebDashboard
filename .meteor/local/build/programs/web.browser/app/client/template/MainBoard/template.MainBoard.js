(function(){
Template.__checkName("MainBoard");
Template["MainBoard"] = new Template("Template.MainBoard", (function() {
  var view = this;
  return HTML.DIV({
    "class": "row MainContainer",
    style: "margin-left: 250px;"
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
  }, "\n                    ", Spacebars.include(view.lookupTemplate("MainAlbum")), "\n                "), "\n            "), "\n            ", HTML.Raw('<div class="col-md-4 test">\n                <div style="background-color: white; width: 100%; height: 300px;">\n                    여기는 유투브\n                </div>\n            </div>'), "\n            ", HTML.DIV({
    "class": "col-md-6 test"
  }, "\n                ", Spacebars.include(view.lookupTemplate("MainMusicChart")), "\n            "), "\n            ", HTML.Raw('<div class="col-md-6 test">\n                <div style="background-color: white; width: 100%; height: 400px;">\n                    여기는 sns\n                </div>\n            </div>'), "\n        "), "\n    ");
}));

}).call(this);
