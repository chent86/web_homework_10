begin = false;
$(function(){
  $(".apb").bind("click", robot);
  $(".apb").bind("mouseleave", reset);  
});
function robot() {
  if(!begin) {
    begin = true;
    var alive = [0, 1, 2, 3, 4];
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
    handler[0](0, 1, handler, alive, handler[1]);                          //start
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

function getRandomNumber(obj, myself, alive, callback) {
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
        setTimeout(function() {
          callback(parseInt(result));     //activation feeling
        }, 1000);
      }
    });
  }
}

function aHandler(current, index, array, alive, callback, message) {
  var success = true;
  if(Math.round(Math.random() * 10) < 5)
    success = false;
  if(message != undefined) {
      $("#talking span:eq("+(index-2).toString()+")").text(message);
      $("#talking span:eq("+(index-2).toString()+")").removeClass("hide").addClass("show");    
  }
  touch(0, function(obj, myself) {
    if(success) {
      $("#talking span:eq("+(index-1).toString()+")").text("A：这是个天大的秘密");
      $("#talking span:eq("+(index-1).toString()+")").removeClass("hide").addClass("show");
    }
    getRandomNumber(obj, myself, alive, function(get) {
      current += get;
      if(success) {
        if(index == 5)
          callback(current);
        else
          callback(current, index+1, array, alive, array[index+1])
      }
      else {
        if(index == 5)
          callback(current, "A：这不是个天大的秘密");
        else
          callback(current, index+1, array, alive, array[index+1], "A：这不是个天大的秘密")
        }
    });
  });
}

function bHandler(current, index, array, alive, callback, message) {
  var success = true;
  if(Math.round(Math.random() * 10) < 5)
    success = false;
  if(message != undefined) {
      $("#talking span:eq("+(index-2).toString()+")").text(message);
      $("#talking span:eq("+(index-2).toString()+")").removeClass("hide").addClass("show");    
  }
  touch(1, function(obj, myself) {
    if(success) {
      $("#talking span:eq("+(index-1).toString()+")").text("B：我不知道");
      $("#talking span:eq("+(index-1).toString()+")").removeClass("hide").addClass("show");
    }
    getRandomNumber(obj, myself, alive, function(get) {
      current += get;
      if(success) {
        if(index == 5)
          callback(current);
        else
          callback(current, index+1, array, alive, array[index+1])
      }
      else {
        if(index == 5)
          callback(current, "B：我知道");
        else
          callback(current, index+1, array, alive, array[index+1], "B：我知道")
        }
    });
  });
}

function cHandler(current, index, array, alive, callback, message) {
  var success = true;
  if(Math.round(Math.random() * 10) < 5)
    success = false;
  if(message != undefined) {
      $("#talking span:eq("+(index-2).toString()+")").text(message);
      $("#talking span:eq("+(index-2).toString()+")").removeClass("hide").addClass("show");    
  }
  touch(2, function(obj, myself) {
    if(success) {
      $("#talking span:eq("+(index-1).toString()+")").text("C：你不知道");
      $("#talking span:eq("+(index-1).toString()+")").removeClass("hide").addClass("show");
    }
    getRandomNumber(obj, myself, alive, function(get) {
      current += get;
      if(success) {
        if(index == 5)
          callback(current);
        else
          callback(current, index+1, array, alive, array[index+1])
      }
      else {
        if(index == 5)
          callback(current, "C：你知道");
        else
          callback(current, index+1, array, alive, array[index+1], "C：你知道")
        }
    });
  });
}

function dHandler(current, index, array, alive, callback, message) {
  var success = true;
  if(Math.round(Math.random() * 10) < 5)
    success = false;
  if(message != undefined) {
      $("#talking span:eq("+(index-2).toString()+")").text(message);
      $("#talking span:eq("+(index-2).toString()+")").removeClass("hide").addClass("show");    
  }
  touch(3, function(obj, myself) {
    if(success) {
      $("#talking span:eq("+(index-1).toString()+")").text("D：他不知道");
      $("#talking span:eq("+(index-1).toString()+")").removeClass("hide").addClass("show");
    }
    getRandomNumber(obj, myself, alive, function(get) {
      current += get;
      if(success) {
        if(index == 5)
          callback(current);
        else
          callback(current, index+1, array, alive, array[index+1])
      }
      else {
        if(index == 5)
          callback(current, "D：他知道");
        else
          callback(current, index+1, array, alive, array[index+1], "D：他知道")
        }
    });
  });
}

function eHandler(current, index, array, alive, callback, message) {
  var success = true;
  if(Math.round(Math.random() * 10) < 5)
    success = false;
  if(message != undefined) {
      $("#talking span:eq("+(index-2).toString()+")").text(message);
      $("#talking span:eq("+(index-2).toString()+")").removeClass("hide").addClass("show");    
  }
  touch(4, function(obj, myself) {
    if(success) {
      $("#talking span:eq("+(index-1).toString()+")").text("E：才怪");
      $("#talking span:eq("+(index-1).toString()+")").removeClass("hide").addClass("show");
    }
    getRandomNumber(obj, myself, alive, function(get) {
      current += get;
      if(success) {
        if(index == 5)
          callback(current);
        else
          callback(current, index+1, array, alive, array[index+1])
      }
      else {
        if(index == 5)
          callback(current, "E：才不怪");
        else
          callback(current, index+1, array, alive, array[index+1], "E：才不怪")
        }
    });
  });
}

function bubbleHandler(result, message) {
  if(message != undefined) {
    $("#talking span:eq(4)").text(message);
    $("#talking span:eq(4)").removeClass("hide").addClass("show");     
  }
  $(".info").removeClass("touch").addClass("untouch");
    $("#talking span:eq(5)").text("大气泡：楼主异步调用战斗力感人，目测不超过"+result.toString()+"");
  setTimeout(function() {
    $("#info-bar span").text(result.toString()).removeClass("hide").addClass("show");
    $("#talking span:eq(5)").removeClass("hide").addClass("show");
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
  $("#talking span").removeClass("show").addClass("hide");
}