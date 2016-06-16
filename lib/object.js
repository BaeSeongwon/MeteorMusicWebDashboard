/**
 * Created by Life_Sucks on 2016-05-06.
 */
/*HTML 엘리먼트들의 상태를 나타내는 객체들 파일*/
sideMenueObject = {
    door : "open",
    width : 250,
    Navigation : [
        {
            title : "Main",
            icon : "glyphicon glyphicon-home",
            link : "/"
        },
        {
            title : "Favorite",
            icon : "glyphicon glyphicon-thumbs-up",
            link : "/favorite"
        },
        {
            title : "User",
            icon : "glyphicon glyphicon-user"
        }
    ]
};

profileObject = {
    dropdown : "invisible"
};

MelonMusic = {
    MelonChartArray : []
};

callMelonAddress = {
    today : "http://apis.skplanetx.com/melon/charts/todaytopsongs?version=1&page=0&count=100",
    albumMusic : "http://apis.skplanetx.com/melon/charts/topalbums?version=1&page=0&count=100",
    newMusic : "http://apis.skplanetx.com/melon/newreleases/albums?version=1&page=0&count=100",
    realTimeMusic : "http://apis.skplanetx.com/melon/charts/realtime?version=1&page=0&count=100",
    searchArtist : "http://apis.skplanetx.com/melon/artists?version=1&page=1&count=50&searchKeyword=",
    realTimeTodayMusicChart : function(data){
        MelonMusic.MelonChartArray = [];
        var melon = data.melon.songs.song;
        melon.map(function(obj){
            MelonMusic.MelonChartArray.push({
                songName : obj.songName,
                albumName : obj.albumName,
                artistName : obj.artists.artist[0].artistName,
                albumImg : callMelonAddress.albumImgFilter(obj.albumId),
                count : obj.currentRank,
                favoriteScore : callMelonAddress.favoriteScoreMethod(obj)
            });
        });
        Session.set("MelonChart",MelonMusic.MelonChartArray);
    },
    albumMusicChart : function(data){
        MelonMusic.MelonChartArray = [];
        var melon = data.melon.albums.album;
        var count = 1;
        melon.map(function(obj){
            MelonMusic.MelonChartArray.push({
                songName : obj.repSongName,
                albumName : obj.albumName,
                artistName : obj.artists.artist[0].artistName,
                albumImg : callMelonAddress.albumImgFilter(obj.albumId),
                count : count,
                favoriteScore : callMelonAddress.favoriteScoreMethod(obj)
            });
            count++;
        });
        Session.set("MelonChart",MelonMusic.MelonChartArray);
    },
    newMusicChart : function(data){
        MelonMusic.MelonChartArray = [];
        var melon = data.melon.albums.album;
        var count = 1;
        melon.map(function(obj){
            MelonMusic.MelonChartArray.push({
                songName : obj.repSongName,
                albumName : obj.albumName,
                artistName : obj.repArtists.artist[0].artistName,
                albumImg : callMelonAddress.albumImgFilter(obj.albumId),
                count : count,
                favoriteScore : obj.averageScore
            });
            count++;
        });
        Session.set("MelonChart",MelonMusic.MelonChartArray);
    },
    albumImgFilter : function(albumId){
        var strId = albumId.toString();
        var firstNum = strId.substr(0,2);
        var secondNum = strId.substr(2,2);
        var finalNum = strId.substr(4,3);
        var imgSrc = "http://cdnimg.melon.co.kr/cm/album/images/0" + firstNum + "/" + secondNum + "/" + finalNum + "/" + strId + "_ths.jpg";
        return imgSrc;
    },
    favoriteScoreMethod : function(data){
        // var date = data.issueDate.substring(0,4) + "년 ";
        // console.log(data.issueDate.substring(0,4));
        //var date = obj.issueDate.substring(0,4) + "년 " + obj.issueDate.substring(5,2) + "월 " + obj.issueDate.substring(8,2) + "일";
        return data.issueDate;
    }
};

daumService = {
    daumImage : [],
    daumApiKey : "8dbebd311d512d5defce660c929bb984",
    urlMake : function(searchData,apiKey){
        var url = "https://apis.daum.net/search/image?apikey=" + apiKey + "&q=" + searchData + "&output=json&result=20";
        return url;
    },
    daumAjax : function(url){
        $.ajax({
            url : url,
            dataType : "jsonp",
            async: false,
            success : function(data){
                daumService.daumImage = data;
            }
        });
    },

};

_promise = function (param){
    return new Promise(function(resolve,reject){
        window.setTimeout(function(){
            if(param){
                resolve(daumService.daumImage);
            }else{
                reject(Error("실패"));
            }
        },2000);
    });
};

choiceSinger = {
    albumList : []
};
