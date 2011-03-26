vocabularies=[];

function vocArrayToString() {
  var str="[";
  var i,j,a;
  for(i=0;i<vocabularies.length;i++) {
    str+="[";
    a=vocabularies[i];
    for(j=0;j<a.length;j++) {
     
      if(j>0)
        str+=",";
   
      str+='"'+a[j]+'"';
    }
    str+="]";
    if(i<vocabularies.length-1)
      str+=",";
  }
  str+="]";
  
  return str;
}

function load_vocabularies() {
  vocabularies=eval($("#voc_form_content").val());
  rebuild_table();
  return false;
}

function save_vocabularies() {
  $("#voc_form_content").val(vocArrayToString());
  alert($("#voc_form_content").val());
  return false;
}

function add_voc(self) {
  var a=[];
  var i,inp;
  for(i=0;i<3;i++) {
    inp=$("#voc_"+i);
    a[i]=inp.val();
    inp.val("");
  }
  vocabularies[vocabularies.length]=a;
  if(true) {
    var str=voc_to_html(a,vocabularies.length-1);
    str=str.replace("<tr","<tr style='display:none;'");
    var hupe=$(str).insertAfter("#vocabularies_head");
    hupe.fadeIn("fast");
  } else {
    rebuild_table();
  }
  return false;
}

function remove_voc(id) {
  var nvocabularies=[];
  var i,deleted;
  for(i=0;i<vocabularies.length;i++) {
    if(i!=id)
      nvocabularies[nvocabularies.length]=vocabularies[i];
    else
      deleted=vocabularies[i];
  }
  vocabularies=nvocabularies;
  if(true) {
    var thistr=$("#tr_"+id);
    thistr.fadeOut("fast",function() {thistr.remove();renameVocs();});
  } else {
    rebuild_table();
    
  }  
  return deleted;
}

function renameVocs() {
  rebuild_table();
}

function edit_voc(id) {
  var del=remove_voc(id);
  var i;
  for(i=0;i<3;i++) {
    inp=$("#voc_"+i);
    inp.val(del[i]);
  }
}

function voc_to_html(a,i) {
  var j,str;
    str="<tr id='tr_"+i+"'>";
    str+="<td><a href='javascript:remove_voc("+i+");'><img src='delete.png'></td>";
    str+="<td><a href='javascript:edit_voc("+i+");'><img src='edit.png'></td>";
    for(j=0;j<a.length;j++) {
      str+="<td>"+a[j]+"</td>";
    }
    str+="</tr>";

return str;
}

function rebuild_table() {
  var i=0;
  var all=$("#vocabularies tr");
  for(i=1;i<all.length;i++) {
    $(all[i]).remove();
  }
  while(true) {
    o=$("#tr_"+i);
    if(!(o.length)) break;
    o.remove();
    i+=1;
  }
  
  var t=$("#vocabularies");
  var j=0,str;
  for(i=vocabularies.length-1;i>=0;i--) {
    a=vocabularies[i];
    str=voc_to_html(a,i);
    t.append(str);
  }
}