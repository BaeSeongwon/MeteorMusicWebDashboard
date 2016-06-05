(function(){

/////////////////////////////////////////////////////////////////////////
//                                                                     //
// client/Router.js                                                    //
//                                                                     //
/////////////////////////////////////////////////////////////////////////
                                                                       //
/**                                                                    //
 * Created by Life_Sucks on 2016-05-12.                                //
 */                                                                    //
Router.configure({                                                     // 4
    layoutTemplate: "Home"                                             // 5
});                                                                    //
                                                                       //
Router.route('/', {                                                    // 8
    layoutTemplate: "Home",                                            // 10
    name: "MainBoard",                                                 // 11
    template: "MainBoard"                                              // 12
});                                                                    //
                                                                       //
Router.route('/favorite', {                                            // 16
    layoutTemplate: "Home",                                            // 18
    name: "FavoriteBoard",                                             // 19
    template: "FavoriteBoard"                                          // 20
});                                                                    //
/////////////////////////////////////////////////////////////////////////

}).call(this);
