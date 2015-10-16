var pausing = false;
// The play button
var playStopAudioButton = function () {
  var playing = player.playing;
  if(isSafari && playing){
    player.stop();
    return;
  }
  if(document.getElementById("barGraphAudioOptions")=== null){
    var mode = null;
  }
  else{
    var mode = document.getElementById("barGraphAudioOptions").selectedIndex;
  }
  if(mode != 1){
    var startval = document.getElementById("lineDropdown").selectedIndex;
  }
  //Change the speed of the audio based on speed input.
  var bpm = 80 + 20 * document.getElementById('bpm').value;
  player.setBpm(bpm);
  //DO NOT CHANGE/DELETE: Fixes audio issue involving slider
  if(overlay.slider[0] === 0 && overlay.slider[1] === 0){
    if(type==="bar"){
      overlay.slider[1] = chart.data.datasets[0].bars.length;
    }
    else{
      overlay.slider[1] = chart.data.datasets[0].points.length;
    }
  }
    if(player.buffer === undefined){
      if(!isSafari)
        player.changeInstrument(document.getElementById("instrumentDropdown").value);
      setTimeout(function() {}, 2000);
    }
    if(isSafari){
      var wave = document.getElementById("instrumentDropdown").value;
      wave = wave.substring(0,wave.indexOf(" ")).toLowerCase();
      if(!isSafari)
      player.stop();
      if(player.type != wave)
      player = new WaveForm(wave);
      player.setCollection(collection.collection);
    }
    else{
      if(document.getElementById("colSelector"))
      var startval = document.getElementById("colSelector").value;
    }
    if(!isSafari)
      player.playToggle(startval, overlay.slider[0], overlay.slider[1],mode);
    else
      player.playToggle(startval, overlay.slider[0], overlay.slider[1],mode,playing);
    console.log(player.paused);
}

//Play audio if not already
var play = function(){
  if(!player.playing){
    playStopAudioButton();
  }
}

//Pause audio if not already
var pause = function(){
  pausing = true;
  if(player.playing){
    playStopAudioButton();
    player.paused = true;
  }
  pausing = false;
}

//Stop audio if not already
var stop = function(){
  if(isSafari ) {
    overlay.slider[0] = 0;
    player.paused = false;
    if(player.playing)
      player.stop();
  }
  else if(player.playing || player.paused){
    player.stop();
  }
}

//Stop audio on line change
var changeAudioLine = function(){
  player.paused = false;
  player.stop();
  if(isSafari)
    overlay.slider[0] = 0;
}
