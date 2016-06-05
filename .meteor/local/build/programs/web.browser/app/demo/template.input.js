(function(){
Template.__checkName("input");
Template["input"] = new Template("Template.input", (function() {
  var view = this;
  return HTML.Raw('<p>메세지를 입력하세요: <input type="text" id="message"></p>');
}));

}).call(this);
