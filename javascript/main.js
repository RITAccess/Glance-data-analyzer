window.onload = function(){
  onloadFiles();
}

var loadData = function(data){
  loadTable(data.data);
  var chart = loadChart(data.data);

  onkeyup = function(e){
    console.log(getSelectedPoints(data.data[0].length));
  }
}
