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

var player;

var loadData = function(data){
  document.querySelector('#overlay').setAttribute('style','');
  document.querySelector('#table').innerHTML = '';
  var table = loadTable(data.data);
  var chart = loadChart(data.data);
  player = new AudioPlayer();
  linkTable(chart, player);
  var collection = new ArrayCollection(data.data);
  player.addCollection(collection.collection);
}

//The play button
var playAudioButton = function(){
  player.playLine(document.getElementById("lineDropdown").value);
}
