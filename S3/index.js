var alive = [0, 1, 2, 3, 4];
var req_queue = [];
var begin = false;
$(function(){
  $(".apb").bind("click", robot);
  $(".apb").bind("mouseleave", reset);  
});
function robot() {
  if(!begin) {
    begin = true;
    $(".apb").removeClass("apb_untouch").addClass("apb_touch");
    for(var i = 0; i < 5; i++) {
      getSmallRed(i);
      var myself = $("#control-ring li:eq("+i.toString()+")");
      var obj = $("#control-ring span:eq("+myself.index().toString()+")");
      getRandomNumber(obj, myself, i);
    } 
  } 
}

function getSmallRed(index) {
  var myself = $("#control-ring li:eq("+index.toString()+")");
  myself.removeClass("touch").addClass("untouch");
  var obj = $("#control-ring span:eq("+myself.index().toString()+")");
  obj.text("...").removeClass("hide").addClass("show");  
}

function getRandomNumber(obj, myself, times) {
  req_queue.push(
    $.get("/"+times, function(result){
      obj.text(result);
      myself.removeClass("untouch").addClass("touch");
      alive.splice(alive.indexOf(myself.index()), 1);  //kill one
      if(alive.length == 0) {
        $(".info").removeClass("touch").addClass("untouch");
        setTimeout(count, 1000);
      }
    })
  );
}

function count() {
  if(alive.length == 0) {
    var result = 0;
    for(var i = 0; i < 5; i++)
      result += parseInt($("#control-ring span:eq("+i.toString()+")").text());
    $("#info-bar span").text(result.toString()).removeClass("hide").addClass("show");
    $(".info").removeClass("untouch").addClass("touch");
  }
}

function reset() {
  $("#info-bar span").removeClass("show").addClass("hide");
  $("#control-ring span").removeClass("show").addClass("hide");
  $("#control-ring li").removeClass("touch").addClass("untouch"); //save all
  alive = [0, 1, 2, 3, 4];
  for(x in req_queue)
    req_queue[x].abort();
  req_queue = []; 
  begin = false; 
  $(".apb").removeClass("apb_touch").addClass("apb_untouch");
}