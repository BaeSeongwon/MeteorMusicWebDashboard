(function(){

/////////////////////////////////////////////////////////////////////////
//                                                                     //
// client/MusicFan.js                                                  //
//                                                                     //
/////////////////////////////////////////////////////////////////////////
                                                                       //
Session.setDefault("sideMenue", "glyphicon glyphicon-chevron-left");   // 1
Session.setDefault("sideHeight", window.outerHeight - 70);             // 2
Session.setDefault("MelonChartTitle", "실시간");                          // 3
                                                                       //
//멜론 API 인증                                                            //
$(document).ready(function () {                                        // 6
  PlanetX.init({                                                       // 7
    appkey: '851b0a60-1a2a-3b84-afb6-f60d9b6bb60e',                    // 8
    client_id: "8cd1a504-afc1-3e13-a8f2-9201e35637f6",                 // 9
    scope: "melon",                                                    // 10
    savingToken: true                                                  // 11
  });                                                                  //
                                                                       //
  $("#musciChartContainer").scroll(function () {                       // 14
    console.log("실행");                                                 // 15
    if ($('#musciChartContainer').scrollTop() > 200) {                 // 16
      $('.pageTopButton').fadeIn();                                    // 17
    } else {                                                           //
      $('.pageTopButton').fadeOut();                                   // 19
    }                                                                  //
  });                                                                  //
});                                                                    //
                                                                       //
Template.SideMenue.helpers({                                           // 24
  display: function () {                                               // 25
    return Session.get("sideMenue");                                   // 25
  },                                                                   //
  Navigation: sideMenueObject.Navigation,                              // 26
  sideHeight: function () {                                            // 27
    return Session.get("sideHeight");                                  // 27
  }                                                                    //
});                                                                    //
                                                                       //
Template.SideMenue.events({                                            // 30
  'click #sideMainimg': function () {                                  // 31
    if (sideMenueObject.door == "open") {                              // 32
      sideMenueAnimation();                                            // 33
      Session.set("sideMenue", "glyphicon glyphicon-chevron-right");   // 34
    } else {                                                           //
      sideMenueAnimation();                                            // 36
      Session.set("sideMenue", "glyphicon glyphicon-chevron-left");    // 37
    }                                                                  //
  },                                                                   //
  'click #profile': function () {                                      // 40
    if (profileObject.dropdown == "invisible") {                       // 41
      $("#profileDropdown").fadeIn();                                  // 42
      profileDropdownAnimation();                                      // 43
      profileObject.dropdown = "visible";                              // 44
    } else {                                                           //
      $("#profileDropdown").fadeOut(function () {                      // 46
        return profileDropdown.style.left = 70 + 'px';                 // 46
      });                                                              //
      profileObject.dropdown = "invisible";                            // 47
    };                                                                 //
  }                                                                    //
});                                                                    //
                                                                       //
Template.MainMusicChart.helpers({                                      // 52
  melonChartTitle: function () {                                       // 53
    return Session.get("MelonChartTitle");                             // 53
  },                                                                   //
  MelonCharts: function () {                                           // 54
    return Session.get("MelonChart");                                  // 54
  }                                                                    //
});                                                                    //
                                                                       //
Template.MainMusicChart.events({                                       // 57
  'click li': function () {                                            // 58
    var target = event.target.innerText;                               // 59
    switch (target) {                                                  // 60
      case "실시간 차트":                                                   // 61
        {                                                              // 61
          MelonCall(callMelonAddress.realTimeMusic, callMelonAddress.realTimeMusicChart);
          Session.set("MelonChartTitle", "실시간");                       // 63
          break;                                                       // 64
        }                                                              //
      case "일간 차트":                                                    // 66
        {                                                              // 66
          MelonCall(callMelonAddress.today, callMelonAddress.todayChart);
          Session.set("MelonChartTitle", "일간");                        // 68
          break;                                                       // 69
        }                                                              //
      case "앨범 차트":                                                    // 70
        {                                                              // 71
          MelonCall(callMelonAddress.albumMusic, callMelonAddress.albumMusicChart);
          Session.set("MelonChartTitle", "앨범");                        // 73
          break;                                                       // 74
        }                                                              //
      case "최신 음악":                                                    // 76
        {                                                              // 76
          MelonCall(callMelonAddress.newMusic, callMelonAddress.newMusicChart);
          Session.set("MelonChartTitle", "최신");                        // 78
          break;                                                       // 79
        }                                                              //
    }                                                                  // 80
  }                                                                    //
});                                                                    //
                                                                       //
//side 메뉴 애니메이션                                                        //
function sideMenueAnimation() {                                        // 86
  if (sideMenueObject.door == "open") {                                // 87
    sideMenueObject.width -= 10;                                       // 88
    sideMenue.style.left = parseInt(sideMenue.style.left) - 10 + 'px';
    document.getElementsByClassName("MainContainer")[0].style.width = "calc(100% - " + sideMenueObject.width + "px)";
    document.getElementsByClassName("MainContainer")[0].style.marginLeft = parseInt(document.getElementsByClassName("MainContainer")[0].style.marginLeft) - 10 + 'px';
    if (parseInt(sideMenue.style.left) != -170) {                      // 92
      requestAnimationFrame(sideMenueAnimation);                       // 93
    } else {                                                           //
      sideMenueObject.door = "close";                                  // 95
    }                                                                  //
  } else if (sideMenueObject.door == "close") {                        //
    sideMenueObject.width += 10;                                       // 98
    sideMenue.style.left = parseInt(sideMenue.style.left) + 10 + 'px';
    document.getElementsByClassName("MainContainer")[0].style.width = "calc(100% - " + sideMenueObject.width + "px)";
    document.getElementsByClassName("MainContainer")[0].style.marginLeft = parseInt(document.getElementsByClassName("MainContainer")[0].style.marginLeft) + 10 + 'px';
    if (parseInt(sideMenue.style.left) != 0) {                         // 102
      requestAnimationFrame(sideMenueAnimation);                       // 103
    } else {                                                           //
      sideMenueObject.door = "open";                                   // 105
    }                                                                  //
  }                                                                    //
};                                                                     //
                                                                       //
//profile dropdown 애니메이션                                               //
function profileDropdownAnimation() {                                  // 111
  profileDropdown.style.left = parseInt(profileDropdown.style.left) - 1 + 'px';
                                                                       //
  if (parseInt(profileDropdown.style.left) >= 25) {                    // 114
    requestAnimationFrame(profileDropdownAnimation);                   // 115
  }                                                                    //
};                                                                     //
                                                                       //
/*멜론 차트 호출 함수*/                                                        //
function MelonCall(Adress, call) {                                     // 120
  PlanetX.api("get", Adress, "JSON", { "version": 1 }, function (data) {
    call(data);                                                        // 121
  });                                                                  //
};                                                                     //
/////////////////////////////////////////////////////////////////////////

}).call(this);
