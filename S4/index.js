var alive = [0, 1, 2, 3, 4];
var req_queue = [];
var order = [];
begin = false;
$(function(){
  $(".apb").bind("click", robot);
  $(".apb").bind("mouseleave", reset);  
});
function robot() {
  if(!begin) {
    begin = true;
    order = [];
    $(".apb").removeClass("apb_untouch").addClass("apb_touch");
    var letter = "";
    while(order.length != 5) {
      var tmp = Math.round(Math.random() * 4);
      if(order.indexOf(tmp) == -1) {
        order.push(tmp);
        letter += String.fromCharCode('A'.charCodeAt()+tmp)+" ";
      }
    }
    $("#order").text(letter).removeClass("hide").addClass("show");
    handler(0, check);
  }
}

function handler(times, callback) {
  touch(order[times], function(index, obj, myself){
    getRandomNumber(obj, myself, function() {
      callback(times);
    });
  });
}

function touch(index, callback) {
  if(begin) {
    var myself = $("#control-ring li:eq("+index.toString()+")");
    if($("#control-ring span:eq("+index.toString()+")").text() == "..." || myself[0].className != "untouch")  //rgb late?
      return;  //Thought it is still blue, it is killed in fact.
    $("#control-ring li").removeClass("untouch").addClass("touch");  //kill all
    myself.removeClass("touch").addClass("untouch");
    var obj = $("#control-ring span:eq("+myself.index().toString()+")");
    obj.text("...").removeClass("hide").addClass("show");
    callback(index, obj, myself);   
  }
}

function getRandomNumber(obj, myself, callback) {
  if(begin) {
    $.get("/", function(result){
      if(obj.text() == "...") {
        obj.text(result);
        myself.removeClass("untouch").addClass("touch");
        alive.splice(alive.indexOf(myself.index()), 1);  //kill one
        for(var i = 0; i < alive.length; i++) {
          $("#control-ring li:eq("+alive[i].toString()+")").removeClass("touch").addClass("untouch"); //save part
        }
        if(alive.length == 0)
          $(".info").removeClass("touch").addClass("untouch");
        setTimeout(callback, 1000);
      }
    });
  }
}

function check(times) {
  if(times != 4)
    handler(times+1, check);
  else
    setTimeout(count, 1000);  
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
  $(".info").removeClass("untouch").addClass("touch");
  $("#control-ring span").text("");
  alive = [0, 1, 2, 3, 4];
  for(x in req_queue)
    req_queue[x].abort();
  req_queue = [];
  begin = false;
  $("#order").removeClass("show").addClass("hide");
  $(".apb").removeClass("apb_touch").addClass("apb_untouch");
}