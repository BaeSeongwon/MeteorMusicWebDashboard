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
Session.setDefault('choiceImg');                                       // 4
Session.setDefault('singer');                                          // 5
Session.setDefault('albumList');                                       // 6
                                                                       //
//멜론 API 인증                                                            //
Meteor.startup(function () {                                           // 9
  PlanetX.init({                                                       // 10
    appkey: '059e0e66-e58f-323e-a119-86f5ea10310d',                    // 11
    scope: "melon",                                                    // 12
    savingToken: true                                                  // 13
  });                                                                  //
                                                                       //
  MelonCall(callMelonAddress.realTimeMusic, callMelonAddress.realTimeTodayMusicChart);
  Session.set("MelonChartTitle", "실시간");                               // 17
});                                                                    //
                                                                       //
Template.SideMenue.helpers({                                           // 20
  display: function () {                                               // 21
    return Session.get("sideMenue");                                   // 21
  },                                                                   //
  Navigation: sideMenueObject.Navigation,                              // 22
  sideHeight: function () {                                            // 23
    return Session.get("sideHeight");                                  // 23
  }                                                                    //
});                                                                    //
                                                                       //
Template.SideMenue.events({                                            // 26
  'click #sideMainimg': function () {                                  // 27
    if (sideMenueObject.door == "open") {                              // 28
      sideMenueAnimation();                                            // 29
      Session.set("sideMenue", "glyphicon glyphicon-chevron-right");   // 30
    } else {                                                           //
      sideMenueAnimation();                                            // 32
      Session.set("sideMenue", "glyphicon glyphicon-chevron-left");    // 33
    }                                                                  //
  },                                                                   //
  'click #profile': function () {                                      // 36
    if (profileObject.dropdown == "invisible") {                       // 37
      $("#profileDropdown").fadeIn();                                  // 38
      profileDropdownAnimation();                                      // 39
      profileObject.dropdown = "visible";                              // 40
    } else {                                                           //
      $("#profileDropdown").fadeOut(function () {                      // 42
        return profileDropdown.style.left = 70 + 'px';                 // 42
      });                                                              //
      profileObject.dropdown = "invisible";                            // 43
    };                                                                 //
  }                                                                    //
});                                                                    //
                                                                       //
Template.TopHeader.events({                                            // 48
  'keyup #searchInput': function (event) {                             // 49
    if (event.which === 13) {                                          // 50
      Session.set("singer", $("#searchInput").val());                  // 51
      Session.set("thumNail", "");                                     // 52
      var url = daumService.urlMake($("#searchInput").val(), daumService.daumApiKey);
      daumService.daumAjax(url);                                       // 54
                                                                       //
      //수정 해야됨                                                         //
      _promise(daumService.daumImage).then(function (data) {           // 57
        searchImg(data);                                               // 58
      }, function (error) {                                            //
        console.log(error);                                            // 60
      });                                                              //
                                                                       //
      $(".popupBackground").fadeIn();                                  // 63
      $(".imagePopup").fadeIn();                                       // 64
    }                                                                  //
  }                                                                    //
});                                                                    //
                                                                       //
Template.MainBoard.helpers({                                           // 69
  title: function () {                                                 // 70
    return Session.get("singer");                                      // 71
  },                                                                   //
  Img: function () {                                                   // 73
    //console.log(Session.get("thumNail"));                            //
    return Session.get("thumNail");                                    // 75
  }                                                                    //
});                                                                    //
                                                                       //
Template.MainBoard.events({                                            // 79
  'click #delPopup': function () {                                     // 80
    $(".popupBackground").fadeOut();                                   // 81
    $(".imagePopup").fadeOut();                                        // 82
  },                                                                   //
  'click .imgBox': function () {                                       // 84
    $(".popupBackground").fadeOut();                                   // 85
    $(".imagePopup").fadeOut();                                        // 86
    stringImgEqualse($(event.target)[0].currentSrc);                   // 87
  }                                                                    //
});                                                                    //
                                                                       //
Template.MainMusicChart.helpers({                                      // 91
  melonChartTitle: function () {                                       // 92
    return Session.get("MelonChartTitle");                             // 92
  },                                                                   //
  MelonCharts: function () {                                           // 93
    return Session.get("MelonChart");                                  // 93
  },                                                                   //
  chartType: function () {                                             // 94
    if (Session.get("MelonChartTitle") == "앨범") {                      // 95
      return true;                                                     // 96
    }                                                                  //
  },                                                                   //
  favoriteType: function () {                                          // 99
    if (Session.get("MelonChartTitle") == "최신") {                      // 100
      return true;                                                     // 101
    };                                                                 //
  }                                                                    //
});                                                                    //
                                                                       //
Template.MainMusicChart.events({                                       // 106
  'click li': function () {                                            // 107
    var target = event.target.innerText;                               // 108
    switch (target) {                                                  // 109
      case "실시간 차트":                                                   // 110
        {                                                              // 110
          MelonCall(callMelonAddress.realTimeMusic, callMelonAddress.realTimeTodayMusicChart);
          Session.set("MelonChartTitle", "실시간");                       // 112
          break;                                                       // 113
        }                                                              //
      case "일간 차트":                                                    // 115
        {                                                              // 115
          MelonCall(callMelonAddress.today, callMelonAddress.realTimeTodayMusicChart);
          Session.set("MelonChartTitle", "일간");                        // 117
          break;                                                       // 118
        }                                                              //
      case "앨범 차트":                                                    // 120
        {                                                              // 120
          MelonCall(callMelonAddress.albumMusic, callMelonAddress.albumMusicChart);
          Session.set("MelonChartTitle", "앨범");                        // 122
          break;                                                       // 123
        }                                                              //
      case "최신 음악":                                                    // 125
        {                                                              // 125
          MelonCall(callMelonAddress.newMusic, callMelonAddress.newMusicChart);
          Session.set("MelonChartTitle", "최신");                        // 127
          break;                                                       // 128
        }                                                              //
    }                                                                  // 129
  },                                                                   //
  'scroll #musicContainer': function (event) {                         // 132
    if (event.target.scrollTop > 1000) {                               // 133
      $(".pageTopButton").fadeIn();                                    // 134
    } else {                                                           //
      $('.pageTopButton').fadeOut();                                   // 136
    }                                                                  //
  },                                                                   //
  'click .pageTopButton': function () {                                // 139
    $('#musicContainer').animate({ scrollTop: 0 }, 500);               // 140
  }                                                                    //
});                                                                    //
                                                                       //
Template.MainPicture.helpers({                                         // 144
  src: function () {                                                   // 145
    return Session.get('choiceImg');                                   // 146
  }                                                                    //
});                                                                    //
                                                                       //
Template.MainAlbum.helpers({                                           // 150
  albumList: function () {                                             // 151
    if (Session.get("singer")) {                                       // 152
      searchArtist(callMelonAddress.searchArtist, Session.get('singer'));
    };                                                                 //
    return Session.get('fullAlbumList');                               // 155
  },                                                                   //
  Title: function () {                                                 // 157
    return Session.get('singer');                                      // 158
  }                                                                    //
});                                                                    //
                                                                       //
Template.MainAlbum.events({                                            // 162
  'click #albumInfo': function () {                                    // 163
    console.log(event.target.text);                                    // 164
  }                                                                    //
});                                                                    //
                                                                       //
function stringImgEqualse(data) {                                      // 168
  var imgData = Session.get('thumNail');                               // 169
  for (var a in babelHelpers.sanitizeForInObject(imgData)) {           // 170
    if (imgData[a].src == data) {                                      // 171
      return Session.set("choiceImg", imgData[a].Img);                 // 172
    }                                                                  //
  }                                                                    //
}                                                                      //
                                                                       //
function searchImg() {                                                 // 177
  var thumNaill = [];                                                  // 178
  var data = daumService.daumImage.channel.item;                       // 179
  //console.log(data);                                                 //
  for (var a in babelHelpers.sanitizeForInObject(data)) {              // 181
    thumNaill.push({ src: data[a].thumbnail, Img: data[a].image });    // 182
  }                                                                    //
  Session.set("thumNail", thumNaill);                                  // 184
}                                                                      //
                                                                       //
//side 메뉴 애니메이션                                                        //
function sideMenueAnimation() {                                        // 188
  if (sideMenueObject.door == "open") {                                // 189
    sideMenueObject.width -= 10;                                       // 190
    sideMenue.style.left = parseInt(sideMenue.style.left) - 10 + 'px';
    document.getElementsByClassName("MainContainer")[0].style.width = "calc(100% - " + sideMenueObject.width + "px)";
    document.getElementsByClassName("MainContainer")[0].style.marginLeft = parseInt(document.getElementsByClassName("MainContainer")[0].style.marginLeft) - 10 + 'px';
    if (parseInt(sideMenue.style.left) != -170) {                      // 194
      requestAnimationFrame(sideMenueAnimation);                       // 195
    } else {                                                           //
      sideMenueObject.door = "close";                                  // 197
    }                                                                  //
  } else if (sideMenueObject.door == "close") {                        //
    sideMenueObject.width += 10;                                       // 200
    sideMenue.style.left = parseInt(sideMenue.style.left) + 10 + 'px';
    document.getElementsByClassName("MainContainer")[0].style.width = "calc(100% - " + sideMenueObject.width + "px)";
    document.getElementsByClassName("MainContainer")[0].style.marginLeft = parseInt(document.getElementsByClassName("MainContainer")[0].style.marginLeft) + 10 + 'px';
    if (parseInt(sideMenue.style.left) != 0) {                         // 204
      requestAnimationFrame(sideMenueAnimation);                       // 205
    } else {                                                           //
      sideMenueObject.door = "open";                                   // 207
    }                                                                  //
  }                                                                    //
};                                                                     //
                                                                       //
//profile dropdown 애니메이션                                               //
function profileDropdownAnimation() {                                  // 213
  profileDropdown.style.left = parseInt(profileDropdown.style.left) - 1 + 'px';
                                                                       //
  if (parseInt(profileDropdown.style.left) >= 25) {                    // 216
    requestAnimationFrame(profileDropdownAnimation);                   // 217
  }                                                                    //
};                                                                     //
                                                                       //
/*멜론 차트 호출 함수*/                                                        //
function MelonCall(Adress, call) {                                     // 222
  PlanetX.api("get", Adress, "JSON", { "version": 1 }, function (data) {
    call(data);                                                        // 223
  });                                                                  //
};                                                                     //
                                                                       //
function searchArtist(Address, singer) {                               // 226
  var url = Address + singer;                                          // 227
  PlanetX.api("get", url, "JSON", { 'version': 1 }, function (data) {  // 228
    Session.set('singerId', data.melon.artists.artist[0].artistId);    // 229
    var singerName = data.melon.artists.artist[0].artistName;          // 230
    choiceSinger.albumList = [];                                       // 231
    searchAlbum(singerName);                                           // 232
  });                                                                  //
};                                                                     //
                                                                       //
function searchAlbum(singerName) {                                     // 236
  var pageCount = 1;                                                   // 237
  Session.setDefault('totalPage');                                     // 238
  Session.set('albumList');                                            // 239
  callAlbum(pageCount, singerName);                                    // 240
};                                                                     //
                                                                       //
function callAlbum(pageCount, singerName) {                            // 243
  var url = "http://apis.skplanetx.com/melon/albums?version=1&page=" + pageCount + "&count=50&searchKeyword=" + singerName;
  PlanetX.api("get", url, "JSON", { 'version': 1 }, function (data) {  // 245
    Session.set('totalPage', data.melon.totalPages);                   // 246
    if (pageCount > Session.get('totalPage')) {                        // 247
      Session.set('albumList', choiceSinger.albumList);                // 248
                                                                       //
      makeAlbum();                                                     // 250
      return;                                                          // 251
    }                                                                  //
    choiceSinger.albumList.push(data);                                 // 253
    callAlbum(pageCount + 1, singerName);                              // 254
  });                                                                  //
}                                                                      //
                                                                       //
function makeAlbum() {                                                 // 258
  var data = Session.get('albumList');                                 // 259
  var fullAlbumList = [];                                              // 260
  var count = 1;                                                       // 261
  for (var a in babelHelpers.sanitizeForInObject(data)) {              // 262
    var melon = data[a].melon.albums.album;                            // 263
    for (var b in babelHelpers.sanitizeForInObject(melon)) {           // 264
      if (melon[b].artists.artist[0].artistId == Session.get('singerId')) {
        melon[b].count = count;                                        // 266
        melon[b].img = callMelonAddress.albumImgFilter(melon[b].albumId);
        fullAlbumList.push(melon[b]);                                  // 268
        ++count;                                                       // 269
      }                                                                //
    }                                                                  //
  }                                                                    //
  Session.set('fullAlbumList', fullAlbumList);                         // 273
  activityGraph(fullAlbumList);                                        // 274
};                                                                     //
                                                                       //
function activityGraph(likeAlbums) {                                   // 277
  // console.log(likeAlbums);                                          //
  var pilmograpy = [];                                                 // 279
  var count = [];                                                      // 280
  var judge = 0;                                                       // 281
  for (var i in babelHelpers.sanitizeForInObject(likeAlbums)) {        // 282
    if (pilmograpy == false) {                                         // 283
      pilmograpy.push({ year: likeAlbums[i].issueDate.substring(0, 4), count: 1 });
    } else {                                                           //
      for (var a in babelHelpers.sanitizeForInObject(pilmograpy)) {    // 286
        if (pilmograpy[a].year == likeAlbums[i].issueDate.substring(0, 4)) {
          ++judge;                                                     // 288
          pilmograpy[a].count += judge;                                // 289
        }                                                              //
      }                                                                //
      if (judge == 0) {                                                // 292
        pilmograpy.push({ year: likeAlbums[i].issueDate.substring(0, 4), count: 1 });
      }                                                                //
      judge = 0;                                                       // 295
    }                                                                  //
  }                                                                    //
                                                                       //
  pilmograpy.sort(function (a, b) {                                    // 299
    return a.year < b.year ? -1 : a.year > b.year ? 1 : 0;             // 300
  });                                                                  //
                                                                       //
  for (var a = 2005; a <= 2016; a++) {                                 // 303
    for (var i in babelHelpers.sanitizeForInObject(pilmograpy)) {      // 304
      if (pilmograpy[i].year == a) {                                   // 305
        ++judge;                                                       // 306
        count.push(pilmograpy[i].count);                               // 307
      }                                                                //
    }                                                                  //
    if (judge == 0) {                                                  // 310
      count.push(0);                                                   // 311
    }                                                                  //
    judge = 0;                                                         // 313
  }                                                                    //
  console.log(count);                                                  // 315
  Session.set('albumGraph', count);                                    // 316
}                                                                      //
/////////////////////////////////////////////////////////////////////////

}).call(this);
