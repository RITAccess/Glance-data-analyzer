require(["handsontable/handsontable.full.min.js"]);
require(["PapaParse/papaparse.min.js"]);
require(["chartjs/Chart.js"]);
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
require(["javascript/overlay.js"]);
require(["javascript/arrayInfo.js"]);
require(["javascript/audioPlayer.js"]);
require(["javascript/arrayCollection.js"]);

var player;
var overlay;
var loadData = function(data){
  document.querySelector('#overlay').setAttribute('style','');
  document.querySelector('#table').innerHTML = '';
  var table = loadTable(data.data);
  var chart = loadChart(data.data);
  player = new AudioPlayer();
  overlay = new Overlay(data);
  overlay.updateSize(chart);
  linkTable(chart, player, overlay);
  var collection = new ArrayCollection(data.data);
  player.addCollection(collection.collection);
}

//The play button
var playStopAudioButton = function(){
  player.playToggle(document.getElementById("lineDropdown").value, overlay.slider[0], overlay.slider[1]);
}
