var alive = [0, 1, 2, 3, 4];

$(function(){
  $("#control-ring li").bind("click", getSmallRed);
  $("#button").bind("mouseleave", reset);
  $("#info-bar").bind("click", count);
});

function getSmallRed() {
  if($("#control-ring span:eq("+$(this).index().toString()+")").text() == "..." || $(this).css("background-color") != "rgb(56, 63, 159)")
    return;  //Thought it is still blue, it is killed in fact.
  $("#control-ring li").removeClass("untouch").addClass("touch");  //kill all
  $(this).removeClass("touch").addClass("untouch");
  var obj = $("#control-ring span:eq("+$(this).index().toString()+")");
  obj.text("...").removeClass("hide").addClass("show");
  (function(current){
      $.get("/", function(result){
      obj.text(result);
      current.removeClass("untouch").addClass("touch");
      alive.splice(alive.indexOf(current.index()), 1);  //kill one
      for(var i = 0; i < alive.length; i++) {
        $("#control-ring li:eq("+alive[i].toString()+")").removeClass("touch").addClass("untouch"); //save part
      }
    });
  })($(this));  
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

