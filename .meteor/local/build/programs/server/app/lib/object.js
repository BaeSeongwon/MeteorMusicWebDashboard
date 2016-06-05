(function(){

/////////////////////////////////////////////////////////////////////////
//                                                                     //
// lib/object.js                                                       //
//                                                                     //
/////////////////////////////////////////////////////////////////////////
                                                                       //
/**                                                                    //
 * Created by Life_Sucks on 2016-05-06.                                //
 */                                                                    //
/*HTML 엘리먼트들의 상태를 나타내는 객체들 파일*/                                        //
sideMenueObject = {                                                    // 5
    door: "open",                                                      // 6
    width: 250,                                                        // 7
    Navigation: [{                                                     // 8
        title: "Main",                                                 // 10
        icon: "glyphicon glyphicon-home",                              // 11
        link: "/"                                                      // 12
    }, {                                                               //
        title: "Favorite",                                             // 15
        icon: "glyphicon glyphicon-thumbs-up",                         // 16
        link: "/favorite"                                              // 17
    }, {                                                               //
        title: "User",                                                 // 20
        icon: "glyphicon glyphicon-user"                               // 21
    }]                                                                 //
};                                                                     //
                                                                       //
profileObject = {                                                      // 26
    dropdown: "invisible"                                              // 27
};                                                                     //
                                                                       //
MelonMusic = {                                                         // 30
    MelonChartArray: []                                                // 31
};                                                                     //
                                                                       //
callMelonAddress = {                                                   // 34
    today: "http://apis.skplanetx.com/melon/charts/todaytopsongs?version=1&page=0&count=100",
    albumMusic: "http://apis.skplanetx.com/melon/charts/topalbums?version=1&page=0&count=100",
    newMusic: "http://apis.skplanetx.com/melon/newreleases/albums?version=1&page=0&count=100",
    realTimeMusic: "http://apis.skplanetx.com/melon/charts/realtime?version=1&page=0&count=100",
    realTimeMusicChart: function (data) {                              // 39
        var melon = data.melon.songs.song;                             // 40
        melon.map(function (obj) {                                     // 41
            MelonMusic.MelonChartArray.push({                          // 42
                songName: obj.songName,                                // 43
                albumName: obj.albumName,                              // 44
                artistName: obj.artists.artist[0].artistName,          // 45
                albumImg: callMelonAddress.albumImgFilter(obj.albumId),
                count: obj.currentRank                                 // 47
            });                                                        //
        });                                                            //
        Session.set("MelonChart", MelonMusic.MelonChartArray);         // 50
    },                                                                 //
    albumMusicChart: function (data) {                                 // 52
        console.log(data);                                             // 53
    },                                                                 //
    todayChart: function (data) {},                                    // 55
    newMusicChart: function (data) {},                                 // 58
    albumImgFilter: function (albumId) {                               // 61
        var strId = albumId.toString();                                // 62
        var firstNum = strId.substr(0, 2);                             // 63
        var secondNum = strId.substr(2, 2);                            // 64
        var finalNum = strId.substr(4, 3);                             // 65
        var imgSrc = "http://cdnimg.melon.co.kr/cm/album/images/0" + firstNum + "/" + secondNum + "/" + finalNum + "/" + strId + "_ths.jpg";
        return imgSrc;                                                 // 67
    }                                                                  //
};                                                                     //
/////////////////////////////////////////////////////////////////////////

}).call(this);

//# sourceMappingURL=object.js.map
