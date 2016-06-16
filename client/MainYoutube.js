
if (Meteor.isClient) {


    var subin = new Array();
    var item_list;
    var item_count;
    var item_info;


    onYouTubeIframeAPIReady = function () {

        console.log("5");
        // New Video Player, the first argument is the id of the div.
        // Make sure it's a global variable.
        player = new YT.Player("player",{


            height: "140",
            width: "180",
            videoId:subin[0]


            , events: {  //4

                onReady: function (event) {

                    event.target.playVideo();
                }

            }
        });

        player = new YT.Player("player2", {

            height: "140",
            width: "180",
            videoId: subin[1]
            , events: {
                onReady: function (event) {

                    event.target.playVideo();
                }
            }
        });
    };


    $.ajax({
        type:"GET",
        url:"https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=5&q=지코&key=AIzaSyDJVN-WCpa25Hk3d4pE0yljb70y0ktAQtg",
        datatype:"json",
        success:response_json

    });
    console.log("4");
    function response_json(json) {  //3
        item_list=json.items;
        item_count=item_list.length;
        console.log("3");
        for(i=0;i<item_count;i++)
        {
            item_info =item_list[i].id;

            subin[i]=item_info.videoId;
            /*console.log(subin[i]);*/

        }

        YT.load();
    }

}

