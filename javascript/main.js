"use strict"; // strict mode syntax
require(["libs/handsontable/handsontable.full.min.js"]);
require(["libs/PapaParse/papaparse.min.js"]);
require(["libs/chartjs/Chart.js"]);
require(["libs/jquery/jquery-1.11.2.js"]);
require(["libs/jquery/jquery-ui.js"]);
require(["libs/jsfx/audio.js"], function(audio){
  require(["libs/jsfx/jsfx.js"]);
  require(["libs/jsfx/jsfxlib.js"]);
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
// initial data load
// (this is called after fileOpen from files.js)
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
  player.replaceCollection(collection.collection);
}

//The play button
var playStopAudioButton = function(){
  player.playToggle(document.getElementById("lineDropdown").value, overlay.slider[0], overlay.slider[1]);
}
