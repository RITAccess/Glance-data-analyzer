window.onload = function(){
  onloadFiles();
}

var loadData = function(data){
  loadTable(data.data);
  var chart = loadChart(data.data);
  var player = new AudioPlayer();
  var collection = new ArrayCollection(data.data);
  player.addCollection(collection.collection);
}
