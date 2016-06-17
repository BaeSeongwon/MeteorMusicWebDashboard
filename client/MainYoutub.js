Template.MainYoutube.onRendered(function(){
    this.autorun(function(){
        var subin = new Array();
        var item_list;
        var item_count;
        var item_info;
        var url = "https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=5&q=" + Session.get("singer") + "&key=AIzaSyDJVN-WCpa25Hk3d4pE0yljb70y0ktAQtg";
        onYouTubeIframeAPIReady = function () {
            // New Video Player, the first argument is the id of the div.
            // Make sure it's a global variable.
            player = new YT.Player("player",{
                height: "100%",
                width: "100%",
                videoId: subin[0],
                events: {  //4
                    'onStateChange' : onPlayerStateChange,
                    'onReady' : function (event) {
                        //console.log(subin[0]);
                    }
                }
            });
            function onPlayerStateChange(event){
                console.log(Session.get('videoStart'));
            }
        };
        $.ajax({
            type:"GET",
            url : url,
            datatype:"json",
            success:response_json
        });
        function response_json(json) {  //3
            console.log(json);
            item_list=json.items;
            item_count=item_list.length;
            for(i=0;i<item_count;i++)
            {
                item_info =item_list[i].id;
                subin[i]=item_info.videoId;
                /*console.log(subin[i]);*/
            }
            //console.log(subin[0]);
            Session.set("videoStart",subin[0]);
            console.log(Session.get('videoStart'));
            YT.load(function(){
                console.log("실행");
                document.getElementById("player").contentDocument.location.reload(true);
            });
        }
    });
});


