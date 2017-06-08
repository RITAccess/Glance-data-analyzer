"use strict"; // strict mode syntax

//Any file that requires jQuery should be
//placed within this annon function
require(["libs/jquery/jquery-1.11.2.js"],function(jquery) {
  require(["libs/jquery/jquery-ui.js"]);
  require(["libs/SlickGrid/lib/jquery.event.drag-2.2.js"],function(drag) {
    require(["libs/SlickGrid/slick.core.js"], function(core) {
      require(["libs/SlickGrid/slick.editors.js"]);
      require(["libs/SlickGrid/lib/firebugx.js"]);
      require(["javascript/slickTable.js"]);
      require(["libs/SlickGrid/slick.grid.js"]);
    });
  });
});

require(["libs/PapaParse/papaparse.min.js"]);
require(["libs/chartjs/Chart.js"]);

require(["javascript/chart.js"]);
require(["javascript/overlay.js"]);
require(["javascript/arrayInfo.js"]);
require(["javascript/arrayCollection.js"]);
require(["javascript/global.js"]);
require(["javascript/summary.js"]);
require(["javascript/prompts.js"]);
require(["javascript/printer.js"]);
require(["javascript/reset.js"]);
require(["javascript/contrast.js"]);
require(["javascript/audioControls.js"]);
require(["javascript/UI.js"]);

require(["javascript/files.js"], function(print){
  loadListeners();
  //createListener();
  //loadListener();
});

var player;
var overlay;
var summary;
var chart;
var collection;
var type = null;
var lineColors = [];
var slickTable;
var uncheckCalled = false;
/* changed this temporarily because MIDI Server is not working anymore
	-Joshua Miller 7/22/16
 */
//var isSafari = Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor')>0;
var isSafari = true;
// initial data load
// (this is called after fileOpen from files.js)
var loadData = function (data) {
    document.getElementById('myChart').style.display = 'inline';
    document.getElementById('start').style.display = 'none';
    document.querySelector('#overlay').setAttribute('style', '');
    document.querySelector('#slickTable').innerHTML = '';
    slickTable = loadSlickTable(data.data);
    var tempData = [];
    for(var i = 0; i < data.data.length; i++){
      tempData[i] = [];
      for(var j = 0; j<data.data[i].length; j++){
        tempData[i][j] = data.data[i][j];
      }
    }
    document.getElementById('tableCount').innerHTML = "[ Total Row: " + (data.data.length - 1) + " ] [ Total Column: " + (data.data[0].length - 1) + " ]";
    document.getElementById('remInstruction').innerHTML = "*To remove specific row or column: delete the contents in the chosen label cells.";
    chart = loadChart(tempData, type);
    if(chart && type === "bar"){
      if(document.getElementById('barGraphAudioOptions')){
        var c = document.getElementById('barGraphAudioOptions');
        var p =  c.parentNode;
        p.removeChild(c);
        var c = document.getElementById('playModeLabel');
        p.removeChild(c);
        if(document.getElementById("colSelector")){
          var c = document.getElementById('colSelector');
          var p =  c.parentNode;
          p.removeChild(c);
          var c = document.getElementById("colNumLabel");
          p.removeChild(c);
          }
        }
      convertPointsToBars();
      if(!document.getElementById("barGraphAudioOptions")){
        var newddm = document.createElement("select");
        newddm.setAttribute("id","barGraphAudioOptions");
        newddm.setAttribute("class","drop-down");
        var option = document.createElement("option");
        option.setAttribute("value","0");
        option.innerHTML = "Normal";
        newddm.appendChild(option);
        option = document.createElement("option");
        option.setAttribute("value","1");
        option.innerHTML = "Play by column";
        newddm.appendChild(option);
        if(!isSafari){
          option = document.createElement("option");
          option.setAttribute("value","2");
          option.innerHTML = "Play columns as chords";
          newddm.appendChild(option);
        }
        var label = document.createElement("label");
        label.innerHTML = "Play mode ";
        label.setAttribute("id","playModeLabel");
        document.getElementById("audioSpanBar").appendChild(label);
        document.getElementById("audioSpanBar").appendChild(newddm);
        newddm.setAttribute("onchange", "makeColSelector()");
      }
    }
    else if(type === "line"){
      if(document.getElementById('barGraphAudioOptions')){
        var c = document.getElementById('barGraphAudioOptions');
        var p =  c.parentNode;
        p.removeChild(c);
        var c = document.getElementById('playModeLabel');
        p.removeChild(c);
        if(document.getElementById("colSelector")){
          var c = document.getElementById('colSelector');
          var p =  c.parentNode;
          p.removeChild(c);
          var c = document.getElementById("colNumLabel");
          p.removeChild(c);
        }
      }
      convertPointsToScatter();

    }
    else{
      convertPointsToScatter();
      if(!document.getElementById("barGraphAudioOptions")){
        var newddm = document.createElement("select");
        newddm.setAttribute("id","barGraphAudioOptions");
        newddm.setAttribute("class","drop-down");
        var option = document.createElement("option");
        option.setAttribute("value","0");
        option.innerHTML = "Normal";
        newddm.appendChild(option);
        option = document.createElement("option");
        option.setAttribute("value","1");
        option.innerHTML = "Play Regression Line";
        newddm.appendChild(option);
        var label = document.createElement("label");
        label.innerHTML = "Play mode ";
        label.setAttribute("id","playModeLabel");
        document.getElementById("audioSpanBar").appendChild(label);
        document.getElementById("audioSpanBar").appendChild(newddm);
        newddm.setAttribute("onchange", "makeColSelector()");
      }
      else{
       if(document.getElementById('barGraphAudioOptions')){
        var c = document.getElementById('barGraphAudioOptions');
        var p =  c.parentNode;
        p.removeChild(c);
        var c = document.getElementById('playModeLabel');
        p.removeChild(c);
        if(document.getElementById("colSelector")){
          var c = document.getElementById('colSelector');
          var p =  c.parentNode;
          p.removeChild(c);
          var c = document.getElementById("colNumLabel");
          p.removeChild(c);
          }
        }
        var newddm = document.createElement("select");
        newddm.setAttribute("id","barGraphAudioOptions");
        newddm.setAttribute("class","drop-down");
        var option = document.createElement("option");
        option.setAttribute("value","0");
        option.innerHTML = "Normal";
        newddm.appendChild(option);
        option = document.createElement("option");
        option.setAttribute("value","1");
        option.innerHTML = "Play Regression Line";
        newddm.appendChild(option);
        var label = document.createElement("label");
        label.innerHTML = "Play mode ";
        label.setAttribute("id","playModeLabel");
        document.getElementById("audioSpanBar").appendChild(label);
        document.getElementById("audioSpanBar").appendChild(newddm);
        newddm.setAttribute("onchange", "makeColSelector()");
      }
    }
    if(Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0)
      player = new WaveForm("sine");
    else
      player = new Instrument(1);
    overlay = new Overlay(data, type);
    overlay.updateSize(chart);
    collection = new ArrayCollection(tempData);
    player.setCollection(collection.collection);
    summary = new DataSummary(collection); // note we did not referrence summary 1 which handles Graph Rows Section
    summary.dataSummary();                // this may present a problem in the future. commentor - Brashad
    linkSlickTable(chart, player, overlay, summary);
    document.getElementById('instrumentDropdown').innerHTML = "";
    if(!isSafari){
      for(var i = 1; i < 128; i ++){
        var newElem = document.createElement("option");
        newElem.value = i;
        newElem.innerHTML = instruments[i];
        document.getElementById('instrumentDropdown').appendChild(newElem);
      }
    }
    else{
      var waves = ["Sine Wave","Triangle Wave","Square Wave","Sawtooth Wave"];
      for(var i = 0; i < waves.length; i ++){
        var newElem = document.createElement("option");
        newElem.value = waves[i];
        newElem.innerHTML = waves[i];
        document.getElementById('instrumentDropdown').appendChild(newElem);
      }
    }
    document.getElementById("content").style.position = 'inherit'; //overides corresponding style in index.html that hides the content tag
    document.getElementById("content").style.top = ''; // meant to leave it blank: to overide corresponding style in index.html that hides the content tag
    document.getElementById("content").style.left = ''; // meant to leave it blank: to overide corresponding style in index.html that hides the content tag
    document.getElementById('typeSelBody').style.display = 'block';
    document.getElementById('audioHeader').style.display = 'inherit';
    document.getElementById('graphHeader').style.display = 'inherit';
    document.getElementById('plot-header').style.display = 'inherit';
    document.getElementById('tableControls').style.display = 'inherit';
    document.getElementById('summary-header').style.display = 'inherit';
    document.getElementById('summary-header1').style.display = 'inherit';
    document.getElementById('bgColorChange').style.display = 'inherit';
    var jumpElements = document.getElementsByClassName("pageJump");
    for(var i = 0; i < jumpElements.length; i++){
      jumpElements[i].style.display = "inline";     
    }
    fixSlick();
    if(type === "line"){
      document.getElementById('typeSel').selectedIndex = 0;
    }
    else if(type === "bar"){
      document.getElementById('typeSel').selectedIndex = 1;
    }
    else{
      document.getElementById('typeSel').selectedIndex = 2;
    }
    checkWarningLabels();
    checkColorBoxes();

    oldColor = document.getElementsByTagName("body")[0].style.color;
    oldGraphColor = chart.options.scaleFontColor;
    oldBGColor = document.getElementsByTagName('body')[0].style.background;
    if(!uncheckCalled){
      uncheckBoxes();
      uncheckCalled= true;
    }
    updateRowDropDown();
}
