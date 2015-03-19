require(["handsontable/handsontable.full.min.js"]);
require(["PapaParse/papaparse.min.js"]);
require(["chartjs/Chart.min.js"]);
require(["jsfx/audio.js"]);
require(["jsfx/jsfx.js"]);
require(["jsfx/jsfxlib.js"]);
require(["javascript/files.js"]);
require(["javascript/table.js"]);
require(["javascript/chart.js"]);
require(["javascript/overlay_type2.js"]);
require(["javascript/arrayInfo.js"]);
require(["javascript/audioPlayer.js"]);
require(["javascript/arrayCollection.js"]);


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
