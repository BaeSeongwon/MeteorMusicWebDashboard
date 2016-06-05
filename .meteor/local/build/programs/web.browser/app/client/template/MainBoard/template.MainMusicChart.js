(function(){
Template.__checkName("MainMusicChart");
Template["MainMusicChart"] = new Template("Template.MainMusicChart", (function() {
  var view = this;
  return HTML.DIV({
    id: "musciChartContainer",
    style: "background-color: white; width: 100%; height: 400px; overflow: auto;"
  }, "\n        ", HTML.NAV({
    "class": "navContainer"
  }, "\n            ", HTML.DIV({
    "class": "container-fluid"
  }, "\n                ", HTML.DIV({
    "class": "navbar-brand",
    style: "float: left; font-size: 15px;"
  }, HTML.STRONG(Blaze.View("lookup:melonChartTitle", function() {
    return Spacebars.mustache(view.lookup("melonChartTitle"));
  }))), "\n                ", HTML.Raw('<div class="btn-group" style="float: right;">\n                    <a class="btn">차트</a>\n                    <a href="bootstrap-elements.html" data-target="#" class="btn dropdown-toggle" data-toggle="dropdown"><span class="caret"></span></a>\n                    <ul class="dropdown-menu">\n                        <li><a>실시간 차트</a></li>\n                        <li><a>일간 차트</a></li>\n                        <li><a>앨범 차트</a></li>\n                        <li class="divider"></li>\n                        <li><a>최신 음악</a></li>\n                    </ul>\n                </div>'), "\n            "), "\n        "), "\n        ", HTML.TABLE({
    "class": "table"
  }, "\n            ", HTML.THEAD("\n                ", HTML.TR("\n                    ", HTML.TH("No"), "\n                    ", HTML.TH("곡정보"), "\n                    ", HTML.TH("좋아요"), "\n                "), "\n            "), "\n            ", HTML.TBODY("\n                ", Blaze.Each(function() {
    return Spacebars.call(view.lookup("MelonCharts"));
  }, function() {
    return [ "\n                    ", HTML.TR("\n                        ", HTML.TD({
      id: "albumNum"
    }, Blaze.View("lookup:count", function() {
      return Spacebars.mustache(view.lookup("count"));
    })), "\n                        ", HTML.TD("\n                            ", HTML.IMG({
      src: function() {
        return Spacebars.mustache(view.lookup("albumImg"));
      },
      id: "albumImg"
    }), "\n                            ", HTML.DIV("\n                                ", HTML.DIV({
      id: "songName"
    }, HTML.STRONG(Blaze.View("lookup:songName", function() {
      return Spacebars.mustache(view.lookup("songName"));
    }))), "\n                                ", HTML.DIV("\n                                    ", HTML.SPAN({
      id: "albumArtist"
    }, Blaze.View("lookup:artistName", function() {
      return Spacebars.mustache(view.lookup("artistName"));
    })), "\n                                    ", HTML.EM("|"), "\n                                    ", HTML.SPAN({
      id: "albumTitle"
    }, Blaze.View("lookup:albumName", function() {
      return Spacebars.mustache(view.lookup("albumName"));
    })), "\n                                "), "\n                            "), "\n                        "), "\n                        ", HTML.TD("test"), "\n                    "), "\n                " ];
  }), "\n            "), "\n        "), HTML.Raw('\n        <a href=""><img class="pageTopButton" src="pageup.png" style="position: absolute; bottom: 20px; right: 30px;"></a>\n    '));
}));

}).call(this);
