/**
 * Created by Life_Sucks on 2016-05-12.
 */
Router.configure({
    layoutTemplate : "Home"
});

Router.route('/',
    {
        layoutTemplate: "Home",
        name: "MainBoard",
        template: "MainBoard"
    }
);

Router.route('/favorite',
    {
        layoutTemplate: "Home",
        name: "FavoriteBoard",
        template: "FavoriteBoard"
    }
);
