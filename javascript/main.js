require(["handsontable/handsontable.full.min.js"]);
require(["PapaParse/papaparse.min.js"]);
require(["chartjs/Chart.min.js"]);
require(["jquery/jquery-1.11.2.js"]);
require(["jquery/jquery-ui.js"]);
require(["jsfx/audio.js"], function(audio){
  require(["jsfx/jsfx.js"]);
  require(["jsfx/jsfxlib.js"]);
});
require(["javascript/files.js"], function(print){
  loadListener();
});
require(["javascript/table.js"]);
require(["javascript/chart.js"]);
require(["javascript/overlay_type2.js"]);
require(["javascript/arrayInfo.js"]);
require(["javascript/audioPlayer.js"]);
require(["javascript/arrayCollection.js"]);

var loadData = function(data){
  loadTable(data.data);
  loadControls(data.data[0].length);
  var chart = loadChart(data.data);
  var player = new AudioPlayer();
  var collection = new ArrayCollection(data.data);
  player.addCollection(collection.collection);
  //TODO: Add collection makes loading graph slow
}
