var alive = [0, 1, 2, 3, 4];
var req_queue = []
$(function(){
  $("#control-ring li").bind("click", touch);
  $("#button").bind("mouseleave", reset);
  $("#info-bar").bind("click", count);
});

function touch() {
  if($("#control-ring span:eq("+$(this).index().toString()+")").text() == "..." || $(this).css("background-color") != "rgb(56, 63, 159)")
    return;  //Thought it is still blue, it is killed in fact.
  $("#control-ring li").removeClass("untouch").addClass("touch");  //kill all
  $(this).removeClass("touch").addClass("untouch");
  var obj = $("#control-ring span:eq("+$(this).index().toString()+")");
  obj.text("...").removeClass("hide").addClass("show");
  (function(current){
      req_queue.push(
        $.get("/", function(result){
          obj.text(result);
          current.removeClass("untouch").addClass("touch");
          alive.splice(alive.indexOf(current.index()), 1);  //kill one
          for(var i = 0; i < alive.length; i++) {
            $("#control-ring li:eq("+alive[i].toString()+")").removeClass("touch").addClass("untouch"); //save part
          }
          if(alive.length == 0)
            $(".info").removeClass("touch").addClass("untouch");
        })
      );
  })($(this));  
}

function count() {
  if(alive.length == 0) {
    var result = 0;
    for(var i = 0; i < 5; i++)
      result += parseInt($("#control-ring span:eq("+i.toString()+")").text());
    $("#info-bar span").text(result.toString()).removeClass("hide").addClass("show");;
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
}

