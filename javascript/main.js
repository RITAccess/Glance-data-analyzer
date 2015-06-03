"use strict"; // strict mode syntax
require(["libs/jquery/jquery-1.11.2.js"]);
require(["libs/jquery/jquery-ui.js"]);
require(["libs/handsontable/handsontable.full.min.js"]);
require(["libs/PapaParse/papaparse.min.js"]);
require(["libs/chartjs/Chart.js"]);
require(["libs/jsfx/audio.js"], function(audio){
  require(["libs/jsfx/jsfx.js"]);
  require(["libs/jsfx/jsfxlib.js"]);
});
require(["javascript/files.js"]);
require(["javascript/table.js"]);
require(["javascript/chart.js"]);
require(["javascript/overlay.js"]);
require(["javascript/arrayInfo.js"]);
require(["javascript/audioPlayer.js"]);
require(["javascript/arrayCollection.js"]);
require(["javascript/global.js"]);
require(["javascript/summary.js"]);

var player;
var overlay;
var summary;
var chart;
// initial data load
// (this is called after fileOpen from files.js)
var loadData = function(data){

  document.querySelector('#overlay').setAttribute('style','');
  document.querySelector('#table').innerHTML = '';
  var table = loadTable(data.data);
  chart = loadChart(data.data);
  player = new AudioPlayer();
  overlay = new Overlay(data);
  overlay.updateSize(chart);
  var collection = new ArrayCollection(data.data);
  player.setCollection(collection.collection);
  summary = new DataSummary(collection);
  summary.dataSummary();
  linkTable(chart, player, overlay, summary);
  document.getElementById('color-expand').style.display = 'block';
  document.getElementById('plot-header').style.display = 'block';
  document.getElementById('summary-header').style.display = 'block';
  document.getElementById('dataSummary').style.display = 'block';
}

var load = function(){
    loadListener();
  $("input").hover(
    function() {
      //$( "changer" ).addclass("hover");
      document.getElementById("changer").style.backgroundColor = "black";
      document.getElementById("changer").style.color = "white";

      //console.log("enter");
    }, function() {
      //$( "changer" ).addclass("hover");
      //console.log("leave");
      document.getElementById("changer").style.backgroundColor = "white";
      document.getElementById("changer").style.color = "black";
    }
  );
}

// The play button
var playStopAudioButton = function(){
  player.playToggle(document.getElementById("lineDropdown").value - 1, overlay.slider[0], overlay.slider[1]);
}

// Opens the color editor
var openColorEditor = function(){
  var editor = document.getElementById('color-editor');
  editor.style.display = editor.style.display == 'inline' ? 'none' : 'block';
}
