(function(){
Template.__checkName("SideMenue");
Template["SideMenue"] = new Template("Template.SideMenue", (function() {
  var view = this;
  return HTML.ASIDE({
    id: "sideMenue",
    style: function() {
      return [ "position: relative; left: 0px; height: ", Spacebars.mustache(view.lookup("sideHeight")) ];
    }
  }, "\n        ", HTML.UL({
    "class": "sideUlclass"
  }, "\n            ", HTML.LI({
    id: "sideFirst",
    "class": "sideMain dropdown"
  }, "\n                ", HTML.Raw('<div class="sideMainfont">\n                    <img src="defaultprofile.jpg">\n                </div>'), "\n                ", HTML.A({
    id: "profile",
    "data-toggle": "dropdown",
    "class": "dropdown-toggle",
    href: "#",
    "aria-expanded": "false"
  }, "\n                    ", HTML.DIV("\n                        ", HTML.DIV({
    "class": "profileName"
  }, HTML.DIV(Spacebars.include(view.lookupTemplate("uname")))), "\n                        ", HTML.Raw('<div class="profileteam">동서대학교 <span class="glyphicon glyphicon-triangle-bottom"></span></div>'), "\n                    "), "\n                "), "\n                ", HTML.Raw('<ul id="profileDropdown" class="dropdown-menu" style="position: absolute; left: 70px;">\n                    <li><a href="" class="profileteam">프로필</a></li>\n                    <li><a href="" class="profileteam">친구</a></li>\n                </ul>'), "\n                ", HTML.SPAN({
    id: "sideMainimg",
    "class": function() {
      return Spacebars.mustache(view.lookup("display"));
    }
  }), "\n            "), "\n            ", HTML.Raw('<!--<li id="navId" class="sideSize"><span id="Nav" class="sideMargin">Navigation</span></li>-->'), "\n        "), "\n        ", HTML.DIV("\n            ", HTML.Raw('<div class="sideMenue-panel">\n                Navigation\n            </div>'), "\n            ", Blaze.Each(function() {
    return Spacebars.call(view.lookup("Navigation"));
  }, function() {
    return [ "\n                ", HTML.A({
      href: function() {
        return Spacebars.mustache(view.lookup("link"));
      }
    }, HTML.DIV({
      "class": "sideMenue-panel sideMenue-panel-item"
    }, Blaze.View("lookup:title", function() {
      return Spacebars.mustache(view.lookup("title"));
    }), HTML.SPAN({
      style: "float: right",
      "class": function() {
        return Spacebars.mustache(view.lookup("icon"));
      }
    }))), "\n            " ];
  }), "\n        "), "\n    ");
}));

}).call(this);
