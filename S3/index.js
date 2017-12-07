var alive = [0, 1, 2, 3, 4];
$(function(){
  // $(".apb").bind("click", robot);
  $(".apb").bind("click",function() {
    $("#control-ring li").click();
  });
  $("#control-ring li").bind("click", function() {
    (function(index) {
      if(index.length != 1)
        return;
      index = index.charCodeAt()-65;
      getSmallRed(index);
      var myself = $("#control-ring li:eq("+index.toString()+")");
      var obj = $("#control-ring span:eq("+myself.index().toString()+")");      
      $.get(index+1, function(result) {
        console.log(index);
        obj.text(result);
        myself.removeClass("untouch").addClass("touch");
        alive.splice(alive.indexOf(myself.index()), 1);  //kill one
        if(alive.length == 0)
          count();        
      });
    })($(this).text()[0])
  });
  // TO DO 
  // block response
  // $("#button").bind("mouseleave", reset);  
});

function getSmallRed(index) {
  var myself = $("#control-ring li:eq("+index.toString()+")");
  myself.removeClass("touch").addClass("untouch");
  var obj = $("#control-ring span:eq("+myself.index().toString()+")");
  obj.text("...").removeClass("hide").addClass("show");  
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