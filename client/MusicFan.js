Session.setDefault("sideMenue","glyphicon glyphicon-chevron-left");
Template.SideMenue.helpers({
  display : function() {return Session.get("sideMenue");},
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
  }
});

//side 메뉴 애니메이션
function sideMenueAnimation(){
  if(sideMenueObject.door == "open"){
    sideMenue.style.left = parseInt(sideMenue.style.left) - 10 + 'px';

    if(parseInt(sideMenue.style.left) != -170){
      requestAnimationFrame(sideMenueAnimation);

    }else{
      sideMenueObject.door = "close";

    }
  }else if(sideMenueObject.door == "close"){
    sideMenue.style.left = parseInt(sideMenue.style.left) + 10 + 'px';

    if(parseInt(sideMenue.style.left) != 0){
      requestAnimationFrame(sideMenueAnimation);

    }else{
      sideMenueObject.door = "open";

    }
  }
};
