window.onload = function(){
  onloadFiles();
}

var loadData = function(data){
  console.log(data);
  loadTable(data.data);
  loadChart(data.data);
}
