Array.prototype.shuffle=function() {
  this.sort(function() {return Math.random()-0.5; });
}

Array.prototype.append=function(from) {
  this[this.length]=from;
  return this;
}
Array.prototype.append_all=function(from) {
  for(var i=0;i<from.length;i++) {
    this.append(from[i]);
  }
  return this;
}

Array.prototype.first_n=function(count) {
  var a=[];
  for(var i=0;i<count;i++) {
    a.append(this[i]);
  }
  return a;
}



function showResult(result) {
  var divname=(result?"correct":"incorrect");
  var div= $("#"+divname);
  
  var afterShow=function() {
    setTimeout(function() {
      div.fadeOut("fast",function(){
        //alert("rest");
        start_game();
      });
    },2000);
  };
  div.show().fadeIn("fast",afterShow);
}

