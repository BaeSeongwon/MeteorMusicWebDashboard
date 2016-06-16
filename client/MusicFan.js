Session.setDefault("sideMenue","glyphicon glyphicon-chevron-left");
Session.setDefault("sideHeight",window.outerHeight - 70);
Session.setDefault("MelonChartTitle","실시간");
Session.setDefault('choiceImg');
Session.setDefault('singer');
Session.setDefault('albumList');

//멜론 API 인증
Meteor.startup(function(){
  PlanetX.init({
    appkey : '851b0a60-1a2a-3b84-afb6-f60d9b6bb60e',
    client_id : "8cd1a504-afc1-3e13-a8f2-9201e35637f6",
    scope : "melon",
    savingToken : true
  });

  MelonCall(callMelonAddress.realTimeMusic,callMelonAddress.realTimeTodayMusicChart);
  Session.set("MelonChartTitle","실시간");
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

Template.TopHeader.events({
  'keyup #searchInput': function (event) {
    if (event.which === 13) {
      Session.set("singer",$("#searchInput").val());
      Session.set("thumNail", "");
      var url = daumService.urlMake($("#searchInput").val(), daumService.daumApiKey);
      daumService.daumAjax(url);

      //수정 해야됨
      _promise(daumService.daumImage).then(function(data){
        searchImg(data);
      }, function(error){
        console.log(error);
      });

      $(".popupBackground").fadeIn();
      $(".imagePopup").fadeIn();
    }
  }
});

Template.MainBoard.helpers({
  title : function(){
    return Session.get("singer");
  },
  Img : function(){
    //console.log(Session.get("thumNail"));
    return Session.get("thumNail");
  }
});

Template.MainBoard.events({
  'click #delPopup' : function() {
    $(".popupBackground").fadeOut();
    $(".imagePopup").fadeOut();
  },
  'click .imgBox' : function(){
    $(".popupBackground").fadeOut();
    $(".imagePopup").fadeOut();
    stringImgEqualse($(event.target)[0].currentSrc);
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
    $('#musicContainer').animate({scrollTop: 0}, 500);
  }
});

Template.MainPicture.helpers({
  src : function(){
    return Session.get('choiceImg');
  }
});

Template.MainAlbum.helpers({
  albumList : function(){
    if(Session.get("singer")){
      searchArtist(callMelonAddress.searchArtist, Session.get('singer'));
    };
    return Session.get('fullAlbumList');
  },
  Title : function(){
    return Session.get('singer');
  }
});

Template.MainAlbum.events({
  'click #albumInfo' : function(){
    console.log(event.target.text);
  }
});

function stringImgEqualse(data){
  var imgData = Session.get('thumNail');
  for(var a in imgData){
    if(imgData[a].src == data){
      return Session.set("choiceImg",imgData[a].Img);
    }
  }
}

function searchImg(){
  var thumNaill = [];
  var data = daumService.daumImage.channel.item;
  //console.log(data);
  for(var a in data){
    thumNaill.push({src : data[a].thumbnail, Img : data[a].image});
  }
  Session.set("thumNail",thumNaill);
}

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

function searchArtist(Address,singer){
  var url = Address + singer;
  PlanetX.api("get",url,"JSON",{'version' : 1}, function(data){
    Session.set('singerId',data.melon.artists.artist[0].artistId);
    var singerName = data.melon.artists.artist[0].artistName;
    choiceSinger.albumList = [];
    searchAlbum(singerName);
  });
};

function searchAlbum(singerName){
  var pageCount = 1;
  Session.setDefault('totalPage');
  Session.set('albumList');
  callAlbum(pageCount,singerName);
};

function callAlbum(pageCount,singerName){
  var url = "http://apis.skplanetx.com/melon/albums?version=1&page=" + pageCount + "&count=50&searchKeyword=" + singerName;
  PlanetX.api("get",url,"JSON",{'version':1},function(data){
    Session.set('totalPage',data.melon.totalPages);
    if(pageCount > Session.get('totalPage')){
      Session.set('albumList',choiceSinger.albumList);

      makeAlbum();
      return;
    }
    choiceSinger.albumList.push(data);
    callAlbum(pageCount+1,singerName);
  });
}

function makeAlbum(){
  var data = Session.get('albumList');
  var fullAlbumList = [];
  var count = 1;
  for(var a in data) {
    var melon = data[a].melon.albums.album;
    for (var b in melon) {
      if(melon[b].artists.artist[0].artistId == Session.get('singerId')){
        melon[b].count = count;
        melon[b].img = callMelonAddress.albumImgFilter(melon[b].albumId);
        fullAlbumList.push(melon[b]);
        ++count;
      }
    }
  }
  Session.set('fullAlbumList',fullAlbumList);
  activityGraph(fullAlbumList);
};

function activityGraph(likeAlbums) {
  // console.log(likeAlbums);
  var pilmograpy = [];
  var count = [];
  var judge = 0;
  for (var i in likeAlbums) {
    if (pilmograpy == false) {
      pilmograpy.push({year: likeAlbums[i].issueDate.substring(0, 4), count: 1});
    } else {
      for (var a in pilmograpy) {
        if (pilmograpy[a].year == likeAlbums[i].issueDate.substring(0, 4)) {
          ++judge;
          pilmograpy[a].count += judge;
        }
      }
      if (judge == 0) {
        pilmograpy.push({year: likeAlbums[i].issueDate.substring(0, 4), count: 1});
      }
      judge = 0;
    }
  }

  pilmograpy.sort(function (a, b) {
    return a.year < b.year ? -1 : a.year > b.year ? 1 : 0;
  });

  for (var a = 2005; a <= 2016; a++) {
    for (var i in pilmograpy) {
      if (pilmograpy[i].year == a) {
        ++judge;
        count.push(pilmograpy[i].count);
      }
    }
    if (judge == 0) {
      count.push(0);
    }
    judge = 0;
  }
  console.log(count);
  Session.set('albumGraph',count);
}