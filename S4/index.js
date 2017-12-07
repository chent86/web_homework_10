var alive = [0, 1, 2, 3, 4];
var order = [];
$(function(){
  $("#button").bind("click", robot);
  // TO DO 
  // block response
  $("#button").bind("mouseleave", reset);  
});
function robot() {
  order = [];
  var letter = "";
  while(order.length != 5) {
    var tmp = Math.round(Math.random() * 4);
    if(order.indexOf(tmp) == -1) {
      order.push(tmp);
      letter += String.fromCharCode('A'.charCodeAt()+tmp)+" ";
    }
  }
  $("#order").text(letter).removeClass("hide").addClass("show");
  part(0, f2);
}

function part(times, callback) {
  getSmallRed(order[times], function(index, obj, myself){
    f1(obj, myself, function() {
      callback(times);
    });
  });
}

function getSmallRed(index, callback) {
  var myself = $("#control-ring li:eq("+index.toString()+")");
  if($("#control-ring span:eq("+index.toString()+")").text() == "..." || myself[0].className != "untouch")  //rgb late?
    return;  //Thought it is still blue, it is killed in fact.
  $("#control-ring li").removeClass("untouch").addClass("touch");  //kill all
  myself.removeClass("touch").addClass("untouch");
  var obj = $("#control-ring span:eq("+myself.index().toString()+")");
  obj.text("...").removeClass("hide").addClass("show");
  callback(index, obj, myself);   
}

function f1(obj, myself, callback) {
  $.get("/", function(result){
    obj.text(result);
    myself.removeClass("untouch").addClass("touch");
    alive.splice(alive.indexOf(myself.index()), 1);  //kill one
    for(var i = 0; i < alive.length; i++) {
      $("#control-ring li:eq("+alive[i].toString()+")").removeClass("touch").addClass("untouch"); //save part
    }
    callback();
  });
}

function f2(times) {
  if(times != 4)
    part(times+1, f2);
  else
    count();
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
  // $("#info-bar span").removeClass("show").addClass("hide");
  // $("#control-ring span").removeClass("show").addClass("hide");
  // $("#control-ring li").removeClass("touch").addClass("untouch"); //save all
  // alive = [0, 1, 2, 3, 4];
}