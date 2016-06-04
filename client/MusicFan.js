Session.setDefault("sideMenue","glyphicon glyphicon-chevron-left");
Session.setDefault("sideHeight",window.outerHeight - 70);
Session.setDefault("MelonChartTitle","실시간");

//멜론 API 인증
$(document).ready(function(){
  PlanetX.init({
    appkey : '851b0a60-1a2a-3b84-afb6-f60d9b6bb60e',
    client_id : "8cd1a504-afc1-3e13-a8f2-9201e35637f6",
    scope : "melon",
    savingToken : true
  });
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

Template.MainMusicChart.helpers({
  melonChartTitle : function(){return Session.get("MelonChartTitle")},
  MelonCharts : function(){return Session.get("MelonChart")},
  chartType : function(){
    if(Session.get("MelonChartTitle") == "앨범"){
      return true;
    }
  },
  favoriteType : function(){
    if(Session.get("MelonChartTitle") == "최신"){
      return true;
    };
  }
});

Template.MainMusicChart.events({
  'click li': function(){
    var target = event.target.innerText;
    switch(target){
      case "실시간 차트":{
        MelonCall(callMelonAddress.realTimeMusic,callMelonAddress.realTimeTodayMusicChart);
        Session.set("MelonChartTitle","실시간");
        break;
      }
      case "일간 차트":{
        MelonCall(callMelonAddress.today,callMelonAddress.realTimeTodayMusicChart);
        Session.set("MelonChartTitle","일간");
        break;
      }
      case "앨범 차트":{
        MelonCall(callMelonAddress.albumMusic,callMelonAddress.albumMusicChart);
        Session.set("MelonChartTitle","앨범");
        break;
      }
      case "최신 음악":{
        MelonCall(callMelonAddress.newMusic,callMelonAddress.newMusicChart);
        Session.set("MelonChartTitle","최신");
        break;
      }
    }
  },
  'scroll #musicContainer' : function(event) {
    if(event.target.scrollTop > 1000){
      $(".pageTopButton").fadeIn();
    }else{
      $('.pageTopButton').fadeOut();
    }
  },
  'click .pageTopButton' : function() {
    $('#musicContainer').animate({scrollTop:0},450);
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

/*멜론 차트 호출 함수*/
function MelonCall(Adress,call){
  PlanetX.api("get",Adress,"JSON",{"version" : 1}, function(data){call(data)});
};