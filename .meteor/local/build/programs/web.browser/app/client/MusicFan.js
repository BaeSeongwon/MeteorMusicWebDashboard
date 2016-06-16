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
    appkey: '851b0a60-1a2a-3b84-afb6-f60d9b6bb60e',                    // 11
    client_id: "8cd1a504-afc1-3e13-a8f2-9201e35637f6",                 // 12
    scope: "melon",                                                    // 13
    savingToken: true                                                  // 14
  });                                                                  //
                                                                       //
  MelonCall(callMelonAddress.realTimeMusic, callMelonAddress.realTimeTodayMusicChart);
  Session.set("MelonChartTitle", "실시간");                               // 18
});                                                                    //
                                                                       //
Template.SideMenue.helpers({                                           // 21
  display: function () {                                               // 22
    return Session.get("sideMenue");                                   // 22
  },                                                                   //
  Navigation: sideMenueObject.Navigation,                              // 23
  sideHeight: function () {                                            // 24
    return Session.get("sideHeight");                                  // 24
  }                                                                    //
});                                                                    //
                                                                       //
Template.SideMenue.events({                                            // 27
  'click #sideMainimg': function () {                                  // 28
    if (sideMenueObject.door == "open") {                              // 29
      sideMenueAnimation();                                            // 30
      Session.set("sideMenue", "glyphicon glyphicon-chevron-right");   // 31
    } else {                                                           //
      sideMenueAnimation();                                            // 33
      Session.set("sideMenue", "glyphicon glyphicon-chevron-left");    // 34
    }                                                                  //
  },                                                                   //
  'click #profile': function () {                                      // 37
    if (profileObject.dropdown == "invisible") {                       // 38
      $("#profileDropdown").fadeIn();                                  // 39
      profileDropdownAnimation();                                      // 40
      profileObject.dropdown = "visible";                              // 41
    } else {                                                           //
      $("#profileDropdown").fadeOut(function () {                      // 43
        return profileDropdown.style.left = 70 + 'px';                 // 43
      });                                                              //
      profileObject.dropdown = "invisible";                            // 44
    };                                                                 //
  }                                                                    //
});                                                                    //
                                                                       //
Template.TopHeader.events({                                            // 49
  'keyup #searchInput': function (event) {                             // 50
    if (event.which === 13) {                                          // 51
      Session.set("singer", $("#searchInput").val());                  // 52
      Session.set("thumNail", "");                                     // 53
      var url = daumService.urlMake($("#searchInput").val(), daumService.daumApiKey);
      daumService.daumAjax(url);                                       // 55
                                                                       //
      //수정 해야됨                                                         //
      _promise(daumService.daumImage).then(function (data) {           // 58
        searchImg(data);                                               // 59
      }, function (error) {                                            //
        console.log(error);                                            // 61
      });                                                              //
                                                                       //
      $(".popupBackground").fadeIn();                                  // 64
      $(".imagePopup").fadeIn();                                       // 65
    }                                                                  //
  }                                                                    //
});                                                                    //
                                                                       //
Template.MainBoard.helpers({                                           // 70
  title: function () {                                                 // 71
    return Session.get("singer");                                      // 72
  },                                                                   //
  Img: function () {                                                   // 74
    //console.log(Session.get("thumNail"));                            //
    return Session.get("thumNail");                                    // 76
  }                                                                    //
});                                                                    //
                                                                       //
Template.MainBoard.events({                                            // 80
  'click #delPopup': function () {                                     // 81
    $(".popupBackground").fadeOut();                                   // 82
    $(".imagePopup").fadeOut();                                        // 83
  },                                                                   //
  'click .imgBox': function () {                                       // 85
    $(".popupBackground").fadeOut();                                   // 86
    $(".imagePopup").fadeOut();                                        // 87
    stringImgEqualse($(event.target)[0].currentSrc);                   // 88
  }                                                                    //
});                                                                    //
                                                                       //
Template.MainMusicChart.helpers({                                      // 92
  melonChartTitle: function () {                                       // 93
    return Session.get("MelonChartTitle");                             // 93
  },                                                                   //
  MelonCharts: function () {                                           // 94
    return Session.get("MelonChart");                                  // 94
  },                                                                   //
  chartType: function () {                                             // 95
    if (Session.get("MelonChartTitle") == "앨범") {                      // 96
      return true;                                                     // 97
    }                                                                  //
  },                                                                   //
  favoriteType: function () {                                          // 100
    if (Session.get("MelonChartTitle") == "최신") {                      // 101
      return true;                                                     // 102
    };                                                                 //
  }                                                                    //
});                                                                    //
                                                                       //
Template.MainMusicChart.events({                                       // 107
  'click li': function () {                                            // 108
    var target = event.target.innerText;                               // 109
    switch (target) {                                                  // 110
      case "실시간 차트":                                                   // 111
        {                                                              // 111
          MelonCall(callMelonAddress.realTimeMusic, callMelonAddress.realTimeTodayMusicChart);
          Session.set("MelonChartTitle", "실시간");                       // 113
          break;                                                       // 114
        }                                                              //
      case "일간 차트":                                                    // 115
        {                                                              // 116
          MelonCall(callMelonAddress.today, callMelonAddress.realTimeTodayMusicChart);
          Session.set("MelonChartTitle", "일간");                        // 118
          break;                                                       // 119
        }                                                              //
      case "앨범 차트":                                                    // 120
        {                                                              // 121
          MelonCall(callMelonAddress.albumMusic, callMelonAddress.albumMusicChart);
          Session.set("MelonChartTitle", "앨범");                        // 123
          break;                                                       // 124
        }                                                              //
      case "최신 음악":                                                    // 125
        {                                                              // 126
          MelonCall(callMelonAddress.newMusic, callMelonAddress.newMusicChart);
          Session.set("MelonChartTitle", "최신");                        // 128
          break;                                                       // 129
        }                                                              //
    }                                                                  // 130
  },                                                                   //
  'scroll #musicContainer': function (event) {                         // 133
    if (event.target.scrollTop > 1000) {                               // 134
      $(".pageTopButton").fadeIn();                                    // 135
    } else {                                                           //
      $('.pageTopButton').fadeOut();                                   // 137
    }                                                                  //
  },                                                                   //
  'click .pageTopButton': function () {                                // 140
    $('#musicContainer').animate({ scrollTop: 0 }, 500);               // 141
  }                                                                    //
});                                                                    //
                                                                       //
Template.MainPicture.helpers({                                         // 145
  src: function () {                                                   // 146
    return Session.get('choiceImg');                                   // 147
  }                                                                    //
});                                                                    //
                                                                       //
Template.MainAlbum.helpers({                                           // 151
  albumList: function () {                                             // 152
    if (Session.get("singer")) {                                       // 153
      searchArtist(callMelonAddress.searchArtist, Session.get('singer'));
    };                                                                 //
    return Session.get('fullAlbumList');                               // 156
  },                                                                   //
  Title: function () {                                                 // 158
    return Session.get('singer');                                      // 159
  }                                                                    //
});                                                                    //
                                                                       //
Template.MainAlbum.events({                                            // 163
  'click #albumInfo': function () {                                    // 164
    console.log(event.target.text);                                    // 165
  }                                                                    //
});                                                                    //
                                                                       //
function stringImgEqualse(data) {                                      // 169
  var imgData = Session.get('thumNail');                               // 170
  for (var a in babelHelpers.sanitizeForInObject(imgData)) {           // 171
    if (imgData[a].src == data) {                                      // 172
      return Session.set("choiceImg", imgData[a].Img);                 // 173
    }                                                                  //
  }                                                                    //
}                                                                      //
                                                                       //
function searchImg() {                                                 // 178
  var thumNaill = [];                                                  // 179
  var data = daumService.daumImage.channel.item;                       // 180
  //console.log(data);                                                 //
  for (var a in babelHelpers.sanitizeForInObject(data)) {              // 182
    thumNaill.push({ src: data[a].thumbnail, Img: data[a].image });    // 183
  }                                                                    //
  Session.set("thumNail", thumNaill);                                  // 185
}                                                                      //
                                                                       //
//side 메뉴 애니메이션                                                        //
function sideMenueAnimation() {                                        // 189
  if (sideMenueObject.door == "open") {                                // 190
    sideMenueObject.width -= 10;                                       // 191
    sideMenue.style.left = parseInt(sideMenue.style.left) - 10 + 'px';
    document.getElementsByClassName("MainContainer")[0].style.width = "calc(100% - " + sideMenueObject.width + "px)";
    document.getElementsByClassName("MainContainer")[0].style.marginLeft = parseInt(document.getElementsByClassName("MainContainer")[0].style.marginLeft) - 10 + 'px';
    if (parseInt(sideMenue.style.left) != -170) {                      // 195
      requestAnimationFrame(sideMenueAnimation);                       // 196
    } else {                                                           //
      sideMenueObject.door = "close";                                  // 198
    }                                                                  //
  } else if (sideMenueObject.door == "close") {                        //
    sideMenueObject.width += 10;                                       // 201
    sideMenue.style.left = parseInt(sideMenue.style.left) + 10 + 'px';
    document.getElementsByClassName("MainContainer")[0].style.width = "calc(100% - " + sideMenueObject.width + "px)";
    document.getElementsByClassName("MainContainer")[0].style.marginLeft = parseInt(document.getElementsByClassName("MainContainer")[0].style.marginLeft) + 10 + 'px';
    if (parseInt(sideMenue.style.left) != 0) {                         // 205
      requestAnimationFrame(sideMenueAnimation);                       // 206
    } else {                                                           //
      sideMenueObject.door = "open";                                   // 208
    }                                                                  //
  }                                                                    //
};                                                                     //
                                                                       //
//profile dropdown 애니메이션                                               //
function profileDropdownAnimation() {                                  // 214
  profileDropdown.style.left = parseInt(profileDropdown.style.left) - 1 + 'px';
                                                                       //
  if (parseInt(profileDropdown.style.left) >= 25) {                    // 217
    requestAnimationFrame(profileDropdownAnimation);                   // 218
  }                                                                    //
};                                                                     //
                                                                       //
/*멜론 차트 호출 함수*/                                                        //
function MelonCall(Adress, call) {                                     // 223
  PlanetX.api("get", Adress, "JSON", { "version": 1 }, function (data) {
    call(data);                                                        // 224
  });                                                                  //
};                                                                     //
                                                                       //
function searchArtist(Address, singer) {                               // 227
  var url = Address + singer;                                          // 228
  PlanetX.api("get", url, "JSON", { 'version': 1 }, function (data) {  // 229
    Session.set('singerId', data.melon.artists.artist[0].artistId);    // 230
    var singerName = data.melon.artists.artist[0].artistName;          // 231
    choiceSinger.albumList = [];                                       // 232
    searchAlbum(singerName);                                           // 233
  });                                                                  //
};                                                                     //
                                                                       //
function searchAlbum(singerName) {                                     // 237
  var pageCount = 1;                                                   // 238
  Session.setDefault('totalPage');                                     // 239
  Session.set('albumList');                                            // 240
  callAlbum(pageCount, singerName);                                    // 241
};                                                                     //
                                                                       //
function callAlbum(pageCount, singerName) {                            // 244
  var url = "http://apis.skplanetx.com/melon/albums?version=1&page=" + pageCount + "&count=50&searchKeyword=" + singerName;
  PlanetX.api("get", url, "JSON", { 'version': 1 }, function (data) {  // 246
    Session.set('totalPage', data.melon.totalPages);                   // 247
    if (pageCount > Session.get('totalPage')) {                        // 248
      Session.set('albumList', choiceSinger.albumList);                // 249
                                                                       //
      makeAlbum();                                                     // 251
      return;                                                          // 252
    }                                                                  //
    choiceSinger.albumList.push(data);                                 // 254
    callAlbum(pageCount + 1, singerName);                              // 255
  });                                                                  //
}                                                                      //
                                                                       //
function makeAlbum() {                                                 // 259
  var data = Session.get('albumList');                                 // 260
  var fullAlbumList = [];                                              // 261
  var count = 1;                                                       // 262
  for (var a in babelHelpers.sanitizeForInObject(data)) {              // 263
    var melon = data[a].melon.albums.album;                            // 264
    for (var b in babelHelpers.sanitizeForInObject(melon)) {           // 265
      if (melon[b].artists.artist[0].artistId == Session.get('singerId')) {
        melon[b].count = count;                                        // 267
        melon[b].img = callMelonAddress.albumImgFilter(melon[b].albumId);
        fullAlbumList.push(melon[b]);                                  // 269
        ++count;                                                       // 270
      }                                                                //
    }                                                                  //
  }                                                                    //
  Session.set('fullAlbumList', fullAlbumList);                         // 274
  activityGraph(fullAlbumList);                                        // 275
};                                                                     //
                                                                       //
function activityGraph(likeAlbums) {                                   // 278
  // console.log(likeAlbums);                                          //
  var pilmograpy = [];                                                 // 280
  var count = [];                                                      // 281
  var judge = 0;                                                       // 282
  for (var i in babelHelpers.sanitizeForInObject(likeAlbums)) {        // 283
    if (pilmograpy == false) {                                         // 284
      pilmograpy.push({ year: likeAlbums[i].issueDate.substring(0, 4), count: 1 });
    } else {                                                           //
      for (var a in babelHelpers.sanitizeForInObject(pilmograpy)) {    // 287
        if (pilmograpy[a].year == likeAlbums[i].issueDate.substring(0, 4)) {
          ++judge;                                                     // 289
          pilmograpy[a].count += judge;                                // 290
        }                                                              //
      }                                                                //
      if (judge == 0) {                                                // 293
        pilmograpy.push({ year: likeAlbums[i].issueDate.substring(0, 4), count: 1 });
      }                                                                //
      judge = 0;                                                       // 296
    }                                                                  //
  }                                                                    //
                                                                       //
  pilmograpy.sort(function (a, b) {                                    // 300
    return a.year < b.year ? -1 : a.year > b.year ? 1 : 0;             // 301
  });                                                                  //
                                                                       //
  for (var a = 2005; a <= 2016; a++) {                                 // 304
    for (var i in babelHelpers.sanitizeForInObject(pilmograpy)) {      // 305
      if (pilmograpy[i].year == a) {                                   // 306
        ++judge;                                                       // 307
        count.push(pilmograpy[i].count);                               // 308
      }                                                                //
    }                                                                  //
    if (judge == 0) {                                                  // 311
      count.push(0);                                                   // 312
    }                                                                  //
    judge = 0;                                                         // 314
  }                                                                    //
  console.log(count);                                                  // 316
  Session.set('albumGraph', count);                                    // 317
}                                                                      //
/////////////////////////////////////////////////////////////////////////

}).call(this);
