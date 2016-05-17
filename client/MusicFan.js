Session.setDefault("sideMenue","glyphicon glyphicon-chevron-left");
Session.setDefault("sideHeight",window.outerHeight - 70);

//멜론 API 인증
$(document).ready(function(){
  PlanetX.init({
    appkey : '851b0a60-1a2a-3b84-afb6-f60d9b6bb60e',
    client_id : "8cd1a504-afc1-3e13-a8f2-9201e35637f6",
    scope : "melon",
    savingToken : true
  });
  PlanetX.api( "get", "http://apis.skplanetx.com/melon/newreleases/albums?version=1&page=0&count=100", "JSON", { "version" : 1 }, function(data){console.log(data)} );;
});

Template.SideMenue.helpers({
  display : function() {return Session.get("sideMenue");},
  Navigation : sideMenueObject.Navigation,
  sideHeight : function() {return Session.get("sideHeight")}
});

Template.SideMenue.events({
  'click #sideMainimg': function () {
    if(sideMenueObject.door == "open"){
      sideMenueAnimation();
      Session.set("sideMenue","glyphicon glyphicon-chevron-right");
    }else{
      sideMenueAnimation();
      Session.set("sideMenue","glyphicon glyphicon-chevron-left");
    }
  },
  'click #profile': function() {
    if(profileObject.dropdown == "invisible"){
      $("#profileDropdown").fadeIn();
      profileDropdownAnimation();
      profileObject.dropdown = "visible";
    }else{
      $("#profileDropdown").fadeOut(function(){return profileDropdown.style.left = 70 + 'px';});
      profileObject.dropdown = "invisible";
    };
  }
});

//side 메뉴 애니메이션
function sideMenueAnimation(){
  if(sideMenueObject.door == "open"){
    sideMenueObject.width -= 10;
    sideMenue.style.left = parseInt(sideMenue.style.left) - 10 + 'px';
    document.getElementsByClassName("MainContainer")[0].style.width = "calc(100% - " + sideMenueObject.width + "px)";
    document.getElementsByClassName("MainContainer")[0].style.marginLeft = parseInt(document.getElementsByClassName("MainContainer")[0].style.marginLeft) - 10 + 'px';
    if(parseInt(sideMenue.style.left) != -170){
      requestAnimationFrame(sideMenueAnimation);
    }else{
      sideMenueObject.door = "close";
    }
  }else if(sideMenueObject.door == "close"){
    sideMenueObject.width += 10;
    sideMenue.style.left = parseInt(sideMenue.style.left) + 10 + 'px';
    document.getElementsByClassName("MainContainer")[0].style.width = "calc(100% - " + sideMenueObject.width +  "px)";
    document.getElementsByClassName("MainContainer")[0].style.marginLeft = parseInt(document.getElementsByClassName("MainContainer")[0].style.marginLeft) + 10 + 'px';
    if(parseInt(sideMenue.style.left) != 0){
      requestAnimationFrame(sideMenueAnimation);
    }else{
      sideMenueObject.door = "open";
    }
  }
};

//profile dropdown 애니메이션
function profileDropdownAnimation(){
  profileDropdown.style.left = parseInt(profileDropdown.style.left) - 1 + 'px';

  if(parseInt(profileDropdown.style.left) >= 25){
    requestAnimationFrame(profileDropdownAnimation);
  }
};
