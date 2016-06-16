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
    searchArtist: "http://apis.skplanetx.com/melon/artists?version=1&page=1&count=50&searchKeyword=",
    realTimeTodayMusicChart: function (data) {                         // 40
        MelonMusic.MelonChartArray = [];                               // 41
        var melon = data.melon.songs.song;                             // 42
        melon.map(function (obj) {                                     // 43
            MelonMusic.MelonChartArray.push({                          // 44
                songName: obj.songName,                                // 45
                albumName: obj.albumName,                              // 46
                artistName: obj.artists.artist[0].artistName,          // 47
                albumImg: callMelonAddress.albumImgFilter(obj.albumId),
                count: obj.currentRank,                                // 49
                favoriteScore: callMelonAddress.favoriteScoreMethod(obj)
            });                                                        //
        });                                                            //
        Session.set("MelonChart", MelonMusic.MelonChartArray);         // 53
    },                                                                 //
    albumMusicChart: function (data) {                                 // 55
        MelonMusic.MelonChartArray = [];                               // 56
        var melon = data.melon.albums.album;                           // 57
        var count = 1;                                                 // 58
        melon.map(function (obj) {                                     // 59
            MelonMusic.MelonChartArray.push({                          // 60
                songName: obj.repSongName,                             // 61
                albumName: obj.albumName,                              // 62
                artistName: obj.artists.artist[0].artistName,          // 63
                albumImg: callMelonAddress.albumImgFilter(obj.albumId),
                count: count,                                          // 65
                favoriteScore: callMelonAddress.favoriteScoreMethod(obj)
            });                                                        //
            count++;                                                   // 68
        });                                                            //
        Session.set("MelonChart", MelonMusic.MelonChartArray);         // 70
    },                                                                 //
    newMusicChart: function (data) {                                   // 72
        MelonMusic.MelonChartArray = [];                               // 73
        var melon = data.melon.albums.album;                           // 74
        var count = 1;                                                 // 75
        melon.map(function (obj) {                                     // 76
            MelonMusic.MelonChartArray.push({                          // 77
                songName: obj.repSongName,                             // 78
                albumName: obj.albumName,                              // 79
                artistName: obj.repArtists.artist[0].artistName,       // 80
                albumImg: callMelonAddress.albumImgFilter(obj.albumId),
                count: count,                                          // 82
                favoriteScore: obj.averageScore                        // 83
            });                                                        //
            count++;                                                   // 85
        });                                                            //
        Session.set("MelonChart", MelonMusic.MelonChartArray);         // 87
    },                                                                 //
    albumImgFilter: function (albumId) {                               // 89
        var strId = albumId.toString();                                // 90
        var firstNum = strId.substr(0, 2);                             // 91
        var secondNum = strId.substr(2, 2);                            // 92
        var finalNum = strId.substr(4, 3);                             // 93
        var imgSrc = "http://cdnimg.melon.co.kr/cm/album/images/0" + firstNum + "/" + secondNum + "/" + finalNum + "/" + strId + "_ths.jpg";
        return imgSrc;                                                 // 95
    },                                                                 //
    favoriteScoreMethod: function (data) {                             // 97
        // var date = data.issueDate.substring(0,4) + "년 ";            //
        // console.log(data.issueDate.substring(0,4));                 //
        //var date = obj.issueDate.substring(0,4) + "년 " + obj.issueDate.substring(5,2) + "월 " + obj.issueDate.substring(8,2) + "일";
        return data.issueDate;                                         // 101
    }                                                                  //
};                                                                     //
                                                                       //
daumService = {                                                        // 105
    daumImage: [],                                                     // 106
    daumApiKey: "8dbebd311d512d5defce660c929bb984",                    // 107
    urlMake: function (searchData, apiKey) {                           // 108
        var url = "https://apis.daum.net/search/image?apikey=" + apiKey + "&q=" + searchData + "&output=json&result=20";
        return url;                                                    // 110
    },                                                                 //
    daumAjax: function (url) {                                         // 112
        $.ajax({                                                       // 113
            url: url,                                                  // 114
            dataType: "jsonp",                                         // 115
            async: false,                                              // 116
            success: function (data) {                                 // 117
                daumService.daumImage = data;                          // 118
            }                                                          //
        });                                                            //
    }                                                                  //
                                                                       //
};                                                                     //
                                                                       //
_promise = function (param) {                                          // 125
    return new Promise(function (resolve, reject) {                    // 126
        window.setTimeout(function () {                                // 127
            if (param) {                                               // 128
                resolve(daumService.daumImage);                        // 129
            } else {                                                   //
                reject(Error("실패"));                                   // 131
            }                                                          //
        }, 2000);                                                      //
    });                                                                //
};                                                                     //
                                                                       //
choiceSinger = {                                                       // 137
    albumList: []                                                      // 138
};                                                                     //
/////////////////////////////////////////////////////////////////////////

}).call(this);

//# sourceMappingURL=object.js.map
