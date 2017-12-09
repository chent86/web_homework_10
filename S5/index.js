var alive = [0, 1, 2, 3, 4];
begin = false;
$(function(){
  $(".apb").bind("click", robot);
  $(".apb").bind("mouseleave", reset);  
});
function robot() {
  if(!begin) {
    begin = true;
    var order = [];
    var handler = [];
    $(".apb").removeClass("apb_untouch").addClass("apb_touch");
    var letter = "";
    var name_set = {
      0:aHandler,
      1:bHandler,
      2:cHandler,
      3:dHandler,
      4:eHandler,
      5:bubbleHandler
    };
    while(order.length != 5) {
      var tmp = Math.round(Math.random() * 4);
      if(order.indexOf(tmp) == -1) {
        order.push(tmp);
        letter += String.fromCharCode('A'.charCodeAt()+tmp)+" ";    //get random sequence
        handler.push(name_set[tmp]);
      }
    }
    handler.push(name_set[5]);
    $("#order").text(letter).removeClass("hide").addClass("show");
    handler[0](0, 1, handler, handler[1]);                          //start
  }
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
    callback(obj, myself);   
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
        // setTimeout(callback, 1000);
        callback(parseInt(result));
      }
    });
  }
}

function aHandler(current, index, array, callback) {
  touch(0, function(obj, myself) {
    getRandomNumber(obj, myself, function(get) {
      current += get;
      if(index == 5)
        callback(current);
      else
        callback(current, index+1, array, array[index+1])
    });
  });
}

function bHandler(current, index, array, callback) {
  touch(1, function(obj, myself) {
    getRandomNumber(obj, myself, function(get) {
      current += get;
      if(index == 5)
        callback(current);
      else
        callback(current, index+1, array, array[index+1])
    });
  });
}

function cHandler(current, index, array, callback) {
  touch(2, function(obj, myself) {
    getRandomNumber(obj, myself, function(get) {
      current += get;
      if(index == 5)
        callback(current);
      else
        callback(current, index+1, array, array[index+1])
    });
  });
}

function dHandler(current, index, array, callback) {
  touch(3, function(obj, myself) {
    getRandomNumber(obj, myself, function(get) {
      current += get;
      if(index == 5)
        callback(current);
      else
        callback(current, index+1, array, array[index+1])
    });
  });
}

function eHandler(current, index, array, callback) {
  touch(4, function(obj, myself) {
    getRandomNumber(obj, myself, function(get) {
      current += get;
      if(index == 5) {
        callback(current);
      }
      else
        callback(current, index+1, array, array[index+1])
    });
  });
}

function bubbleHandler(result) {
  $(".info").removeClass("touch").addClass("untouch");
  setTimeout(function() {
    $("#info-bar span").text(result.toString()).removeClass("hide").addClass("show");
    $(".info").removeClass("untouch").addClass("touch");
  }, 1000);
}

function reset() {
  $("#info-bar span").removeClass("show").addClass("hide");
  $("#control-ring span").removeClass("show").addClass("hide");
  $("#control-ring li").removeClass("touch").addClass("untouch"); //save all
  $(".info").removeClass("untouch").addClass("touch");
  $("#control-ring span").text("");
  alive = [0, 1, 2, 3, 4];
  begin = false;
  $("#order").removeClass("show").addClass("hide");
  $(".apb").removeClass("apb_touch").addClass("apb_untouch");
}