var LEVELS=3;
var SCOPE_SIZE=3
var vocabularies;
var levels=[];
var currentQuestion;


function init_game(vocs) {
  vocabularies=vocs;
  levels[levels.length]=vocabularies;
  for(var i=0;i<LEVELS;i++)
    levels[levels.length]=[];
  $("#correct").hide();
  $("#incorrect").hide();
    
  $("#answer").append("<form onsubmit='return false;'><input type='text' id='inputanswer'</input><input type='submit' id='answersubmit'></form>");
  $("#answersubmit").click(function(){answered()});
}

function answered() {
  var answer=$("#inputanswer").val();
  showResult(answer==currentQuestion[1]);
  return false;
}

function get_scope() {
  var scope=[];
  for(var i=1;i<levels.length;i++) {
    scope.append_all(levels[i]);
  }
  
  var start=[];
  start.append_all(levels[0]);
  start.shuffle();
  scope.append_all(start.first_n(SCOPE_SIZE-scope.length));
  
  return scope;
}

function chooseQuestion() {
  var scope=get_scope();
  first=scope[0];
  return first;
}

function setQuestion(q) {
  currentQuestion=q;
  $("#question").empty().append(q[0]);
}

function start_play() {
  alert("start");
  setQuestion(chooseQuestion());
}