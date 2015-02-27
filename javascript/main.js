window.onload = function(){
  onloadFiles();
}

var loadData = function(data){
  loadTable(data.data);
  var chart = loadChart(data.data);
}
