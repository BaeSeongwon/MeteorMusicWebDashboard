(function(){
Template.__checkName("FavoriteBoard");
Template["FavoriteBoard"] = new Template("Template.FavoriteBoard", (function() {
  var view = this;
  return HTML.DIV({
    "class": "row MainContainer",
    style: "margin-left: 250px; background-color: ghostwhite;"
  }, "\n        ", HTML.DIV({
    style: "position: absolute; width: calc(100% - 40px); left: 50%; transform: translateX(-50%);"
  }, "\n            ", HTML.Raw('<div class="form-group has-warning" style="width: calc(100% - 50%); display: inline-block;">\n                <label class="control-label" for="inputWarning">메시지를 입력하세요!</label>\n                <input type="text" id="inputWarning" class="form-control">\n            </div>'), "\n            ", HTML.Raw('<input type="file" id="fileupload" class="myFileInput" style="display: inline-block;">'), "\n            ", HTML.DIV("\n                ", HTML.DIV({
    "class": "jumbotron",
    style: "float: left; overflow:scroll; width: calc(100% - 50%);"
  }, "\n                    ", Spacebars.include(view.lookupTemplate("messages")), "\n                "), "\n                ", HTML.DIV({
    style: "float: right; overflow:scroll; width: calc(100% - 50%); background-color:whitesmoke;"
  }, "\n                    ", Spacebars.include(view.lookupTemplate("inputimage")), "\n                "), "\n            "), "\n        "), "\n    ");
}));

}).call(this);
