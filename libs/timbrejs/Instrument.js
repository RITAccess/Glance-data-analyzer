
require(["libs/timbrejs/soundfont.js"]);
//Make an instrument object with a given instrument number
function Instrument(number){
	this.number = number;
	this.bpm = 120;	//Default tempo
  this.subdiv = "L4";
	this.makeSoundFont(number);
	this.infoCollection = new ArrayCollection([]);
	this.playing = false;
  this.isLoading = false;
}

//Create a T soundfont object based on number
Instrument.prototype.makeSoundFont = function(number){
	T.soundfont.setInstrument(number);
}

//Change instrument number of this instrument
Instrument.prototype.changeInstrument = function(number){
	if(this.number === number)
    return;
  //T.soundfont.emptyCache();
  this.isLoading = true;
  //console.log(true);
  this.number = number;
	this.makeSoundFont(this.number);
  //setTimeout(function() {}, 10);
  this.setCollection(this.infoCollection.collection);
  //console.log(false);
}

//Play a single note
Instrument.prototype.playSingleNote= function(number){
	this.playing = true;
	T.soundfont.play(number);
	this.playing = false;
}

//Play an entire set of notes
Instrument.prototype.playDataSet = function(line,startIndex,endIndex){
	this.playing = true;
	var i = startIndex;
  var j = line;
  var self = this;
	timbre.bpm = this.bpm;
	var t = T("interval", {interval:this.subdiv,timeout:"55sec"},function(){
		if(i>=endIndex || self.infoCollection.collection[j].array[i+1] === undefined){
			self.playing = false;
			self.updateIcon();
      t.stop();
		}
		//console.log(self.infoCollection.collection[j].array[i]);
		T.soundfont.play(15 + parseInt(self.infoCollection.collection[j].array[i]),false);
		i++;
	}).on("ended",function(){
		this.stop();
	}).start();
  self.playing = false;
}

//Using an arrayCollection object you can add a group of lines to the audio object
Instrument.prototype.setCollection = function(collection) {
 // console.log("coll");
  var dropdownString ="";
  this.infoCollection.setCollection(collection);
  for(var i = 0; i < collection.length; i++) {
    dropdownString += "<option value="+(i + 1)+">"+(i + 1)+"</option>"
  }
  this.isLoading = true;
  //console.log(true)
  /*[DO NOT MOVE]: This section preloads all of the notes in the current collection
  * in order to make playback even and uniform (if you're getting a sound that resembles
  * an individual sitting on a piano, then you probably moved this)
  */
  for(var i = 0; i < collection.length; i++){
    for(var j = 0; j < this.infoCollection.collection[i].array.length; j++){
        T.soundfont.preload([15 + parseInt(this.infoCollection.collection[i].array[j])]);
        //console.log(parseInt(this.infoCollection.collection[i].array[j]));
    }
  }
  this.isLoading = false;
  //console.log(false);
  document.getElementById("audioSpan").style.display = "";
  document.getElementById("lineDropdown").innerHTML = dropdownString;
  //return true;
}

//A change was made to a line in the table
Instrument.prototype.changeLine = function(line, index, newValue) {
  if(line != -1) {
    this.infoCollection.changeLine(line,index,newValue);
    //this.isDirty = true;
    T.soundfont.preload([newValue]);
  }
}

//Toggle playing either on or off
Instrument.prototype.playToggle = function(line, startIndex, endIndex) {
  if(!this.playing) {
      //this.isLoading = true;
      while(true){
        //console.log("loop");
        if(!this.isLoading){
          //console.log("paused");
          setTimeout(function() {}, 100);
          break;
        }
    }
    //this.playLine(line, startIndex, endIndex);
    //console.log(loader);
    var self = this;
    self.playDataSet(line,startIndex,endIndex);
  }
}

// Updates the play / stop icon.
Instrument.prototype.updateIcon = function() {
  var iList = document.getElementById("icon").classList;
  if(this.playing) {
    iList.remove("fa-play");
    iList.add("fa-stop");
  }
  else {
    iList.remove("fa-stop");
    iList.add("fa-play");
  }
}

Instrument.prototype.setBpm = function(bpm){
  this.subdiv = "L4";
  if(bpm > 280){
    while(bpm>280){
      this.subdiv = "L" + parseInt(this.subdiv.substr(1))*2;
      bpm /= 2;
    }
  }
  this.bpm = bpm;
}