window.onload = function(){
  onloadFiles();
}

var loadData = function(data){
  console.log(data);
  loadTable(data.data);
  var chart = loadChart(data.data);
}
