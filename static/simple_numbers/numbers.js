GRID_X=5;
GRID_Y=3;

CLICK_ENABLED=false;

function number_div() {
  return $("#numbers_objects");
}


function get_places(div,gridx,gridy) {
  var a=[];
  var x,y;
  
  var w=div.width();
  var h=div.width();
  var p=div.offset(); // or position() ?
  var sx=p.left;
  var sy=p.top;
  for(x=0;x<gridx;x++) {
    for(y=0;y<gridy;y++) {
      var px=x*w/(gridx+1)+sx;
      var py=y*h/(gridy+1)+sy;
      a[a.length]="left:"+px+"px;top:"+py+"px;";
    }
  }
  
  a.shuffle();
  return a;
}

function get_next_numbers() {
  var a=[1,2,3,4,5];
  a.shuffle();
  return a;
}

function disableClicking() {
  CLICK_ENABLED=false;
}

function number_clicked(i) {
  if(!CLICK_ENABLED)
    return false;

  disableClicking();
  var result=($(this).text()==
   number_div().children().length);
   
  showResult(result);
}

function start_game() {
  var div=number_div();
  div.empty();
  
  var numbers=get_next_numbers();
  
  var n=numbers[0];
  var places=get_places(div,GRID_X,GRID_Y);
  for(var i=0;i<n;i++) {
    var j=i;
    div.append("<img src='bug64.png' style='position:absolute;"+places[j]+"'></img>");
  }
  
  var selnumbers=[];
  
  for(var i=0;i<4;i++) {
    var n=numbers[i];
    selnumbers[selnumbers.length]=n;
  }
  selnumbers.shuffle();
  var xy;
  for(var i=0;i<selnumbers.length;i++) {
    xy=selnumbers[i];
    object=$("#number_selection"+i);
    object.empty();
    object.append(xy);
    object.click(number_clicked);
  }
  
  $("#correct").hide();
  $("#incorrect").hide();
  CLICK_ENABLED=true;
  
}