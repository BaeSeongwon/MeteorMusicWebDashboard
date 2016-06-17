(function(){
Template.__checkName("TopHeader");
Template["TopHeader"] = new Template("Template.TopHeader", (function() {
  var view = this;
  return HTML.DIV({
    "class": "topBar"
  }, "\n        ", HTML.DIV("\n            ", HTML.Raw('<div style="float: left;">\n                <div><strong style="font-size:18px;">Music fan</strong></div>\n                <div style="font-size:11px;">탑 서브 타이틀!</div>\n            </div>'), "\n            ", HTML.DIV({
    style: "float: right;"
  }, "\n                ", HTML.Raw('<div id="speechbbbbox" style="position: absolute; right: 300px; top: 25px;">\n                <input type="button" value="음성인식">\n                </div>'), "\n                ", HTML.SCRIPT("\n                    console.log(\"sdad\");\n                    if(!('webkitSpeechRecognition' in window)) $('#speechbbbbox').html('<strong>지원하지 않는 브라우저입니다.</strong>');\n                    else {\n                        var mic = new webkitSpeechRecognition();\n                        mic.continuous = true;\n                        mic.interimResults = true;\n                        mic.lang = 'ko-KR';\n                        mic.onresult = function(e) {\n                            var b = '', c = false;\n                            for(var i = e.resultIndex; i < e.results.length; ++i) {\n                                b += e.results[i][0].transcript;\n                                c = e.results[i].isFinal;\n                            }\n                            if($('#speechbbbbox .cning').length < 1)\n                                $('#speechbbbbox .cning').text(b);\n                            if(c) $('#speechbbbbox .cning').removeClass('cning');\n\n                            if(c==true)\n                            {\n                                console.log(b);\n                                $(document).ready(function () {\n                                    $('#searchInput').val(b);\n                                })\n                            }\n                        };\n                        mic.onend = function() {\n                            $('#speechbbbbox').removeClass('on');\n                        };\n                        $('#speechbbbbox').click(function() {\n                            if($('#speechbbbbox').hasClass('on')) mic.stop();\n                            else {\n                                alert('말해보아라.');\n                                mic.start();\n                            }\n                            $('#speechbbbbox').toggleClass('on');\n                        });\n                    }\n\n                "), "\n                ", HTML.DIV({
    style: "float: left; margin-top: 16px; margin-right: 20px;"
  }, "\n                    ", Spacebars.include(view.lookupTemplate("loginButtons")), "\n                "), "\n                ", HTML.Raw('<div class="form-group form-group label-floating is-empty" style="float:right; margin: 12px 0 0 0;">\n                    <label for="i4" class="control-label">Search</label>\n                    <input id="searchInput" type="text" class="form-control">\n                </div>'), "\n            "), "\n        "), "\n    ");
}));

}).call(this);
