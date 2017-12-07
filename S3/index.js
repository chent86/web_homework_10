var alive = [0, 1, 2, 3, 4];
$(function(){
  $(".apb").bind("click", robot);
  // TO DO 
  // block response
  // $("#button").bind("mouseleave", reset);  
});
function robot() {
  for(var i = 0; i < 5; i++) {
    getSmallRed(i);
    var myself = $("#control-ring li:eq("+i.toString()+")");
    var obj = $("#control-ring span:eq("+myself.index().toString()+")");
    f1(obj, myself);
  }  
}

function getSmallRed(index) {
  var myself = $("#control-ring li:eq("+index.toString()+")");
  myself.removeClass("touch").addClass("untouch");
  var obj = $("#control-ring span:eq("+myself.index().toString()+")");
  obj.text("...").removeClass("hide").addClass("show");  
}

function f1(obj, myself) {
  $.post("/", function(result){
    obj.text(result);
    myself.removeClass("untouch").addClass("touch");
    alive.splice(alive.indexOf(myself.index()), 1);  //kill one
    if(alive.length == 0)
      count();
  });
}

function count() {
  if(alive.length == 0) {
    var result = 0;
    for(var i = 0; i < 5; i++)
      result += parseInt($("#control-ring span:eq("+i.toString()+")").text());
    $("#info-bar span").text(result.toString()).removeClass("hide").addClass("show");;
  }
}

function reset() {
  $("#info-bar span").removeClass("show").addClass("hide");
  $("#control-ring span").removeClass("show").addClass("hide");
  $("#control-ring li").removeClass("touch").addClass("untouch"); //save all
  alive = [0, 1, 2, 3, 4];
}